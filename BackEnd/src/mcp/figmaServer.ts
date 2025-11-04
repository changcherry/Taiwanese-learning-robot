import { config } from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from "zod";

import { FigmaApiError, FigmaClient, JsonMap } from "./FigmaClient";

config();

const token =
  process.env.FIGMA_PERSONAL_ACCESS_TOKEN ??
  process.env.FIGMA_ACCESS_TOKEN ??
  process.env.FIGMA_TOKEN;

if (!token) {
  // eslint-disable-next-line no-console
  console.error(
    "Cannot start Figma MCP server: FIGMA_PERSONAL_ACCESS_TOKEN (or FIGMA_ACCESS_TOKEN / FIGMA_TOKEN) is not set."
  );
  process.exit(1);
}

const figmaClient = new FigmaClient(token);

const server = new McpServer({
  name: "figma-mcp",
  version: "0.1.0",
});

type ToolContent = CallToolResult["content"][number];

const getFileInputShape = {
  fileKey: z.string().min(1, "fileKey is required").describe("The file key from the Figma file URL"),
  depth: z
    .number()
    .int()
    .min(1)
    .max(30)
    .optional()
    .describe("Depth of the node tree to return. Defaults to full depth"),
  nodeIds: z
    .array(z.string().min(1))
    .optional()
    .describe("Specific node IDs to include when fetching the file"),
  version: z.string().optional().describe("Specific version ID to fetch"),
  includeComments: z
    .boolean()
    .optional()
    .describe("Whether to include comments for the file"),
};

const getNodesInputShape = {
  fileKey: z.string().min(1, "fileKey is required").describe("The file key from the Figma file URL"),
  nodeIds: z.array(z.string().min(1)).min(1, "Provide at least one node id"),
  fetchImages: z
    .boolean()
    .optional()
    .describe("If true, also fetch rendered images for the provided node IDs"),
  imageFormat: z
    .enum(["png", "jpg", "svg", "pdf"])
    .optional()
    .describe("Image format to use when fetchImages is enabled"),
  imageScale: z
    .number()
    .min(0.01)
    .max(4)
    .optional()
    .describe("Scale factor for rendered images when fetchImages is enabled"),
};

const searchNodesInputShape = {
  fileKey: z.string().min(1, "fileKey is required"),
  query: z.string().min(1, "query is required"),
  nodeTypes: z
    .array(z.string().min(1))
    .optional()
    .describe("Restrict results to specific node types (e.g. FRAME, TEXT, COMPONENT)"),
};

const getFileArgsSchema = z.object(getFileInputShape);
const getNodesArgsSchema = z.object(getNodesInputShape);
const searchNodesArgsSchema = z.object(searchNodesInputShape);

type GetFileArgs = z.infer<typeof getFileArgsSchema>;
type GetNodesArgs = z.infer<typeof getNodesArgsSchema>;
type SearchNodesArgs = z.infer<typeof searchNodesArgsSchema>;

function createTextContent(message: string): ToolContent {
  return {
    type: "text",
    text: message,
  };
}

function successResult(payload: JsonMap): CallToolResult {
  return {
    content: [createTextContent(JSON.stringify(payload, null, 2))],
    structuredContent: payload,
  };
}

function errorResult(message: string, details?: unknown): CallToolResult {
  const fullMessage =
    details !== undefined
      ? `${message}\nDetails: ${typeof details === "string" ? details : JSON.stringify(details, null, 2)}`
      : message;

  return {
    isError: true,
    content: [createTextContent(fullMessage)],
  };
}

function handleToolError(error: unknown): CallToolResult {
  if (error instanceof FigmaApiError) {
    return errorResult(`Figma API error (${error.status}): ${error.message}`, error.details);
  }

  if (error instanceof Error) {
    return errorResult(`${error.name}: ${error.message}`);
  }

  return errorResult(`Unknown error: ${JSON.stringify(error)}`);
}

server.registerTool(
  "figma_get_file",
  {
    title: "Get Figma file",
    description: "Fetch the document JSON for a Figma file and optionally its comments",
    inputSchema: getFileInputShape,
  },
  async (args: GetFileArgs): Promise<CallToolResult> => {
    try {
      const document = await figmaClient.getFile(args.fileKey, {
        depth: args.depth,
        ids: args.nodeIds,
        version: args.version,
      });

      const payload: JsonMap = {
        fileKey: args.fileKey,
        document,
      };

      if (args.includeComments) {
        payload.comments = await figmaClient.getComments(args.fileKey);
      }

      return successResult(payload);
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.registerTool(
  "figma_get_nodes",
  {
    title: "Get Figma nodes",
    description: "Fetch specific node details and optionally rendered images from a Figma file",
    inputSchema: getNodesInputShape,
  },
  async (args: GetNodesArgs): Promise<CallToolResult> => {
    try {
      const nodes = await figmaClient.getNodes(args.fileKey, args.nodeIds);
      const payload: JsonMap = {
        fileKey: args.fileKey,
        nodes,
      };

      if (args.fetchImages) {
        payload.images = await figmaClient.getImages(args.fileKey, args.nodeIds, {
          format: args.imageFormat,
          scale: args.imageScale,
        });
      }

      return successResult(payload);
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.registerTool(
  "figma_search_nodes",
  {
    title: "Search Figma nodes",
    description: "Search for nodes within a Figma file using the file search API",
    inputSchema: searchNodesInputShape,
  },
  async (args: SearchNodesArgs): Promise<CallToolResult> => {
    try {
      const results = await figmaClient.searchNodes(args.fileKey, args.query, args.nodeTypes);

      const payload: JsonMap = {
        fileKey: args.fileKey,
        query: args.query,
        results,
      };

      return successResult(payload);
    } catch (error) {
      return handleToolError(error);
    }
  }
);

async function startServer(): Promise<void> {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    if (error instanceof FigmaApiError) {
      // eslint-disable-next-line no-console
      console.error(`Failed to start due to Figma API error (${error.status}): ${error.message}`);
    } else if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to start Figma MCP server: ${error.message}`);
    } else {
      // eslint-disable-next-line no-console
      console.error("Failed to start Figma MCP server due to unknown error", error);
    }

    process.exit(1);
  }
}

void startServer();
