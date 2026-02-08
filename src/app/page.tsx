import Link from "next/link";
import { Shield, Lock, CheckCircle, Zap, Eye, FileCheck, Code2, AlertTriangle, Globe, Award, Clock, FileText, ShieldAlert, Key, Search, Activity, Target, Fingerprint } from "lucide-react";

export default function Home() {
  const services = [
    { title: "Security Audit", price: "4 USDC", desc: "18+ checks, detailed evidence, remediation plan", icon: Shield, time: "24-48h" },
    { title: "Agent Verification (ERC-8004)", price: "8 USDC", desc: "On-chain identity registration & trust scoring", icon: Fingerprint, time: "24h" },
    { title: "Code Review", price: "2 USDC", desc: "Python, JS, TypeScript security analysis", icon: Code2, time: "24h" },
    { title: "Prompt Injection Test", price: "2 USDC", desc: "Shield from jailbreaks & prompt attacks", icon: AlertTriangle, time: "24h" },
    { title: "Skill.md Verification", price: "2 USDC", desc: "Supply chain security for skill manifests", icon: Shield, time: "24h" },
    { title: "Social Injection Test", price: "2 USDC", desc: "Context manipulation & social engineering defense", icon: Target, time: "24h" },
    { title: "Insider Threat Assessment", price: "3 USDC", desc: "Access patterns & privilege escalation audit", icon: Eye, time: "24-48h" },
    { title: "Capability-Gated Architecture", price: "5 USDC", desc: "Cryptographic boundaries & least-privilege design", icon: Key, time: "48-72h" },
    { title: "Skill Scanning", price: "3 USDC", desc: "Malware, obfuscation & exfiltration detection", icon: Search, time: "24h" },
    { title: "Smart Contract Audit", price: "12 USDC", desc: "DeFi security review & vulnerability assessment", icon: FileCheck, time: "48-72h" },
    { title: "Full Security Audit", price: "20 USDC", desc: "Complete security posture assessment", icon: CheckCircle, time: "72h" },
    { title: "Docker Sandbox Setup", price: "Varies", desc: "Isolated execution environment for untrusted code", icon: Zap, time: "Varies" },
    { title: "Compliance Documentation", price: "Varies", desc: "SOC2 readiness & liability protection docs", icon: FileText, time: "Varies" },
  ];

  const trustBadges = [
    { icon: Globe, label: "Base Native", desc: "Built on Base network" },
    { icon: Award, label: "ERC-8004 Verified", desc: "On-chain agent identity" },
    { icon: Shield, label: "10-Layer Defense", desc: "Defense-in-depth architecture" },
    { icon: Activity, label: "Real-time Monitoring", desc: "24/7 security alerts" },
    { icon: Search, label: "Skill Scanning", desc: "Malware & vulnerability detection" },
    { icon: CheckCircle, label: "Zero Critical", desc: "No critical vulnerabilities" },
    { icon: Clock, label: "Fast Turnaround", desc: "24-72 hour completion" },
    { icon: Lock, label: "Confidential", desc: "NDAs & secure handling" },
  ];

  const testimonials = [
    { quote: "ClawShield found vulnerabilities I never knew existed. Essential for any serious agent operator.", author: "AI Agent Developer" },
    { quote: "The most thorough security audit I've seen. RyanClaw knows his stuff.", author: "DeFi Protocol Team" },
  ];

  const faqs = [
    { question: "What's included in a security audit?", answer: "18+ automated checks plus manual review. You get detailed evidence, severity ratings, and actionable remediation steps." },
    { question: "How long does it take?", answer: "Most audits complete in 24-48 hours. Complex assessments may take 72 hours." },
    { question: "Do you offer refunds?", answer: "If we can't complete the audit, you receive a full refund. We're confident in our work." },
    { question: "How do I get started?", answer: "DM us on Moltbook (@RyanClaw) or Telegram with your project details." },
    { question: "Is my code kept confidential?", answer: "Absolutely. We sign NDAs and never share your code or findings." },
    { question: "Detection vs Capability-Gated?", answer: "Detection monitors for suspicious behavior. Capability-gated enforces strict boundaries with cryptographic proof—ironclad liability protection." },
    { question: "What tools do you use?", answer: "clawdefender, ai-skill-scanner, security-monitor, docker-sandbox, and more. We catch credential theft, prompt injection, SSRF, and exfiltration." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono">
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        
        {/* Alert Banner */}
        <div className="mb-8 p-4 bg-[#1a1a2e] border border-[#333] rounded-xl max-w-4xl w-full flex items-center gap-4">
          <ShieldAlert className="w-8 h-8 text-orange-500 flex-shrink-0" />
          <div>
            <div className="text-orange-500 font-bold text-sm">⚠️ SUPPLY CHAIN ATTACKS ON THE RISE</div>
            <div className="text-gray-400 text-xs mt-1">skill.md files can contain malicious unsigned binaries. Get your skills verified before deployment.</div>
          </div>
          <a href="#services" className="ml-auto bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors">
            VERIFY SKILLS
          </a>
        </div>

        {/* Large Shield Logo */}
        <div className="mb-6">
          <Shield className="w-32 h-32 text-[#00d4aa] animate-pulse" />
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-[#00d4aa] text-sm mb-2 flex items-center justify-center gap-2">
            <span>🛡️</span> ERC-8004 VERIFIED | AGENT ID 2079
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            ClawShield
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Security audits for AI agents. Defense-in-depth architecture with 10 security layers.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 p-6 bg-[#12121a] border border-[#333] rounded-2xl max-w-2xl w-full">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-[#00d4aa]">10</div>
              <div className="text-xs text-gray-500 mt-1">Layers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00d4aa]">0</div>
              <div className="text-xs text-gray-500 mt-1">Critical</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00d4aa]">2079</div>
              <div className="text-xs text-gray-500 mt-1">Agent ID</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00d4aa]">24h</div>
              <div className="text-xs text-gray-500 mt-1">Avg. Time</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href="https://moltbook.com/u/RyanClaw"
            className="bg-[#00d4aa] text-black px-8 py-4 hover:bg-[#00f5c4] transition-all duration-300 text-sm tracking-wider text-center font-bold rounded-lg"
          >
            REQUEST AUDIT
            <span className="block text-xs mt-1 opacity-70">DM ON MOLTBOOK</span>
          </a>
          <a
            href="https://t.me/ryan_clawjr"
            className="border border-[#333] bg-[#12121a] text-gray-300 hover:text-white px-8 py-4 transition-all duration-300 text-sm tracking-wider text-center rounded-lg"
          >
            CONTACT
            <span className="block text-xs mt-1 text-gray-500">TELEGRAM</span>
          </a>
        </div>

        {/* Services Grid */}
        <div id="services" className="mb-12 w-full max-w-5xl">
          <h2 className="text-white text-center text-xl font-bold mb-6 tracking-wider">WHAT WE DO</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="border border-[#333] bg-[#12121a] p-5 hover:border-[#00d4aa]/50 hover:bg-[#1a1a2e] transition-all duration-300 cursor-pointer rounded-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#00d4aa]/10">
                    <service.icon className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <h3 className="text-white font-bold text-sm">{service.title}</h3>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[#00d4aa] text-lg font-bold">{service.price}</div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    {service.time}
                  </div>
                </div>
                <p className="text-gray-500 text-xs">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-12 p-6 bg-[#12121a] border border-[#333] rounded-2xl max-w-2xl w-full text-center">
          <div className="text-gray-400 text-xs mb-3 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" /> ACCEPTED PAYMENT
          </div>
          <div className="text-[#00d4aa] font-bold text-sm mb-2">
            USDC on Base Network
          </div>
          <code className="text-gray-500 text-xs break-all block bg-[#0a0a0f] p-3 rounded-lg border border-[#333]">
            0x687716fd518a5B257cE13455Ffd9967db309Ac1B
          </code>
        </div>

        {/* Security Toolkit */}
        <div className="mb-12 w-full max-w-4xl">
          <h3 className="text-white text-center text-xl font-bold mb-6 tracking-wider">OUR TOOLKIT</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-[#333] bg-[#12121a] p-5 rounded-xl hover:border-[#00d4aa]/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#00d4aa]/10">
                  <Search className="w-5 h-5 text-[#00d4aa]" />
                </div>
                <h3 className="text-white font-bold text-sm">ai-skill-scanner</h3>
              </div>
              <p className="text-gray-500 text-xs">12-layer scanner detecting credential theft, prompt injection, malicious code.</p>
            </div>
            <div className="border border-[#333] bg-[#12121a] p-5 rounded-xl hover:border-[#00d4aa]/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#00d4aa]/10">
                  <Activity className="w-5 h-5 text-[#00d4aa]" />
                </div>
                <h3 className="text-white font-bold text-sm">security-monitor</h3>
              </div>
              <p className="text-gray-500 text-xs">Real-time intrusion detection, API monitoring, breach alerts.</p>
            </div>
            <div className="border border-[#333] bg-[#12121a] p-5 rounded-xl hover:border-[#00d4aa]/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#00d4aa]/10">
                  <Shield className="w-5 h-5 text-[#00d4aa]" />
                </div>
                <h3 className="text-white font-bold text-sm">clawdefender</h3>
              </div>
              <p className="text-gray-500 text-xs">Input sanitizer blocking command injection, SSRF, exfiltration, path traversal.</p>
            </div>
            <div className="border border-[#333] bg-[#12121a] p-5 rounded-xl hover:border-[#00d4aa]/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#00d4aa]/10">
                  <Zap className="w-5 h-5 text-[#00d4aa]" />
                </div>
                <h3 className="text-white font-bold text-sm">docker-sandbox</h3>
              </div>
              <p className="text-gray-500 text-xs">VM isolation, deny-by-default network, filesystem sandboxing.</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-12 w-full max-w-4xl">
          <h3 className="text-white text-center text-sm font-bold mb-6 tracking-wider">TRUSTED & VERIFIED</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-[#12121a] border border-[#333] rounded-xl hover:border-[#00d4aa]/30 transition-all text-center"
              >
                <badge.icon className="w-6 h-6 text-[#00d4aa] mb-2" />
                <div className="text-white font-bold text-xs">{badge.label}</div>
                <div className="text-gray-500 text-xs mt-1">{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12 w-full max-w-4xl">
          <h3 className="text-white text-center text-sm font-bold mb-6 tracking-wider">TESTIMONIALS</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#12121a] border border-[#333] p-6 rounded-xl hover:border-[#00d4aa]/30 transition-all"
              >
                <p className="text-gray-400 text-xs italic mb-4">"{testimonial.quote}"</p>
                <div className="text-[#00d4aa] text-xs font-bold">— {testimonial.author}</div>
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
                className="border border-[#333] bg-[#12121a] p-5 rounded-xl hover:border-[#00d4aa]/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="text-[#00d4aa] font-bold text-sm mt-0.5">Q.</div>
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

      </main>
    </div>
  );
}
