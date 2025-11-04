# Figma MCP 工具整合指南

本文件說明如何在本專案中啟動 Model Context Protocol (MCP) 伺服器，
讓具備 MCP 客戶端（如 Cursor、Claude Code 或 MCP Inspector）的工具
可以直接從 Figma 取得設計稿資訊。

## 前置需求

- Node.js 18 以上版本
- 已安裝專案相依套件：`npm install`
- Figma Personal Access Token（從 <https://www.figma.com/developers/api#access-tokens> 取得）

## 安裝與建置

```bash
cd BackEnd
npm install
npx tsc
```

> `npx tsc` 會將 TypeScript 原始碼編譯到 `build/` 目錄，
> 供 MCP 伺服器在 Node.js 環境下執行。

## 環境變數設定

在 `BackEnd` 目錄下建立 `.env`（或於客戶端設定環境變數），填入：

```env
FIGMA_PERSONAL_ACCESS_TOKEN=your_figma_token_here
```

支援的備用名稱：`FIGMA_ACCESS_TOKEN`、`FIGMA_TOKEN`。

## 啟動 MCP 伺服器

1. 先完成編譯 (`npx tsc`)。
2. 執行：

   ```bash
   npm run mcp:figma
   ```

`npm run mcp:figma` 會啟動 STDIO transport 的 MCP 伺服器，
等待 MCP 客戶端透過標準輸入／輸出與之溝通。

### 範例：Cursor 設定檔

於 Cursor 的 `~/.cursor/mcp.json` 或工作區設定中新增：

```json
{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": ["/absolute/path/to/BackEnd/build/mcp/figmaServer.js"],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "your_figma_token_here"
      }
    }
  }
}
```

程式會在啟動時載入 `.env` 檔案，因此也可直接在專案根目錄設定環境變數。

## 已註冊的工具

| 工具名稱 | 功能 | 主要參數 |
| --- | --- | --- |
| `figma_get_file` | 下載整個 Figma 文件的 JSON 結構，可選擇附加留言 | `fileKey`（必填）、`depth`、`nodeIds`、`version`、`includeComments` |
| `figma_get_nodes` | 取得特定節點的詳細資料，並可選擇回傳節點影像網址 | `fileKey`（必填）、`nodeIds`（至少一個）、`fetchImages`、`imageFormat`、`imageScale` |
| `figma_search_nodes` | 透過 Figma 搜尋 API 在文件中搜尋節點 | `fileKey`（必填）、`query`（必填）、`nodeTypes` |

所有工具都會在 `structuredContent` 欄位中提供原始 JSON，
方便客戶端直接取用；同時也會輸出美化後的文字內容作為備用。

## 測試與除錯

- 使用 `npx @modelcontextprotocol/inspector` 可直接測試工具輸出。
- 若遇到 `Figma API error`，請確認：
  - Access Token 是否正確且未過期。
  - 帳號是否對該 Figma 檔案具有讀取權限。
  - 參數（例如 `fileKey`、`nodeIds`）是否正確。
- 報錯訊息會以 `isError: true` 的形式傳回，利於客戶端顯示。

如需擴充更多工具，可參考 `BackEnd/src/mcp/figmaServer.ts`
內既有 `server.registerTool` 實作範例。
