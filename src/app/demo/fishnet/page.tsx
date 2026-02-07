"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";

interface SolveStep {
  step: string;
  detail: Record<string, unknown>;
  timestamp: string;
}

interface SolveResponse {
  success: boolean;
  agentId?: string;
  apiKey?: string;
  expiresAt?: string;
  steps: SolveStep[];
  error?: Record<string, unknown>;
}

interface ProtectedResponse {
  message: string;
  agent: { id: string; name: string; createdAt: string; expiresAt: string };
  timestamp: string;
}

type LogEntry = {
  id: number;
  direction: "out" | "in" | "info" | "error" | "ok";
  content: string;
};

let logId = 0;

export default function FishnetDemo() {
  const [agentName, setAgentName] = useState("DemoAgent");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [protectedLoading, setProtectedLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const log = useCallback((direction: LogEntry["direction"], content: string) => {
    setLogs((prev) => [...prev, { id: logId++, direction, content }]);
  }, []);

  const reset = useCallback(() => {
    setLogs([]);
    setApiKey(null);
    logId = 0;
  }, []);

  const runAuth = useCallback(async () => {
    reset();
    setRunning(true);

    try {
      log("info", `Starting fishnet-auth flow for agent "${agentName}"`);
      log("out", `POST /api/demo/solve  { "name": "${agentName}" }`);

      const res = await fetch("/api/demo/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: agentName }),
      });

      const data: SolveResponse = await res.json();

      // Replay the steps into the log
      for (const step of data.steps) {
        if (step.step === "discovery") {
          const d = step.detail as {
            seed: string;
            taskCount: number;
            minCorrect: number;
            taskTypes: string[];
          };
          log("in", `DISCOVERY  seed=${d.seed}  tasks=${d.taskCount}  minCorrect=${d.minCorrect}`);
          log("info", `Task types: ${d.taskTypes.join(", ")}`);
        }

        if (step.step === "solved") {
          const tasks = (step.detail as { tasks: Array<{ type: string; input: unknown; answer: string }> }).tasks;
          for (const t of tasks) {
            const input = typeof t.input === "string" ? t.input : JSON.stringify(t.input);
            log("info", `[${t.type}]  input: ${input}`);
            log("ok", `  answer: ${t.answer}`);
          }
        }

        if (step.step === "authenticated") {
          const a = step.detail as { agentId: string; apiKey: string; expiresAt: string };
          log("ok", `AUTHENTICATED  agentId=${a.agentId}`);
          log("ok", `API Key: ${a.apiKey}`);
          log("info", `Expires: ${a.expiresAt}`);
        }

        if (step.step === "failed") {
          log("error", `AUTH FAILED: ${JSON.stringify(step.detail)}`);
        }
      }

      if (data.success && data.apiKey) {
        setApiKey(data.apiKey);
        log("info", "Agent can now access protected endpoints with this bearer token.");
      }
    } catch (err) {
      log("error", `Request failed: ${String(err)}`);
    } finally {
      setRunning(false);
    }
  }, [agentName, log, reset]);

  const hitProtected = useCallback(async () => {
    setProtectedLoading(true);

    const headers: Record<string, string> = {};
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
      log("out", `GET /api/agent-auth/protected  Authorization: Bearer ${apiKey.slice(0, 16)}...`);
    } else {
      log("out", "GET /api/agent-auth/protected  (no auth token)");
    }

    try {
      const res = await fetch("/api/agent-auth/protected", { headers });
      const data = await res.json();

      if (!res.ok) {
        log("error", `HTTP ${res.status}: ${JSON.stringify(data)}`);
        if (!apiKey) {
          log("info", "Protected endpoint rejected the request. Authenticate an agent first.");
        }
        return;
      }

      log("ok", `${(data as ProtectedResponse).message}`);
      log("in", JSON.stringify((data as ProtectedResponse).agent, null, 2));
    } catch (err) {
      log("error", `Protected request failed: ${String(err)}`);
    } finally {
      setProtectedLoading(false);
    }
  }, [apiKey, log]);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            &larr; Back
          </Link>
          <h1 className="text-3xl font-bold text-blue-400 mt-4 tracking-tight">
            FISHNET-AUTH DEMO
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Reverse CAPTCHA for AI agents. The server generates reasoning tasks
            that are trivial for an LLM but impractical for humans at speed.
            Agents solve the challenge with their own model, submit answers in a
            single POST, and receive credentials. Zero LLM cost on the server.
          </p>
        </div>

        {/* Protocol Flow */}
        <div className="mb-8 p-4 border border-gray-800 bg-gray-950 rounded-lg text-xs text-gray-500 leading-relaxed">
          <div className="text-gray-400 font-bold mb-2">PROTOCOL</div>
          <div className="flex items-center gap-2 flex-wrap">
            <Step label="1. Agent requests challenge" />
            <Arrow />
            <Step label="2. Server returns seed + tasks" />
            <Arrow />
            <Step label="3. Agent solves with LLM" />
            <Arrow />
            <Step label="4. Agent POSTs answers" />
            <Arrow />
            <Step label="5. Server verifies, issues API key" />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Controls */}
          <div className="lg:col-span-2 space-y-4">
            <div className="border border-gray-800 bg-gray-950 rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">AGENT NAME</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none rounded"
                  placeholder="Enter agent name"
                />
              </div>

              <button
                onClick={runAuth}
                disabled={running || !agentName.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white px-4 py-3 text-sm font-bold transition-colors rounded"
              >
                {running ? "RUNNING..." : "RUN AGENT AUTHENTICATION"}
              </button>

              {apiKey && (
                <div className="pt-2 border-t border-gray-800">
                  <div className="text-xs text-gray-500 mb-1">ISSUED API KEY</div>
                  <div className="bg-gray-900 border border-green-900 p-2 rounded text-green-400 text-xs break-all">
                    {apiKey}
                  </div>
                </div>
              )}

              {logs.length > 0 && (
                <button
                  onClick={reset}
                  className="w-full border border-gray-700 hover:border-gray-500 text-gray-500 hover:text-white px-4 py-2 text-xs transition-colors rounded"
                >
                  RESET
                </button>
              )}
            </div>

            {/* Protected Endpoint - always visible */}
            <div className={`border rounded-lg p-4 space-y-3 ${apiKey ? "border-green-800/50 bg-green-950/10" : "border-red-900/50 bg-red-950/10"}`}>
              <div className="text-xs text-gray-400 font-bold">PROTECTED ENDPOINT</div>
              <p className="text-xs text-gray-500">
                {apiKey
                  ? "Agent authenticated. This request will include the bearer token."
                  : "No auth token. Hit this to see the 401 rejection, then authenticate to see it succeed."}
              </p>
              <button
                onClick={hitProtected}
                disabled={protectedLoading}
                className={`w-full px-4 py-2 text-sm font-bold transition-colors rounded ${
                  apiKey
                    ? "bg-green-700 hover:bg-green-600 text-white"
                    : "bg-red-900/50 hover:bg-red-900 border border-red-800 text-red-400"
                } disabled:bg-gray-800 disabled:text-gray-600`}
              >
                {protectedLoading
                  ? "REQUESTING..."
                  : apiKey
                    ? "TEST WITH AUTH TOKEN"
                    : "TEST WITHOUT AUTH (WILL FAIL)"}
              </button>
            </div>

            {/* curl examples */}
            <div className="border border-gray-800 bg-gray-950 rounded-lg p-4 space-y-3">
              <div className="text-xs text-gray-400 font-bold">HOW AN AGENT AUTHENTICATES</div>
              <CurlBlock
                label="1. Get challenge"
                cmd={`curl "http://localhost:3000/api/agent-auth?name=${agentName}"`}
              />
              <CurlBlock
                label="2. Submit answers"
                cmd={`curl -X POST http://localhost:3000/api/agent-auth \\
  -H "Content-Type: application/json" \\
  -d '{"name":"${agentName}","seed":"SEED","answers":[...]}'`}
              />
              <CurlBlock
                label="3. Use API key"
                cmd={`curl http://localhost:3000/api/agent-auth/protected \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
              />
            </div>
          </div>

          {/* Right: Log */}
          <div className="lg:col-span-3">
            <div className="border border-gray-800 bg-gray-950 rounded-lg overflow-hidden sticky top-6">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <span className="text-xs text-gray-400 font-bold">AGENT AUTH LOG</span>
                {logs.length > 0 && (
                  <span className="text-xs text-gray-600">{logs.length} entries</span>
                )}
              </div>
              <div ref={logRef} className="p-4 max-h-[75vh] overflow-y-auto space-y-1">
                {logs.length === 0 ? (
                  <p className="text-gray-600 text-xs">
                    Click &quot;Run Agent Authentication&quot; to watch an agent
                    prove it can think.
                  </p>
                ) : (
                  logs.map((entry) => <LogLine key={entry.id} entry={entry} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ label }: { label: string }) {
  return (
    <span className="bg-gray-900 border border-gray-800 px-2 py-1 rounded text-xs">
      {label}
    </span>
  );
}

function Arrow() {
  return <span className="text-gray-700">&rarr;</span>;
}

function LogLine({ entry }: { entry: LogEntry }) {
  const style: Record<LogEntry["direction"], { color: string; prefix: string }> = {
    out: { color: "text-blue-400", prefix: ">>>" },
    in: { color: "text-gray-300", prefix: "<<<" },
    info: { color: "text-yellow-400", prefix: "---" },
    error: { color: "text-red-400", prefix: "ERR" },
    ok: { color: "text-green-400", prefix: " ok" },
  };
  const s = style[entry.direction];
  return (
    <div className="text-xs flex items-start gap-2">
      <span className={`${s.color} font-bold shrink-0 w-7 text-right`}>{s.prefix}</span>
      <pre className={`${s.color} whitespace-pre-wrap break-all`}>{entry.content}</pre>
    </div>
  );
}

function CurlBlock({ label, cmd }: { label: string; cmd: string }) {
  return (
    <div>
      <div className="text-gray-500 text-xs mb-1">{label}</div>
      <pre className="bg-gray-900 p-2 rounded text-green-400 text-xs whitespace-pre-wrap break-all">
        {cmd}
      </pre>
    </div>
  );
}
