const FIGMA_API_BASE_URL = "https://api.figma.com/v1";

export class FigmaApiError extends Error {
  public readonly status: number;
  public readonly details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "FigmaApiError";
    this.status = status;
    this.details = details;
  }
}

export interface GetFileOptions {
  depth?: number;
  ids?: string[];
  version?: string;
  geometry?: "paths" | "bounds";
  pluginData?: "source" | "shared" | "component";
  branchData?: boolean;
}

export interface GetImageOptions {
  format?: "png" | "jpg" | "svg" | "pdf";
  scale?: number;
  useAbsoluteBounds?: boolean;
}

interface RequestOptions {
  method?: string;
  searchParams?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
}

export type JsonMap = Record<string, unknown>;

export class FigmaClient {
  private readonly token: string;

  constructor(token: string) {
    if (!token || !token.trim()) {
      throw new Error("FIGMA_PERSONAL_ACCESS_TOKEN is required");
    }

    this.token = token.trim();
  }

  async getFile(fileKey: string, options: GetFileOptions = {}): Promise<JsonMap> {
    const params = this.cleanParams({
      depth: options.depth,
      ids: options.ids?.join(","),
      version: options.version,
      geometry: options.geometry,
      plugin_data: options.pluginData,
      branch_data: options.branchData ? "true" : undefined,
    });

    return this.request<JsonMap>(`/files/${encodeURIComponent(fileKey)}`, {
      method: "GET",
      searchParams: params,
    });
  }

  async getNodes(fileKey: string, nodeIds: string[]): Promise<JsonMap> {
    if (!nodeIds.length) {
      throw new Error("nodeIds must contain at least one id");
    }

    const params = this.cleanParams({ ids: nodeIds.join(",") });

    return this.request<JsonMap>(`/files/${encodeURIComponent(fileKey)}/nodes`, {
      method: "GET",
      searchParams: params,
    });
  }

  async searchNodes(fileKey: string, query: string, nodeTypes?: string[]): Promise<JsonMap> {
    const params = this.cleanParams({
      query,
      node_types: nodeTypes?.join(","),
    });

    return this.request<JsonMap>(`/files/${encodeURIComponent(fileKey)}/search`, {
      method: "GET",
      searchParams: params,
    });
  }

  async getComments(fileKey: string): Promise<JsonMap> {
    return this.request<JsonMap>(`/files/${encodeURIComponent(fileKey)}/comments`, {
      method: "GET",
    });
  }

  async getImages(fileKey: string, nodeIds: string[], options: GetImageOptions = {}): Promise<JsonMap> {
    if (!nodeIds.length) {
      throw new Error("nodeIds must contain at least one id");
    }

    const params = this.cleanParams({
      ids: nodeIds.join(","),
      format: options.format,
      scale: options.scale,
      use_absolute_bounds: options.useAbsoluteBounds ? "true" : undefined,
    });

    return this.request<JsonMap>(`/images/${encodeURIComponent(fileKey)}`, {
      method: "GET",
      searchParams: params,
    });
  }

  private cleanParams(params: Record<string, string | number | boolean | undefined | null>): Record<string, string> {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (typeof value === "boolean") {
        result[key] = value ? "true" : "false";
      } else {
        result[key] = String(value);
      }
    }

    return result;
  }

  private async request<T>(path: string, options: RequestOptions): Promise<T> {
    const url = new URL(`${FIGMA_API_BASE_URL}${path}`);

    if (options.searchParams) {
      for (const [key, value] of Object.entries(options.searchParams)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const headers: Record<string, string> = {
      "X-FIGMA-TOKEN": this.token,
      "Content-Type": "application/json",
    };

    const response = await fetch(url.toString(), {
      method: options.method ?? "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const text = await response.text();

    if (!response.ok) {
      let details: unknown = undefined;

      try {
        details = text ? JSON.parse(text) : undefined;
      } catch (error) {
        details = text;
      }

      let message = "Unknown Figma API error";

      if (
        details &&
        typeof details === "object" &&
        "err" in details &&
        typeof (details as Record<string, unknown>).err === "string"
      ) {
        message = (details as Record<string, unknown>).err as string;
      } else if (response.statusText) {
        message = response.statusText;
      }

      throw new FigmaApiError(response.status, message, details);
    }

    if (!text) {
      return {} as T;
    }

    try {
      return JSON.parse(text) as T;
    } catch (error) {
      throw new FigmaApiError(response.status, "Failed to parse Figma API response", text);
    }
  }
}
