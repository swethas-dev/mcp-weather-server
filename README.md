# MCP Weather Server

A TypeScript-based **Model Context Protocol (MCP) Server** that exposes weather tools, resources, and prompt templates to AI clients like Claude Desktop. Built using the official `@modelcontextprotocol/sdk`.

---

## Features

- **Tool** — `get_weather`: Returns current weather for any given city
- **Resource** — `file:///project-info.txt`: Exposes a project overview file to the AI client
- **Prompt Template** — `weather-report-template`: A reusable prompt that instructs the AI to fetch weather for a city and generate a contextual summary

---

## How It Works

The server communicates with AI clients via **Standard Input/Output (stdio)** transport — the standard for local MCP servers.

```
AI Client (Claude Desktop)
        ↕  stdio
  MCP Weather Server
        ↕
  Weather Tool / Resources / Prompts
```

When connected to Claude Desktop, the AI can:
1. Call the `get_weather` tool with a city name
2. Read the `project-info.txt` resource
3. Use the `weather-report-template` prompt to generate weather-aware project summaries

---

## Tech Stack

- **TypeScript** (ES2022, NodeNext modules)
- **@modelcontextprotocol/sdk** v1.25+
- **Node.js**

---

## Project Structure

```
mcp-weather-server/
├── src/
│   └── index.ts          # Main server — tools, resources, prompts
├── build/
│   ├── index.js          # Compiled output
│   ├── index.d.ts
│   ├── index.js.map
│   └── index.d.ts.map
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/swethas-dev/mcp-weather-server.git
cd mcp-weather-server
npm install
```

### Build

```bash
npm run build
```

### Run

```bash
npm start
```

---

## Connecting to Claude Desktop

Add this to your Claude Desktop config file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "weather-server": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-weather-server/build/index.js"]
    }
  }
}
```

Restart Claude Desktop — the weather tool will now be available in your conversations.

---

## MCP Capabilities

| Capability | Name | Description |
|---|---|---|
| Tool | `get_weather` | Get current weather for a city |
| Resource | `file:///project-info.txt` | Project overview text |
| Prompt | `weather-report-template` | Weather + project summary prompt |

---

## Related Project

Also built a **Python-based FastMCP server** at Larsen & Toubro with tools for weather, code generation, academic lookups, and Pomodoro study planning — [view resume](https://www.linkedin.com/in/swethas-dev)

---

## Author

**Swetha S** — [LinkedIn](https://www.linkedin.com/in/swethas-dev) · [GitHub](https://github.com/swethas-dev)
