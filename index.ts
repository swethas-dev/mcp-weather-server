import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema,
  ListResourcesRequestSchema, 
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema       
} from "@modelcontextprotocol/sdk/types.js";

// 1. Initialize the Server with a unique variable name 'myServer'
const myServer = new Server({
  name: "weather-server",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {},
    resources: {},
    prompts: {} // This is the missing piece!
  }
});

// 2. Define Available Tools (Weather Tool)
myServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_weather",
        description: "Get the current weather for a city",
        inputSchema: {
          type: "object",
          properties: {
            city: { type: "string" }
          },
          required: ["city"]
        }
      }
    ]
  };
});

// --- 3. THE PROMPT EXECUTION ---
myServer.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "weather-report-template",
        description: "A template to generate a weather report for this project",
        arguments: [
          {
            name: "city",
            description: "The city to get the weather for",
            required: true
          }
        ]
      }
    ]
  };
});
// 3. Handle Tool Execution
myServer.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name === "weather-report-template") {
    const city = request.params.arguments?.city ?? "San Francisco";
    
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please read the project overview from file:///project-info.txt. 
            Then, use the get_weather tool for ${city} and write a short summary 
            explaining how the current weather might affect our project development today.`
          }
        }
      ]
    };
  }
  throw new Error("Prompt not found");
});


// 4. Handler to list available resources
myServer.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "file:///project-info.txt",
        name: "Project Overview",
        mimeType: "text/plain",
        description: "General information about this project"
      }
    ]
  };
});

// 5. Handler to read resource content
myServer.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  if (uri === "file:///project-info.txt") {
    return {
      contents: [{
        uri,
        mimeType: "text/plain",
        text: "This project is a TypeScript MCP server that handles weather and data."
      }]
    };
  }
  throw new Error("Resource not found");
});

// 6. Connect to Transport (Standard Input/Output)
const transport = new StdioServerTransport();
await myServer.connect(transport);