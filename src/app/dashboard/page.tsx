"use client";

import { useState, useEffect } from "react";
import { Shield, CheckCircle, AlertTriangle, Zap, Activity, Eye, Lock, Key, Globe, ChevronRight, FileCheck, Terminal, User } from "lucide-react";
import { usePaymentVerification } from "@/lib/payment-verification";

export default function Dashboard() {
  const [wallet, setWallet] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [tier, setTier] = useState("");
  const { verify, loading, verified, services } = usePaymentVerification();

  useEffect(() => {
    // Check for existing session
    const savedTier = localStorage.getItem("clawshield_tier");
    const savedWallet = localStorage.getItem("clawshield_wallet");
    if (savedTier && savedWallet) {
      setTier(savedTier);
      setIsVerified(true);
    }
  }, []);

  const handleVerify = async () => {
    if (!wallet) return;
    const result = await verify(wallet);
    if (result.verified && result.tier) {
      setIsVerified(true);
      setTier(result.tier);
    }
  };

  const allServices = [
    {
      category: "Monitoring",
      icon: Activity,
      items: [
        { name: "Weekly Security Scan", tier: "Watchtower", desc: "Weekly automated security checks" },
        { name: "Daily Security Scan", tier: "Protect", desc: "Daily automated security checks" },
        { name: "Continuous Monitoring", tier: "Sentinel", desc: "24/7 real-time threat monitoring" },
      ],
    },
    {
      category: "Detection",
      icon: Eye,
      items: [
        { name: "Threat Intelligence Feed", tier: "Watchtower", desc: "Access to threat database" },
        { name: "Real-time Anomaly Detection", tier: "Sentinel", desc: "AI-powered anomaly detection" },
      ],
    },
    {
      category: "Protection",
      icon: Shield,
      items: [
        { name: "Input Sanitization", tier: "Protect", desc: "Blocks injection attacks" },
        { name: "Docker Sandbox", tier: "Sentinel", desc: "Isolated execution environment" },
      ],
    },
    {
      category: "Compliance",
      icon: FileCheck,
      items: [
        { name: "Monthly Security Report", tier: "Watchtower", desc: "PDF security summary" },
        { name: "Weekly Reports", tier: "Protect", desc: "Detailed weekly analysis" },
        { name: "Compliance Documentation", tier: "Sentinel", desc: "Full audit trail & compliance docs" },
      ],
    },
    {
      category: "Verification",
      icon: Key,
      items: [
        { name: "Skill Verification (5/mo)", tier: "Protect", desc: "5 skill verifications monthly" },
        { name: "Unlimited Verification", tier: "Sentinel", desc: "Unlimited skill verification" },
        { name: "ERC-8004 Registration", tier: "All", desc: "On-chain agent identity" },
      ],
    },
    {
      category: "Support",
      icon: Terminal,
      items: [
        { name: "Email Alerts", tier: "Watchtower", desc: "Critical issue notifications" },
        { name: "Telegram Priority Channel", tier: "Protect", desc: "Direct support access" },
        { name: "Priority Support", tier: "Sentinel", desc: "24/7 priority support" },
      ],
    },
  ];

  const hasAccess = (requiredTier: string) => {
    if (requiredTier === "All") return true;
    const tiers = ["Watchtower", "Protect", "Sentinel"];
    const userTierIndex = tiers.indexOf(tier);
    const requiredIndex = tiers.indexOf(requiredTier);
    return userTierIndex >= requiredIndex;
  };

  const handleLogout = () => {
    localStorage.removeItem("clawshield_tier");
    localStorage.removeItem("clawshield_wallet");
    setIsVerified(false);
    setTier("");
    setWallet("");
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white font-mono flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="mb-8 text-center">
            <Shield className="w-16 h-16 text-[#FF4444] mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Customer Portal</h1>
            <p className="text-gray-400 mt-2">Access your security services</p>
          </div>

          <div className="bg-[#12121a] border border-[#333] rounded-2xl p-6">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Your Wallet Address</label>
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x..."
                className="w-full bg-[#0a0a0f] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF4444] focus:outline-none"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || !wallet}
              className="w-full bg-[#FF4444] text-black font-bold py-4 rounded-lg hover:bg-[#FF6666] transition-all disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Payment & Access"}
            </button>

            <div className="mt-4 p-4 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-[#FF4444] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-[#FF4444]">Payment Required</p>
                  <p className="text-gray-400">
                    Send USDC to: <code className="text-[#FF4444]">0x687716fd518a5B257cE13455Ffd9967db309Ac1B</code>
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    For demo: use 0x1234567890abcdef1234567890abcdef12345678 (Sentinel tier)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono">
      <header className="border-b border-[#333] p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10 text-[#FF4444]" />
            <div>
              <h1 className="font-bold">Customer Portal</h1>
              <p className="text-sm text-gray-400">
                {tier} Tier • {wallet.slice(0, 6)}...{wallet.slice(-4)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#FF4444]" />
              <span className="text-[#FF4444]">Verified</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#12121a] border border-[#333] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#FF4444]">{tier}</div>
            <div className="text-sm text-gray-400">Your Tier</div>
          </div>
          <div className="bg-[#12121a] border border-[#333] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#FF4444]">
              {services.length || "—"}
            </div>
            <div className="text-sm text-gray-400">Active Services</div>
          </div>
          <div className="bg-[#12121a] border border-[#333] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#FF4444]">
              {tier === "Sentinel" ? "24/7" : tier === "Protect" ? "Same-day" : "Weekly"}
            </div>
            <div className="text-sm text-gray-400">Response Time</div>
          </div>
          <div className="bg-[#12121a] border border-[#333] rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#FF4444]">Active</div>
            <div className="text-sm text-gray-400">Status</div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Your Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allServices.map((category, idx) => (
            <div key={idx} className="bg-[#12121a] border border-[#333] rounded-xl overflow-hidden">
              <div className="bg-[#FF4444]/10 p-3 border-b border-[#333] flex items-center gap-2">
                <category.icon className="w-5 h-5 text-[#FF4444]" />
                <span className="font-bold">{category.category}</span>
              </div>
              <div className="p-4 space-y-3">
                {category.items.map((item, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg ${
                      hasAccess(item.tier)
                        ? "bg-[#FF4444]/10 border border-[#FF4444]/30"
                        : "bg-[#0a0a0f] border border-[#333] opacity-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-sm">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.desc}</div>
                      </div>
                      {hasAccess(item.tier) ? (
                        <CheckCircle className="w-5 h-5 text-[#FF4444] flex-shrink-0" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="mt-2 text-xs">
                      <span className={`px-2 py-1 rounded ${
                        hasAccess(item.tier)
                          ? "bg-[#FF4444]/20 text-[#FF4444]"
                          : "bg-gray-700 text-gray-400"
                      }`}>
                        {hasAccess(item.tier) ? "✓ Included" : `Upgrade to ${item.tier}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href="/services"
            className="flex-1 bg-[#FF4444] text-black font-bold py-4 rounded-lg hover:bg-[#FF6666] transition-all text-center flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Run Security Scan
          </a>
          <a
            href="/scannerdemo"
            className="flex-1 bg-[#12121a] border border-[#333] font-bold py-4 rounded-lg hover:border-[#FF4444] transition-all text-center flex items-center justify-center gap-2"
          >
            <Terminal className="w-5 h-5 text-[#FF4444]" />
            Demo Scanner
          </a>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Need help? Contact us on Moltbook or Telegram</p>
          <p className="mt-2">ClawShield © 2026 • ERC-8004 Agent ID 2079</p>
        </div>
      </div>
    </div>
  );
}
