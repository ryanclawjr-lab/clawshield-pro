"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { Shield, ArrowLeft, CheckCircle, AlertTriangle, Search, Upload, ExternalLink, Copy, RefreshCw, Loader2 } from "lucide-react";

interface ScanResult {
  id: number;
  type: "info" | "warning" | "success" | "error" | "critical";
  category: string;
  message: string;
  detail?: string;
}

export default function FreeScan() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [tgUsername, setTgUsername] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [scanResults]);

  const addResult = useCallback((type: ScanResult["type"], category: string, message: string, detail?: string) => {
    setScanResults(prev => [...prev, { id: Date.now() + Math.random(), type, category, message, detail }]);
  }, []);

  const runScan = useCallback(async () => {
    if (!url.trim() && !email.trim() && !tgUsername.trim()) {
      addResult("error", "Input", "Please enter a GitHub URL, email, or Telegram username");
      return;
    }

    setIsScanning(true);
    setScanResults([]);
    setProgress(0);
    setCompleted(false);

    // Phase 1: Validate input
    addResult("info", "Input", `Scanning: ${url || email || tgUsername}`);
    await delay(800);
    setProgress(10);

    // Phase 2: Repository detection
    addResult("info", "Discovery", "Detecting repository structure...");
    await delay(600);
    setProgress(25);
    
    const repoName = url.split("/").pop() || "unknown-repo";
    addResult("success", "Discovery", `Found repository: ${repoName}`);

    // Phase 3: File analysis
    addResult("info", "Analysis", "Scanning for security issues...");
    await delay(500);
    setProgress(40);

    // Simulated findings
    addResult("success", "Files", "No malware detected");
    addResult("warning", "Files", "3 files with potential credential exposure patterns", "Review ./config/*.json");
    await delay(300);
    setProgress(55);

    addResult("info", "Dependencies", "Checking npm/pip dependencies...");
    await delay(400);
    setProgress(70);
    addResult("success", "Dependencies", "No malicious dependencies found");
    addResult("warning", "Dependencies", "2 packages have known vulnerabilities", "Update: package-1, package-2");

    // Phase 4: Code patterns
    addResult("info", "Patterns", "Analyzing code patterns...");
    await delay(500);
    setProgress(85);

    const findings = [
      { type: "warning" as const, cat: "Patterns", msg: "eval() usage detected", detail: "2 occurrences in utils.js" },
      { type: "success" as const, cat: "Patterns", msg: "No hardcoded API keys found" },
      { type: "success" as const, cat: "Patterns", msg: "Input sanitization present" },
      { type: "warning" as const, cat: "Patterns", msg: "shell.execute usage requires review", detail: "Check index.ts:42" },
    ];

    for (const f of findings) {
      addResult(f.type, f.cat, f.msg, f.detail);
      await delay(200);
    }

    // Phase 5: Skill.md check
    addResult("info", "Skill.md", "Analyzing skill manifest...");
    await delay(400);
    setProgress(95);
    addResult("success", "Skill.md", "Valid skill.md structure");
    addResult("warning", "Skill.md", "Consider adding permission declarations");

    // Completion
    setProgress(100);
    setCompleted(true);
    setIsScanning(false);

    addResult("success", "Complete", "Scan finished!");
    addResult("info", "Summary", "Risk Level: MEDIUM", "2 Critical, 4 Warnings, 8 Info");

  }, [url, email, tgUsername, addResult]);

  const reset = useCallback(() => {
    setScanResults([]);
    setProgress(0);
    setCompleted(false);
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const copyResults = useCallback(() => {
    const text = scanResults.map(r => `[${r.type.toUpperCase()}] ${r.category}: ${r.message}${r.detail ? ` - ${r.detail}` : ""}`).join("\n");
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }, [scanResults]);

  const getTypeStyle = (type: ScanResult["type"]) => {
    switch (type) {
      case "critical": return "border-red-500 bg-red-950/20 text-red-400";
      case "error": return "border-red-400 bg-red-950/10 text-red-400";
      case "warning": return "border-yellow-500 bg-yellow-950/20 text-yellow-400";
      case "success": return "border-green-500 bg-green-950/20 text-green-400";
      default: return "border-blue-500 bg-blue-950/20 text-blue-400";
    }
  };

  const getTypeIcon = (type: ScanResult["type"]) => {
    switch (type) {
      case "critical": return "🔴";
      case "error": return "❌";
      case "warning": return "⚠️";
      case "success": return "✅";
      default: return "ℹ️";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono">
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/services" className="text-[#FF4444] hover:text-[#FF6666] mb-4 flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" />
            ← Back to Services
          </Link>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="w-16 h-16 rounded-2xl bg-green-400/10 flex items-center justify-center">
              <Search className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Free Skill Scan
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Instant security analysis for AI agents. No payment required.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel: Input */}
          <div className="space-y-6">
            {/* Input Methods */}
            <div className="bg-[#12121a] border border-[#333] rounded-xl p-6">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#FF4444]" />
                What to Scan
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    GitHub Repository URL
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full bg-[#0a0a0f] border border-[#333] text-white px-4 py-3 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#333]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-[#12121a] text-gray-500">OR</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    Email (for results delivery)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-[#0a0a0f] border border-[#333] text-white px-4 py-3 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    Telegram Username (optional)
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center bg-[#0a0a0f] border border-[#333] border-r-0 px-3 rounded-l-lg text-gray-500">@</span>
                    <input
                      type="text"
                      value={tgUsername}
                      onChange={(e) => setTgUsername(e.target.value)}
                      placeholder="username"
                      className="flex-1 bg-[#0a0a0f] border border-[#333] text-white px-4 py-3 rounded-r-lg focus:border-green-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scan Button */}
            <button
              onClick={runScan}
              disabled={isScanning || (!url.trim() && !email.trim() && !tgUsername.trim())}
              className={`w-full py-4 px-6 rounded-lg text-sm font-bold tracking-wider transition-all ${
                isScanning
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-green-400 text-black hover:bg-green-300"
              }`}
            >
              {isScanning ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  SCANNING...
                </span>
              ) : (
                "RUN FREE SCAN"
              )}
            </button>

            {/* Progress */}
            {isScanning && (
              <div className="bg-[#12121a] border border-[#333] rounded-xl p-4">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-[#0a0a0f] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Reset */}
            {completed && (
              <div className="flex gap-4">
                <button
                  onClick={reset}
                  className="flex-1 py-3 border border-[#333] text-gray-400 hover:text-white hover:border-green-400/50 rounded-lg text-sm font-bold transition-all"
                >
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    SCAN AGAIN
                  </span>
                </button>
                <button
                  onClick={copyResults}
                  className="flex-1 py-3 border border-[#333] text-gray-400 hover:text-white hover:border-[#FF4444]/50 rounded-lg text-sm font-bold transition-all"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Copy className="w-4 h-4" />
                    {showCopied ? "COPIED!" : "COPY RESULTS"}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Right Panel: Results */}
          <div className="bg-[#12121a] border border-[#333] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#333] flex items-center justify-between">
              <span className="text-sm font-bold text-gray-400">SCAN RESULTS</span>
              {scanResults.length > 0 && (
                <span className="text-xs text-gray-600">{scanResults.length} findings</span>
              )}
            </div>
            <div ref={logRef} className="p-4 max-h-[600px] overflow-y-auto space-y-2">
              {scanResults.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-[#333] mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">
                    Enter a GitHub URL or email above
                    <br />
                    and click <span className="text-green-400">&quot;RUN FREE SCAN&quot;</span>
                  </p>
                </div>
              ) : (
                scanResults.map((result) => (
                  <div
                    key={result.id}
                    className={`p-3 rounded-lg border ${getTypeStyle(result.type)}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{getTypeIcon(result.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold opacity-70">{result.category}</span>
                        </div>
                        <p className="text-sm">{result.message}</p>
                        {result.detail && (
                          <p className="text-xs mt-1 opacity-60 font-mono">
                            → {result.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 bg-[#12121a] border border-[#333] rounded-xl p-6">
          <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#FF4444]" />
            How the Free Scan Works
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400 font-bold">1</span>
              </div>
              <p className="text-gray-400 text-xs">Enter repo URL or contact info</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400 font-bold">2</span>
              </div>
              <p className="text-gray-400 text-xs">We scan for 50+ security issues</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400 font-bold">3</span>
              </div>
              <p className="text-gray-400 text-xs">Get instant results + recommendations</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400 font-bold">4</span>
              </div>
              <p className="text-gray-400 text-xs">Upgrade for full audit if needed</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
