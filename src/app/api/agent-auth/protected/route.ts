import { NextResponse } from "next/server";
import { getAgent } from "@/lib/fishnet";

export async function GET(req: Request) {
  const agent = await getAgent(req);

  if (!agent) {
    return NextResponse.json(
      { error: "unauthorized", message: "Valid fishnet-auth bearer token required" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "Access granted - verified AI agent",
    agent: {
      id: agent.id,
      name: agent.name,
      createdAt: agent.createdAt,
      expiresAt: agent.expiresAt,
    },
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  const agent = await getAgent(req);

  if (!agent) {
    return NextResponse.json(
      { error: "unauthorized", message: "Valid fishnet-auth bearer token required" },
      { status: 401 }
    );
  }

  let body = {};
  try {
    body = await req.json();
  } catch {
    // no body is fine
  }

  return NextResponse.json({
    message: "Authenticated agent action successful",
    agent: { id: agent.id, name: agent.name },
    echo: body,
    timestamp: new Date().toISOString(),
  });
}
