"use client";

import { useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Shield, ArrowLeft, CheckCircle, Wallet, Loader2, Copy, ExternalLink } from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams?.get("service") || "security-audit";
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    repoUrl: "",
    email: "",
    tgUsername: "",
    notes: "",
  });

  const services: Record<string, { title: string; price: number; description: string }> = {
    "security-audit": { title: "Security Audit", price: 0.5, description: "18+ checks, detailed evidence, remediation plan" },
    "agent-verification": { title: "Agent Verification (ERC-8004)", price: 1.5, description: "On-chain identity registration & trust scoring" },
    "code-review": { title: "Code Review", price: 0.5, description: "Python, JS, TypeScript security analysis" },
    "prompt-injection-test": { title: "Prompt Injection Test", price: 0.5, description: "Shield from jailbreaks & prompt attacks" },
    "skillmd-verification": { title: "Skill.md Verification", price: 0.5, description: "Supply chain security for skill manifests" },
    "social-injection-test": { title: "Social Injection Test", price: 0.5, description: "Context manipulation & social engineering defense" },
    "insider-threat": { title: "Insider Threat Assessment", price: 0.5, description: "Access patterns & privilege escalation audit" },
    "capability-gated": { title: "Capability-Gated Architecture", price: 1.5, description: "Cryptographic boundaries & least-privilege design" },
    "smart-contract-audit": { title: "Smart Contract Audit", price: 5, description: "DeFi security review & vulnerability assessment" },
    "full-audit": { title: "Full Security Audit", price: 0.50, description: "Complete security posture assessment" },
  };

  const service = services[serviceParam] || { title: "Security Audit", price: 0.5, description: "18+ checks, detailed evidence, remediation plan" };

  const copyAddress = useCallback(() => {
    navigator.clipboard.writeText("0x687716fd518a5B257cE13455Ffd9967db309Ac1B");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`Order submitted! We'll verify payment and start your ${service.title}. Check your email/Telegram for confirmation.`);
    setIsProcessing(false);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <div>
        <div className="bg-[#12121a] border border-[#333] rounded-2xl p-6">
          <h2 className="text-white font-bold text-xl mb-4">Order Summary</h2>
          <div className="flex items-start gap-4 mb-6 p-4 bg-[#0a0a0f] rounded-xl border border-[#333]">
            <div className="w-12 h-12 rounded-xl bg-[#FF4444]/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-[#FF4444]" />
            </div>
            <div>
              <h3 className="text-white font-bold">{service.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{service.description}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-[#FF4444]">{service.price} USDC</div>
              <div className="text-gray-500 text-xs">Total</div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            {["Detailed security audit", "Findings report with evidence", "Remediation recommendations", "Results delivered via email/Telegram"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" /><span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment & Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#12121a] border border-[#333] rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm mb-4">Project Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Repository URL *</label>
              <input type="url" required placeholder="https://github.com/username/repo" className="w-full bg-[#0a0a0f] border border-[#333] text-white px-4 py-3 rounded-lg focus:border-[#FF4444] focus:outline-none" value={formData.repoUrl} onChange={e => setFormData(f => ({ ...f, repoUrl: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Email *</label>
              <input type="email" required placeholder="your@email.com" className="w-full bg-[#0a0a0f] border border-[#333] text-white px-4 py-3 rounded-lg focus:border-[#FF4444] focus:outline-none" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Telegram (optional)</label>
              <input type="text" placeholder="@username" className="w-full bg-[#0a0a0f] border border-[#333] text-white px-4 py-3 rounded-lg focus:border-[#FF4444] focus:outline-none" value={formData.tgUsername} onChange={e => setFormData(f => ({ ...f, tgUsername: e.target.value }))} />
            </div>
          </div>
        </div>

        <div className="bg-[#12121a] border border-[#333] rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2"><Wallet className="w-4 h-4 text-[#FF4444]" />Payment (USDC on Base)</h3>
          <div className="p-4 bg-[#0a0a0f] rounded-xl border border-[#333] mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Amount:</span>
              <span className="text-[#FF4444] font-bold text-xl">{service.price} USDC</span>
            </div>
            <div className="border-t border-[#333] pt-3 mt-3">
              <label className="block text-xs text-gray-400 mb-2">Send payment to:</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-[#FF4444] text-xs break-all bg-[#12121a] p-2 rounded border border-[#333]">0x687716fd518a5B257cE13455Ffd9967db309Ac1B</code>
                <button type="button" onClick={copyAddress} className="p-2 border border-[#333] rounded-lg hover:border-[#FF4444]/50">
                  {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
            </div>
          </div>
          <a href="https://wallet.base.org/" target="_blank" rel="noopener" className="flex items-center gap-2 text-xs text-[#FF4444] hover:text-[#FF6666] mb-4"><ExternalLink className="w-3 h-3" />Open Base Wallet</a>
          <button type="submit" disabled={isProcessing} className={`w-full py-4 px-6 rounded-lg text-sm font-bold tracking-wider ${isProcessing ? "bg-gray-800 text-gray-500" : "bg-[#FF4444] text-black hover:bg-[#FF6666]"}`}>
            {isProcessing ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin" />PROCESSING...</span> : "CONFIRM ORDER"}
          </button>
          <p className="text-gray-500 text-xs text-center mt-3">We'll verify payment and start within 24 hours.</p>
        </div>
      </form>
    </div>
  );
}

export default function Checkout() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <Link href="/services" className="text-[#FF4444] hover:text-[#FF6666] flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" />← Back to Services
          </Link>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#FF4444]" /></div>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  );
}
