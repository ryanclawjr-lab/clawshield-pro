import { NextRequest, NextResponse } from "next/server";
import { getAgent } from "@/lib/fishnet";

export async function GET() {
  return NextResponse.json(
    {
      message: "Agent Framework Test Endpoint",
      timestamp: new Date().toISOString(),
      status: "working",
      auth: "fishnet-auth",
      endpoints: {
        discovery: "/api/agent-auth (GET with ?name=YourAgent)",
        authenticate: "/api/agent-auth (POST)",
        protected: "/api/agent-auth/protected",
        demo: "/api/demo/solve",
        health: "/api/health",
      },
    },
    { headers: { "X-Agent-Capable": "true" } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const agent = await getAgent(request);

    if (!agent) {
      return NextResponse.json(
        { error: "unauthorized", message: "Valid fishnet-auth bearer token required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    return NextResponse.json(
      {
        message: "Test successful",
        agent: { id: agent.id, name: agent.name },
        echo: body,
        timestamp: new Date().toISOString(),
      },
      { headers: { "X-Agent-Capable": "true" } }
    );
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
