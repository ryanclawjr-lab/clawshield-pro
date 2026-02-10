"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { Shield, ArrowLeft, CheckCircle, AlertTriangle, Lock, Zap, Eye, Search, Activity } from "lucide-react";

interface ScanResult {
  id: number;
  type: "info" | "warning" | "success" | "error";
  message: string;
  detail?: string;
}

export default function ScannerDemo() {
  const [agentName, setAgentName] = useState("DemoAgent");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [scanResults]);

  const addResult = useCallback((type: ScanResult["type"], message: string, detail?: string) => {
    setScanResults(prev => [...prev, { id: Date.now() + Math.random(), type, message, detail }]);
  }, []);

  const simulateScan = useCallback(async () => {
    if (!agentName.trim()) {
      addResult("error", "Please enter an agent name first");
      return;
    }

    setIsScanning(true);
    setScanResults([]);
    setProgress(0);
    setCompleted(false);

    // Phase 1: Initializing
    addResult("info", `Initializing security scan for: ${agentName}`);
    await delay(800);
    setProgress(10);

    // Phase 2: Code analysis
    addResult("info", "Analyzing code structure...");
    await delay(600);
    setProgress(25);
    addResult("warning", "Found 3 file system access patterns", "Review permission requirements");
    await delay(400);
    setProgress(35);

    // Phase 3: Dependency check
    addResult("info", "Checking dependencies for known vulnerabilities...");
    await delay(700);
    setProgress(50);
    addResult("success", "No malicious dependencies detected");
    await delay(300);
    setProgress(60);

    // Phase 4: Network analysis
    addResult("info", "Analyzing network calls...");
    await delay(500);
    setProgress(75);
    addResult("warning", "External API calls detected", "Ensure endpoints are trusted");
    await delay(300);
    setProgress(85);

    // Phase 5: Credential scan
    addResult("info", "Scanning for credential exposure...");
    await delay(400);
    setProgress(95);
    addResult("success", "No hardcoded credentials found");
    await delay(200);

    // Completion
    setProgress(100);
    setCompleted(true);
    setIsScanning(false);

    addResult("success", "Scan Complete!");
    addResult("info", `Agent: ${agentName}`);
    addResult("info", "Risk Score: LOW (32/100)");
    addResult("info", "Issues Found: 2 (both medium severity)");
    addResult("info", "Recommendation: Review file access patterns");

  }, [agentName, addResult]);

  const reset = useCallback(() => {
    setScanResults([]);
    setProgress(0);
    setCompleted(false);
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getTypeStyle = (type: ScanResult["type"]) => {
    switch (type) {
      case "error": return "text-red-400";
      case "warning": return "text-yellow-400";
      case "success": return "text-green-400";
      default: return "text-blue-400";
    }
  };

  const getTypeIcon = (type: ScanResult["type"]) => {
    switch (type) {
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
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            ← Back
          </Link>
          <div className="flex items-center gap-4 mt-4">
            <Shield className="w-12 h-12 text-[#FF4444]" />
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                ClawShield Scanner
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                AI Agent Security Analysis
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel: Controls */}
          <div className="space-y-6">
            {/* Input */}
            <div className="bg-[#12121a] border border-[#333] rounded-xl p-6">
              <label className="block text-sm text-gray-400 mb-2">
                Agent Name / Repository URL
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Enter agent name or repo URL"
                className="w-full bg-[#0a0a0f] border border-[#333] text-white px-4 py-3 rounded-lg focus:border-[#FF4444] focus:outline-none transition-colors"
              />
            </div>

            {/* Scan Button */}
            <button
              onClick={simulateScan}
              disabled={isScanning || !agentName.trim()}
              className={`w-full py-4 px-6 rounded-lg text-sm font-bold tracking-wider transition-all ${
                isScanning
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#FF4444] text-black hover:bg-[#FF6666]"
              }`}
            >
              {isScanning ? "SCANNING..." : "RUN SECURITY SCAN"}
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
                    className="h-full bg-[#FF4444] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Reset */}
            {completed && (
              <button
                onClick={reset}
                className="w-full py-3 border border-[#333] text-gray-400 hover:text-white hover:border-[#FF4444]/50 rounded-lg text-sm font-bold transition-all"
              >
                SCAN ANOTHER AGENT
              </button>
            )}

            {/* Security Stats */}
            <div className="bg-[#12121a] border border-[#333] rounded-xl p-6">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#FF4444]" />
                Security Checks Included
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <Search className="w-4 h-4 text-[#FF4444]" />
                  Code analysis
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <AlertTriangle className="w-4 h-4 text-[#FF4444]" />
                  Vulnerability scan
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Eye className="w-4 h-4 text-[#FF4444]" />
                  Credential detection
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Zap className="w-4 h-4 text-[#FF4444]" />
                  Network analysis
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Activity className="w-4 h-4 text-[#FF4444]" />
                  Dependency check
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield className="w-4 h-4 text-[#FF4444]" />
                  Supply chain
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#1a1a2e] border border-[#FF4444]/30 rounded-xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-3">
                Need a full security audit?
              </p>
              <Link
                href="/signup"
                className="inline-block bg-[#FF4444] text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#FF6666] transition-colors"
              >
                Subscribe for $10/mo
              </Link>
            </div>
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
                  <Shield className="w-16 h-16 text-[#333] mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">
                    Enter an agent name and click
                    <br />
                    <span className="text-[#FF4444]">&quot;RUN SECURITY SCAN&quot;</span>
                    <br />
                    to start analysis
                  </p>
                </div>
              ) : (
                scanResults.map((result) => (
                  <div
                    key={result.id}
                    className={`p-3 rounded-lg ${
                      result.type === "error"
                        ? "bg-red-950/30 border border-red-900/30"
                        : result.type === "warning"
                          ? "bg-yellow-950/30 border border-yellow-900/30"
                          : result.type === "success"
                            ? "bg-green-950/30 border border-green-900/30"
                            : "bg-blue-950/30 border border-blue-900/30"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{getTypeIcon(result.type)}</span>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${getTypeStyle(result.type)}`}>
                          {result.message}
                        </p>
                        {result.detail && (
                          <p className="text-xs text-gray-500 mt-1">
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
      </div>
    </div>
  );
}
