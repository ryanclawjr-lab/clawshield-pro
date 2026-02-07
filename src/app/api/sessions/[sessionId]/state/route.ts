import { NextRequest, NextResponse } from "next/server";
import { getAgent } from "@/lib/fishnet";

// In-memory session store for demo
const sessions = new Map<string, {
  id: string;
  agentId: string;
  agentName: string;
  status: "waiting" | "active" | "complete";
  createdAt: string;
  lastActivity: string;
}>();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const agent = await getAgent(request);

    if (!agent) {
      return NextResponse.json(
        { error: "unauthorized", message: "Valid fishnet-auth bearer token required" },
        { status: 401 }
      );
    }

    const { sessionId } = await params;
    const session = sessions.get(sessionId);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.agentId !== agent.id) {
      return NextResponse.json({ error: "Not your session" }, { status: 403 });
    }

    session.lastActivity = new Date().toISOString();

    return NextResponse.json(
      {
        sessionId: session.id,
        status: session.status,
        state: {
          phase: session.status === "waiting" ? "lobby" : "game",
          playerCount: session.status === "waiting" ? 1 : 2,
          maxPlayers: 2,
          turn: session.status === "active" ? agent.name : null,
        },
        availableActions:
          session.status === "waiting"
            ? ["wait", "leave"]
            : session.status === "active"
              ? ["make_move", "forfeit"]
              : ["view_result"],
        spectatorUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/watch/${sessionId}`,
        result: session.status === "complete" ? { winner: "demo", reason: "test_complete" } : null,
      },
      { headers: { "X-Agent-Capable": "true" } }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
