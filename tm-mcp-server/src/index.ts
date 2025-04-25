import { FastMCP } from "fastmcp";
import startServer from './server/server';

// Start the server
async function main() {
  try {
    const { server } = await startServer();
    // MCP server is already started in startServer()
  } catch (error) {
    console.error('Error starting MCP server:', error);
    process.exit(1);
  }
}

main(); 