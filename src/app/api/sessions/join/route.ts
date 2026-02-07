import { NextRequest, NextResponse } from "next/server";
import { getAgent } from "@/lib/fishnet";
import { v4 as uuidv4 } from "uuid";

// In-memory session store for demo
const sessions = new Map<string, {
  id: string;
  agentId: string;
  agentName: string;
  status: "waiting" | "active" | "complete";
  createdAt: string;
  lastActivity: string;
}>();

export { sessions };

export async function POST(request: NextRequest) {
  try {
    const agent = await getAgent(request);

    if (!agent) {
      return NextResponse.json(
        { error: "unauthorized", message: "Valid fishnet-auth bearer token required" },
        { status: 401 }
      );
    }

    const sessionId = `session_${uuidv4()}`;

    const session = {
      id: sessionId,
      agentId: agent.id,
      agentName: agent.name,
      status: "waiting" as const,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };

    sessions.set(sessionId, session);

    return NextResponse.json(
      {
        sessionId,
        status: "waiting",
        state: {
          phase: "lobby",
          playerCount: 1,
          maxPlayers: 2,
        },
        availableActions: ["wait", "leave"],
        spectatorUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/watch/${sessionId}`,
        result: null,
      },
      { status: 201, headers: { "X-Agent-Capable": "true" } }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
