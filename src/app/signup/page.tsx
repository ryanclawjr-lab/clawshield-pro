import Link from "next/link";
import { Shield, CheckCircle, ArrowLeft, Wallet, Globe, MessageCircle, ArrowRight } from "lucide-react";

export default function Signup() {
  const tiers = [
    {
      name: "Monitor",
      displayName: "Monitor",
      price: 10,
      period: "/month",
      description: "Essential monitoring for individual agents",
      features: [
        "Weekly security scans",
        "Threat intelligence feed",
        "Email alerts on critical issues",
        "Dashboard access",
        "Monthly security report",
      ],
      cta: "Go Basic",
      highlighted: false,
    },
    {
      name: "Protect",
      displayName: "Protect",
      price: 25,
      period: "/month",
      description: "Active protection for agent networks",
      features: [
        "Daily security scans",
        "Real-time threat monitoring",
        "Priority alerts (SMS + Telegram)",
        "Live dashboard with metrics",
        "Weekly security reports",
        "Incident response support",
        "Skill verification credits (5/mo)",
      ],
      cta: "Go Pro",
      highlighted: true,
    },
    {
      name: "Sentinel",
      displayName: "Sentinel",
      price: 50,
      period: "/month",
      description: "24/7 protection for serious deployments",
      features: [
        "Continuous monitoring",
        "Real-time anomaly detection",
        "15-minute SLA on alerts",
        "Dedicated Telegram channel",
        "Unlimited skill verification",
        "Monthly penetration testing",
        "Compliance documentation",
        "Priority support",
      ],
      cta: "Go Sentinel",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono">
      <main className="flex min-h-screen flex-col items-center p-8">
        
        {/* Back Link */}
        <Link href="/" className="text-[#FF4444] hover:text-[#FF6666] mb-8 flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" />
          ← Back to ClawShield
        </Link>

        {/* Header */}
        <div className="mb-8 text-center">
          <Shield className="w-16 h-16 text-[#FF4444] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Subscribe to ClawShield
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Choose your protection level. Pay in USDC on Base. Get instant access.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-12 w-full max-w-4xl">
          <h2 className="text-white text-center text-xl font-bold mb-6 tracking-wider">HOW TO SUBSCRIBE</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#12121a] border border-[#333] rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#FF4444]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF4444] font-bold">1</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-2">Choose Tier</h3>
              <p className="text-gray-500 text-xs">Select your protection level</p>
            </div>
            <div className="text-center p-4 bg-[#12121a] border border-[#333] rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#FF4444]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF4444] font-bold">2</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-2">Send USDC</h3>
              <p className="text-gray-500 text-xs">Transfer to our wallet on Base</p>
            </div>
            <div className="text-center p-4 bg-[#12121a] border border-[#333] rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#FF4444]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF4444] font-bold">3</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-2">Get Receipt</h3>
              <p className="text-gray-500 text-xs">Confirmation sent automatically</p>
            </div>
            <div className="text-center p-4 bg-[#12121a] border border-[#333] rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#FF4444]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF4444] font-bold">4</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-2">Access Dashboard</h3>
              <p className="text-gray-500 text-xs">Instant activation</p>
            </div>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="mb-12 w-full max-w-6xl">
          <h3 className="text-white text-center text-xl font-bold mb-2 tracking-wider">SUBSCRIPTION PLANS</h3>
          <p className="text-gray-500 text-center text-sm mb-8">Continuous protection for your AI agents</p>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative border rounded-2xl p-6 transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-[#FF4444]/5 border-[#FF4444]/50 scale-105"
                    : "bg-[#12121a] border-[#333] hover:border-[#FF4444]/30"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF4444] text-black text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{tier.displayName}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-[#FF4444]">${tier.price}</span>
                  <span className="text-gray-500 text-sm">{tier.period}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-[#FF4444] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <a
                    href="/signup"
                    className="block text-center py-3 rounded-lg text-sm font-bold transition-colors bg-[#FF4444] text-black hover:bg-[#FF6666]"
                  >
                    {tier.cta}
                  </a>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">
                      Send ${tier.price} USDC to:
                    </div>
                    <code className="text-[#FF4444] text-xs break-all block bg-[#0a0a0f] p-2 rounded border border-[#333] font-mono">
                      0x687716fd518a5B257cE13455Ffd9967db309Ac1B
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="mb-12 p-6 bg-[#12121a] border border-[#333] rounded-2xl max-w-2xl w-full">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#FF4444]" />
            Payment Instructions
          </h3>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <span className="bg-[#FF4444]/10 text-[#FF4444] w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-bold">1</span>
              <span>Open your wallet (MetaMask, Rabby, etc.)</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-[#FF4444]/10 text-[#FF4444] w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-bold">2</span>
              <span>Switch to <strong>Base network</strong></span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-[#FF4444]/10 text-[#FF4444] w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-bold">3</span>
              <span>Send <strong>USDC</strong> (not ETH) to the address above</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-[#FF4444]/10 text-[#FF4444] w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-bold">4</span>
              <span>We&apos;ll detect the payment and activate your account automatically</span>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="mb-12 p-6 bg-[#1a1a2e] border border-[#333] rounded-2xl max-w-2xl w-full text-center">
          <h3 className="text-white font-bold text-lg mb-3">Need Help?</h3>
          <p className="text-gray-400 text-sm mb-4">
            DM us on Moltbook or Telegram and we&apos;ll help you get set up.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://moltbook.com/u/RyanClaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#FF4444] text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#FF6666] transition-colors"
            >
              <Globe className="w-4 h-4" />
              Moltbook DM
            </a>
            <a
              href="https://t.me/clawshield_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#333] text-gray-300 px-6 py-2 rounded-lg text-sm font-bold hover:text-white hover:border-[#FF4444]/50 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Telegram Bot
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            🛡️ ClawShield © 2026 — Security-first AI agent auditing
          </p>
        </div>

      </main>
    </div>
  );
}
