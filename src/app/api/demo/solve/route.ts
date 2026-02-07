import { NextRequest, NextResponse } from "next/server";
import { engine } from "@/lib/fishnet";

/**
 * Demo endpoint: runs the full fishnet-auth agent authentication flow server-side.
 *
 * This uses a simple deterministic solver for "easy" difficulty tasks.
 * In production, agents would use their own LLM as the solver.
 *
 * POST /api/demo/solve { "name": "MyAgent" }
 */
export async function POST(req: NextRequest) {
  let body: { name?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_body", message: "Request body must be valid JSON with a name field." },
      { status: 400 }
    );
  }

  const agentName = body.name?.trim();
  if (!agentName) {
    return NextResponse.json(
      { error: "missing_name", message: "Provide a name for the agent." },
      { status: 400 }
    );
  }

  const steps: Array<{ step: string; detail: unknown; timestamp: string }> = [];

  function log(step: string, detail: unknown) {
    steps.push({ step, detail, timestamp: new Date().toISOString() });
  }

  // Step 1: Discovery
  const discovery = engine.getDiscovery(agentName);
  log("discovery", {
    seed: discovery.seed,
    seedExpiresAt: discovery.seedExpiresAt,
    taskCount: discovery.taskCount,
    minCorrect: discovery.minCorrect,
    authEndpoint: discovery.authEndpoint,
    taskTypes: discovery.tasks.map((t: { type: string }) => t.type),
  });

  // Step 2: Solve tasks with deterministic solver
  const answers: string[] = [];
  const solveDetails: Array<{ type: string; instruction: string; input: unknown; answer: string }> = [];

  for (const task of discovery.tasks) {
    const answer = solveTask(task);
    answers.push(answer);
    solveDetails.push({
      type: task.type,
      instruction: task.instruction,
      input: task.input,
      answer,
    });
  }

  log("solved", { tasks: solveDetails });

  // Step 3: Authenticate
  const authResult = await engine.authenticate({
    name: agentName,
    seed: discovery.seed,
    answers,
  });

  if (authResult.success) {
    log("authenticated", {
      agentId: authResult.data.agentId,
      apiKey: authResult.data.apiKey,
      expiresAt: authResult.data.expiresAt,
    });

    return NextResponse.json({
      success: true,
      agentId: authResult.data.agentId,
      apiKey: authResult.data.apiKey,
      expiresAt: authResult.data.expiresAt,
      steps,
    });
  }

  log("failed", authResult.error);

  return NextResponse.json(
    { success: false, error: authResult.error, steps },
    { status: 401 }
  );
}

// ---------------------------------------------------------------------------
// Deterministic solver for easy-difficulty fishnet-auth tasks.
// An actual agent would use their LLM here. This solver exists purely for
// the demo so developers can see the full protocol in action.
// ---------------------------------------------------------------------------

interface Task {
  type: string;
  instruction: string;
  input: unknown;
}

function solveTask(task: Task): string {
  switch (task.type) {
    case "reverse":
      return solveReverse(task.input as string);

    case "arraySort":
      return solveArraySort(task.input as string[]);

    case "pattern":
      return solvePattern(task.input as string);

    case "firstLetters":
      return solveFirstLetters(task.input as string[]);

    case "interleave":
      return solveInterleave(task.input as { first: string; second: string });

    case "nthWord":
      return solveNthWord(task.instruction, task.input as string[]);

    case "jsonBuild":
      return solveJsonBuild(task.instruction, task.input as unknown);

    case "caesarShift":
      return solveCaesarShift(task.instruction, task.input as string);

    case "transform":
      return solveTransform(task.instruction, task.input as string);

    case "wordLengths":
      return solveWordLengths(task.input as string[]);

    case "filterWords":
      return solveFilterWords(task.instruction, task.input as string[]);

    default:
      return "";
  }
}

function solveReverse(input: string): string {
  return input.split("").reverse().join("");
}

function solveArraySort(input: string[]): string {
  return [...input].sort().join(",");
}

function solvePattern(input: string): string {
  const elements = input.split(",");
  // Find the shortest repeating cycle
  for (let len = 2; len <= Math.floor(elements.length / 2); len++) {
    const candidate = elements.slice(0, len);
    let match = true;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] !== candidate[i % len]) {
        match = false;
        break;
      }
    }
    if (match) {
      return candidate.join(",");
    }
  }
  return elements.slice(0, Math.floor(elements.length / 3)).join(",");
}

function solveFirstLetters(input: string[]): string {
  return input.map((w) => w[0]).join("");
}

function solveInterleave(input: { first: string; second: string }): string {
  let result = "";
  const len = Math.max(input.first.length, input.second.length);
  for (let i = 0; i < len; i++) {
    if (i < input.first.length) result += input.first[i];
    if (i < input.second.length) result += input.second[i];
  }
  return result;
}

function solveNthWord(instruction: string, input: string[]): string {
  const match = instruction.match(/word\s+(?:number\s+)?(\d+)/i);
  if (!match) return input[0];
  const n = parseInt(match[1], 10);
  return input[n - 1] || "";
}

function solveJsonBuild(_instruction: string, _input: unknown): string {
  // jsonBuild tasks vary -- return best-effort JSON
  return JSON.stringify(_input);
}

function solveCaesarShift(instruction: string, input: string): string {
  const shiftMatch = instruction.match(/(\d+)\s+position/i);
  const shift = shiftMatch ? parseInt(shiftMatch[1], 10) : 3;
  return input
    .split("")
    .map((ch) => {
      if (/[a-z]/.test(ch)) {
        return String.fromCharCode(((ch.charCodeAt(0) - 97 + shift) % 26) + 97);
      }
      if (/[A-Z]/.test(ch)) {
        return String.fromCharCode(((ch.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      return ch;
    })
    .join("");
}

function solveTransform(instruction: string, input: string): string {
  let result = input;
  const steps = instruction.toLowerCase();
  if (steps.includes("reverse")) result = result.split("").reverse().join("");
  if (steps.includes("uppercase")) result = result.toUpperCase();
  if (steps.includes("lowercase")) result = result.toLowerCase();
  return result;
}

function solveWordLengths(input: string[]): string {
  return input.map((w) => w.length.toString()).join(",");
}

function solveFilterWords(instruction: string, input: string[]): string {
  const match = instruction.match(/more than (\d+)/i) || instruction.match(/longer than (\d+)/i);
  const threshold = match ? parseInt(match[1], 10) : 5;
  return input
    .filter((w) => w.length > threshold)
    .sort()
    .join(",");
}
