import { createMcpServer } from "some-mcp-library";
import { tools } from "./tools";
import { startHttpServer } from "./server";

createMcpServer({
  tools,
}).start();

// Start small HTTP API for frontend integration (scraping + evaluation)
startHttpServer();
