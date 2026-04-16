"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
// 1. Initialize the Server
const server = new index_js_1.Server({
    name: "weather-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {} // Tells the client we provide executable tools
    }
});
// 2. Define Available Tools
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: [{
                name: "get_weather",
                description: "Get the current weather for a city",
                inputSchema: {
                    type: "object",
                    properties: {
                        city: { type: "string" }
                    },
                    required: ["city"]
                }
            }]
    };
});
// 3. Handle Tool Execution
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    if (request.params.name === "get_weather") {
        const city = request.params.arguments?.city;
        return {
            content: [{ type: "text", text: `The weather in ${city} is currently 72°F and sunny.` }]
        };
    }
    throw new Error("Tool not found");
});
// 4. Connect to Transport (Standard Input/Output)
const transport = new stdio_js_1.StdioServerTransport();
await server.connect(transport);
//# sourceMappingURL=index.js.map