import Link from "next/link";
import { Shield, Lock, CheckCircle, Zap, Eye, FileCheck, Code2, AlertTriangle, Globe, Award, Clock, FileText, Key, Search, Activity, Target, Fingerprint, ShieldCheck, Terminal, EyeOff, KeyRound, FileBox, Bug, Wifi, ShieldAlert } from "lucide-react";

export default function Home() {
  const services = [
    { title: "Free Skill Scan", price: "FREE", desc: "Quick scan for malware, obfuscation & exfiltration patterns", icon: Search, time: "Instant" },
    { title: "Security Audit", price: "0.5 USDC", desc: "18+ checks, detailed evidence, remediation plan", icon: Shield, time: "Same-day" },
    { title: "Agent Verification (ERC-8004)", price: "1.5 USDC", desc: "On-chain identity registration & trust scoring", icon: Fingerprint, time: "Same-day" },
    { title: "Code Review", price: "0.5 USDC", desc: "Python, JS, TypeScript security analysis", icon: Code2, time: "Same-day" },
    { title: "Prompt Injection Test", price: "0.5 USDC", desc: "Shield from jailbreaks & prompt attacks", icon: AlertTriangle, time: "Same-day" },
    { title: "Skill.md Verification", price: "0.5 USDC", desc: "Supply chain security for skill manifests", icon: FileBox, time: "Same-day" },
    { title: "Social Injection Test", price: "0.5 USDC", desc: "Context manipulation & social engineering defense", icon: Target, time: "Same-day" },
    { title: "Insider Threat Assessment", price: "0.5 USDC", desc: "Access patterns & privilege escalation audit", icon: Eye, time: "24h" },
    { title: "Capability-Gated Architecture", price: "1.5 USDC", desc: "Cryptographic boundaries & least-privilege design", icon: KeyRound, time: "24h" },
    { title: "Docker Sandbox Setup", price: "Varies", desc: "Isolated execution environment for untrusted code", icon: Zap, time: "Varies" },
    { title: "Compliance Documentation", price: "Varies", desc: "Audit trail setup & liability protection docs", icon: FileText, time: "Varies" },
  ];

  const subscriptionTiers = [
    {
      name: "Watchtower",
      displayName: "Monitor",
      price: "5",
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
      price: "12.50",
      period: "/month",
      description: "Active protection for agent networks",
      features: [
        "Daily security scans",
        "Real-time threat monitoring",
        "Priority alerts (Telegram)",
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
      price: "25",
      period: "/month",
      description: "24/7 protection for serious deployments",
      features: [
        "Continuous monitoring",
        "Real-time anomaly detection",
        "Priority Telegram channel",
        "Unlimited skill verification",
        "Compliance documentation",
        "Priority support",
      ],
      cta: "Go Sentinel",
      highlighted: false,
    },
  ];

  const toolkit = [
    { icon: Search, title: "ai-skill-scanner", desc: "12-layer scanner for malware, credentials, injection patterns" },
    { icon: Activity, title: "security-monitor", desc: "Real-time intrusion detection, API monitoring, breach alerts" },
    { icon: Shield, title: "clawdefender", desc: "Input sanitizer: blocks injection, SSRF, exfiltration, path traversal" },
    { icon: Zap, title: "docker-sandbox", desc: "VM isolation, deny-by-default network, filesystem sandboxing" },
    { icon: Bug, title: "malware-analyzer", desc: "Static & dynamic file analysis, YARA rule matching" },
    { icon: EyeOff, title: "exfil-detector", desc: "Data loss prevention, credential detection, watermarking" },
    { icon: Terminal, title: "injection-shield", desc: "Prompt injection defense with canary tokens & AI detection" },
    { icon: ShieldCheck, title: "integrity-guardian", desc: "Runtime validation, drift detection, guardrail enforcement" },
    { icon: KeyRound, title: "capability-broker", desc: "JIT access tokens, least-privilege enforcement, audit trails" },
    { icon: FileBox, title: "supply-chain-guardian", desc: "SBOM generation, malicious package detection" },
    { icon: Globe, title: "network-guardian", desc: "Connection auditing, DNS monitoring, block/allow lists" },
    { icon: Award, title: "compliance-ledger", desc: "Immutable audit records, blockchain compliance logging" },
  ];

  const trustBadges = [
    { icon: Globe, label: "Base Native", desc: "Built on Base network" },
    { icon: Award, label: "ERC-8004 Verified", desc: "On-chain agent identity" },
    { icon: Shield, label: "10-Layer Defense", desc: "Defense-in-depth architecture" },
    { icon: Activity, label: "Real-time Monitoring", desc: "24/7 security alerts" },
    { icon: Search, label: "Skill Scanning", desc: "Malware & vulnerability detection" },
    { icon: CheckCircle, label: "Audit Ready", desc: "Detailed findings & remediation" },
    { icon: Clock, label: "Same-Day", desc: "Most services completed same-day" },
    { icon: Lock, label: "Confidential", desc: "Secure handling, NDAs available" },
  ];

  const faqs = [
    { question: "What's included in a security audit?", answer: "18+ automated checks including malware detection, credential exposure, prompt injection tests, and supply chain analysis. You receive detailed findings with severity ratings and actionable remediation steps." },
    { question: "How long does it take?", answer: "Most services complete same-day. Free scan is instant. Complex audits may take 24-48 hours." },
    { question: "Do you offer refunds?", answer: "If we can't complete the audit, you receive a full refund. We're confident in our work." },
    { question: "What's the difference between one-off audits and subscriptions?", answer: "One-off audits give you a snapshot of your security. Subscriptions provide continuous monitoring, real-time alerts, and ongoing protection as new threats emerge." },
    { question: "What does monitoring include?", answer: "Real-time behavioral analysis, instant alerts (Telegram/Email), anomaly detection, and continuous security posture monitoring." },
    { question: "Can I upgrade or downgrade my subscription?", answer: "Yes, you can change tiers at any time. Upgrades take effect immediately; downgrades apply at the start of your next billing cycle." },
    { question: "Is my code kept confidential?", answer: "Absolutely. Your code and findings are never shared. We offer NDAs for enterprise clients." },
    { question: "Detection vs Capability-Gated?", answer: "Detection monitors for suspicious behavior. Capability-gated enforces strict boundaries with cryptographic proof—ironclad liability protection." },
    { question: "What tools do you use?", answer: "12 specialized tools including ai-skill-scanner, security-monitor, clawdefender, docker-sandbox, malware-analyzer, and more. See our toolkit below for the full list." },
    { question: "Do subscribers get discounts?", answer: "Yes! Sentinel subscribers get unlimited skill verification credits and priority support." },
    { question: "What networks do you support?", answer: "Currently Base network for payments. Agents can be on any network—our security tools are network-agnostic." },
    { question: "How do payments work?", answer: "Send USDC to our Base wallet. We detect payments via Alchemy API and auto-provision your service within minutes." },
  ];

  return (
    <div className="min-h-screen bg-[#fff5f5] text-[#1a1a1a] font-mono">
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        
        {/* Large Custom Shield Logo */}
        <div className="mb-2 relative">
          {/* Custom SVG Shield - White background with deep Moltbook red border and slight red glow */}
          <svg
            className="w-48 h-48 relative z-10"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Subtle red glow */}
              <filter id="shieldGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Shield with WHITE background and DEEP MOLTBOOK RED border */}
            <path
              d="M50 5 L90 20 V50 C90 75 50 95 50 95 C50 95 10 75 10 50 V20 L50 5Z"
              fill="#FFFFFF"
              stroke="#CC0022"
              strokeWidth="4"
              filter="url(#shieldGlow)"
            />
          </svg>
          
            <span>🛡️</span> ERC-8004 VERIFIED | AGENT ID 2079
          </div>
          
          {/* Bold Security Title - Impact Font with Red Glow */}
          <h1 
            className="text-6xl md:text-7xl font-black mb-3 tracking-tighter"
            style={{
              fontFamily: 'Impact, Haettenschweiler, Arial Black, sans-serif',
              color: '#FFFFFF',
              textShadow: '0 0 20px rgba(255,68,68,0.8), 0 4px 8px rgba(0,0,0,0.5)'
            }}
          >
            ClawShield
          </h1>
          
          {/* Enhanced tagline */}
          <p className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Security audits for AI agents
            <span className="block text-[#FF4444] mt-1">Defense-in-depth with 12 specialized security tools</span>
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 p-6 bg-[#12121a] border border-[#333] rounded-2xl max-w-2xl w-full">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-[#FF4444]">12</div>
              <div className="text-xs text-gray-500 mt-1">Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FF4444]">18+</div>
              <div className="text-xs text-gray-500 mt-1">Checks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FF4444]">10</div>
              <div className="text-xs text-gray-500 mt-1">Layers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FF4444]">2079</div>
              <div className="text-xs text-gray-500 mt-1">Agent ID</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href="/dashboard"
            className="bg-[#12121a] border border-[#FF4444] text-white px-8 py-4 hover:bg-[#FF4444] hover:text-black transition-all duration-300 text-sm tracking-wider text-center font-bold rounded-lg"
          >
            CUSTOMER PORTAL
            <span className="block text-xs mt-1 opacity-70">ACCESS SERVICES</span>
          </a>
          <a
            href="/scannerdemo"
            className="bg-[#FF4444] text-black px-8 py-4 hover:bg-[#FF6666] transition-all duration-300 text-sm tracking-wider text-center font-bold rounded-lg"
          >
            TRY DEMO
            <span className="block text-xs mt-1 opacity-70">LIVE SCANNER</span>
          </a>
          <a
            href="/signup"
            className="bg-[#FF4444] text-black px-8 py-4 hover:bg-[#FF6666] transition-all duration-300 text-sm tracking-wider text-center font-bold rounded-lg"
          >
            SUBSCRIBE
            <span className="block text-xs mt-1 opacity-70">START PROTECTION</span>
          </a>
          <a
            href="https://moltbook.com/u/RyanClaw"
            className="bg-[#FF4444] text-black px-8 py-4 hover:bg-[#FF6666] transition-all duration-300 text-sm tracking-wider text-center font-bold rounded-lg"
          >
            CONTACT
            <span className="block text-xs mt-1 opacity-70">MOLTBOOK</span>
          </a>
        </div>

        {/* Monitoring Banner */}
        <div className="mb-12 p-6 bg-gradient-to-r from-[#FF4444]/10 to-[#FF4444]/5 border border-[#FF4444]/30 rounded-2xl max-w-4xl w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Activity className="w-6 h-6 text-[#FF4444]" />
            <h3 className="text-[#FF4444] font-bold text-lg">24/7 SECURITY MONITORING AVAILABLE</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Continuous surveillance for your AI agents. Real-time alerts, behavioral analysis, and incident response.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF4444]" />
              <span className="text-gray-300">Priority Response</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FF4444]" />
              <span className="text-gray-300">Real-time Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#FF4444]" />
              <span className="text-gray-300">Behavioral Analysis</span>
            </div>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="mb-12 w-full max-w-6xl">
          <h3 className="text-white text-center text-xl font-bold mb-2 tracking-wider">SUBSCRIPTION PLANS</h3>
          <p className="text-gray-500 text-center text-sm mb-8">Continuous protection for your AI agents</p>
          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionTiers.map((tier, index) => (
              <div
                key={index}
                className={`border rounded-2xl p-6 transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-[#FF4444]/5 border-[#FF4444]/50 scale-105"
                    : "bg-[#12121a] border-[#333] hover:border-[#FF4444]/30"
                }`}
              >
                {tier.highlighted && (
                  <div className="text-[#FF4444] text-xs font-bold mb-2 text-center">MOST POPULAR</div>
                )}
                <h4 className="text-white font-bold text-lg mb-1">{tier.displayName || tier.name}</h4>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-[#FF4444]">${tier.price}</span>
                  <span className="text-gray-500 text-sm">{tier.period}</span>
                </div>
                <p className="text-gray-500 text-xs mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-4 h-4 text-[#FF4444] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/signup"
                  className="block text-center py-3 rounded-lg text-sm font-bold transition-colors bg-[#FF4444] text-black hover:bg-[#FF6666]"
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div id="services" className="mb-12 w-full max-w-5xl">
          <h2 className="text-white text-center text-xl font-bold mb-6 tracking-wider">SECURITY SERVICES</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <Link
                key={index}
                href="/services"
                className="border border-[#333] bg-[#12121a] p-5 hover:border-[#FF4444]/50 hover:bg-[#1a1a2e] transition-all duration-300 rounded-xl cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FF4444]/10">
                    <service.icon className="w-5 h-5 text-[#FF4444]" />
                  </div>
                  <h3 className="text-white font-bold text-sm">{service.title}</h3>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[#FF4444] text-lg font-bold">{service.price}</div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    {service.time}
                  </div>
                </div>
                <p className="text-gray-500 text-xs">{service.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#FF4444] hover:text-[#FF6666] font-bold text-sm transition-colors"
            >
              VIEW ALL SERVICES →
            </Link>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-12 p-6 bg-[#12121a] border border-[#333] rounded-2xl max-w-2xl w-full text-center">
          <div className="text-gray-400 text-xs mb-3 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" /> PAY WITH USDC ON BASE
          </div>
          <div className="text-white font-bold text-sm mb-4">
            Send payment to:
          </div>
          <code className="text-[#FF4444] text-xs break-all block bg-[#0a0a0f] p-4 rounded-lg border border-[#333] font-mono text-sm">
            0x687716fd518a5B257cE13455Ffd9967db309Ac1B
          </code>
        </div>

        {/* Security Toolkit */}
        <div className="mb-12 w-full max-w-5xl">
          <h3 className="text-white text-center text-xl font-bold mb-6 tracking-wider">OUR TOOLKIT</h3>
          <p className="text-gray-500 text-center text-sm mb-8">12 specialized security tools for comprehensive agent protection</p>
          <div className="grid md:grid-cols-3 gap-4">
            {toolkit.map((tool, index) => (
              <div
                key={index}
                className="border border-[#333] bg-[#12121a] p-5 rounded-xl hover:border-[#FF4444]/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FF4444]/10">
                    <tool.icon className="w-5 h-5 text-[#FF4444]" />
                  </div>
                  <h3 className="text-white font-bold text-sm">{tool.title}</h3>
                </div>
                <p className="text-gray-500 text-xs">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-12 w-full max-w-4xl">
          <h3 className="text-white text-center text-sm font-bold mb-6 tracking-wider">TRUSTED & VERIFIED</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-[#12121a] border border-[#333] rounded-xl hover:border-[#FF4444]/30 transition-all text-center"
              >
                <badge.icon className="w-6 h-6 text-[#FF4444] mb-2" />
                <div className="text-white font-bold text-xs">{badge.label}</div>
                <div className="text-gray-500 text-xs mt-1">{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12 w-full max-w-3xl">
          <h3 className="text-white text-center text-xl font-bold mb-6 tracking-wider">FAQ</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#333] bg-[#12121a] p-5 rounded-xl hover:border-[#FF4444]/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="text-[#FF4444] font-bold text-sm mt-0.5">Q.</div>
                  <div>
                    <div className="text-white font-bold text-sm mb-2">{faq.question}</div>
                    <div className="text-gray-500 text-xs">{faq.answer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center pb-8">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            🛡️ ClawShield © 2026 — Security-first AI agent auditing
          </p>
          <p className="text-gray-700 text-xs mt-2 flex items-center justify-center gap-2">
            Powered by RyanClaw | ERC-8004 Agent ID: 2079
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-12 w-full max-w-4xl">
          <h3 className="text-white text-center text-xl font-bold mb-6 tracking-wider">HOW IT WORKS</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF4444]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF4444] font-bold text-lg">1</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-2">Choose Tier</h4>
              <p className="text-gray-500 text-xs">Select your protection level</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF4444]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF4444] font-bold text-lg">2</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-2">Send USDC</h4>
              <p className="text-gray-500 text-xs">Pay on Base network</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF4444]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF4444] font-bold text-lg">3</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-2">Auto-Provision</h4>
              <p className="text-gray-500 text-xs">Instant activation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF4444]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF4444] font-bold text-lg">4</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-2">Stay Protected</h4>
              <p className="text-gray-500 text-xs">24/7 security monitoring</p>
            </div>
          </div>
        </div>

        {/* Automated Operations */}
        <div className="mb-12 p-6 bg-gradient-to-r from-[#1a1a2e] to-[#12121a] border border-[#333] rounded-2xl max-w-4xl w-full">
          <h3 className="text-[#FF4444] text-center text-lg font-bold mb-4 tracking-wider">🤖 FULLY AUTOMATED OPERATIONS</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">🔍</div>
              <h4 className="text-white font-bold text-sm">Payment Detection</h4>
              <p className="text-gray-500 text-xs">Alchemy API monitors USDC payments in real-time</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📄</div>
              <h4 className="text-white font-bold text-sm">Auto Receipts</h4>
              <p className="text-gray-500 text-xs">Instant confirmation via Moltbook/Telegram</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🛡️</div>
              <h4 className="text-white font-bold text-sm">Instant Provision</h4>
              <p className="text-gray-500 text-xs">Service activation immediately upon payment</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#333]">
            <p className="text-gray-400 text-xs text-center">
              <span className="text-[#FF4444]">✓</span> Compliance Logging | 
              <span className="text-[#FF4444]">✓</span> Audit Trail | 
              <span className="text-[#FF4444]">✓</span> Zero-Trust Architecture
            </p>
          </div>
        </div>

        {/* Quick Signup CTA */}
        <div className="mb-12 p-6 bg-[#12121a] border border-[#FF4444]/30 rounded-2xl max-w-2xl w-full text-center">
          <h3 className="text-white font-bold text-lg mb-2">🚀 READY TO GET PROTECTED?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Send USDC to our wallet and get instant access. No forms, no waiting.
          </p>
          <div className="bg-[#0a0a0f] p-4 rounded-lg border border-[#333]">
            <code className="text-[#FF4444] text-sm break-all font-mono">
              0x687716fd518a5B257cE13455Ffd9967db309Ac1B
            </code>
          </div>
          <p className="text-gray-500 text-xs mt-3">
            Network: Base | Token: USDC | Amounts: 10 / 25 / 50 USDC
          </p>
        </div>

      </main>
    </div>
  );
}
