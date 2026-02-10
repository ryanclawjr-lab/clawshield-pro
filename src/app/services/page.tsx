import Link from "next/link";
import { Shield, Search, Code2, AlertTriangle, FileCheck, Fingerprint, Eye, Key, CheckCircle, Zap, FileText, ArrowRight, Info, CreditCard, Check } from "lucide-react";

export default function Services() {
  const services = [
    {
      slug: "skill-scan",
      title: "Free Skill Scan",
      price: 0,
      priceLabel: "FREE",
      tagline: "Instant security analysis for AI agents",
      description: "Get an instant security scan of your AI agent or skill. We'll check for malware, obfuscation patterns, and potential exfiltration vectors.",
      includes: [
        "Malware detection",
        "Obfuscation scanning",
        "Exfiltration pattern detection",
        "Credential exposure check",
        "Instant results",
      ],
      howItWorks: [
        "Enter your agent/skill GitHub URL",
        "We run our 12-layer scanner",
        "Get instant results + recommendations",
      ],
      icon: Search,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      slug: "security-audit",
      title: "Security Audit",
      price: 0.5,
      priceLabel: "2 USDC",
      tagline: "Comprehensive security assessment",
      description: "Full security audit with 18+ automated checks You get detailed evidence plus manual review., severity ratings, and actionable remediation steps.",
      includes: [
        "18+ automated security checks",
        "Manual code review",
        "Detailed evidence & findings",
        "Severity ratings (Critical/High/Medium/Low)",
        "Remediation recommendations",
        "Priority fix list",
      ],
      howItWorks: [
        "Send us your repo URL or files",
        "We run automated + manual analysis",
        "Receive detailed audit report within 24h",
      ],
      icon: Shield,
      color: "text-[#FF4444]",
      bgColor: "bg-[#FF4444]/10",
    },
    {
      slug: "agent-verification",
      title: "Agent Verification (ERC-8004)",
      price: 1.5,
      priceLabel: "1.5 USDC",
      tagline: "On-chain identity for AI agents",
      description: "Register your agent on-chain with ERC-8004. Get verified identity, trust scoring, and reputation that travels with your agent across the ecosystem.",
      includes: [
        "ERC-8004 identity registration",
        "On-chain trust score",
        "Verified badge for your agent",
        "Cross-platform reputation",
        "Identity documentation",
      ],
      howItWorks: [
        "Submit your agent details",
        "We verify and register on-chain",
        "Receive your ERC-8004 certificate",
      ],
      icon: Fingerprint,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      slug: "code-review",
      title: "Code Review",
      price: 0.5,
      priceLabel: "1 USDC",
      tagline: "Python, JS, TypeScript security analysis",
      description: "Deep security analysis of your codebase. We find vulnerabilities, insecure patterns, and security anti-patterns in your code.",
      includes: [
        "Vulnerability detection",
        "Insecure pattern identification",
        "Security best practices review",
        "CodeQL-style analysis",
        "Remediation suggestions",
      ],
      howItWorks: [
        "Share your codebase",
        "We analyze security posture",
        "Get detailed findings report",
      ],
      icon: Code2,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      slug: "prompt-injection-test",
      title: "Prompt Injection Test",
      price: 0.5,
      priceLabel: "1 USDC",
      tagline: "Shield from jailbreaks & prompt attacks",
      description: "Test your agent's resistance to prompt injection attacks. We use 25+ jailbreak techniques to find weaknesses in your defenses.",
      includes: [
        "25+ jailbreak techniques",
        "Context manipulation tests",
        "Role-playing attack detection",
        "Defense effectiveness report",
        "Hardening recommendations",
      ],
      howItWorks: [
        "Provide access to your agent",
        "We run attack simulations",
        "Receive vulnerability report",
      ],
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      slug: "skillmd-verification",
      title: "Skill.md Verification",
      price: 0.5,
      priceLabel: "1 USDC",
      tagline: "Supply chain security for skill manifests",
      description: "Verify that skill.md files are safe. Check for malicious binaries, credential theft code, and supply chain attacks before deployment.",
      includes: [
        "Binary analysis of skill.md",
        "Credential theft detection",
        "Supply chain vulnerability scan",
        "Cryptographic signature verification",
        "Safety certificate",
      ],
      howItWorks: [
        "Submit skill.md file",
        "We analyze for threats",
        "Get safety verification",
      ],
      icon: Shield,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
    },
    {
      slug: "insider-threat",
      title: "Insider Threat Assessment",
      price: 0.5,
      priceLabel: "2 USDC",
      tagline: "Access patterns & privilege escalation audit",
      description: "Audit your agent's access patterns. Find privilege escalation risks, unauthorized access vectors, and insider threat vulnerabilities.",
      includes: [
        "Access pattern analysis",
        "Privilege escalation testing",
        "Authorization audit",
        "Data access review",
        "Risk assessment",
      ],
      howItWorks: [
        "Submit agent architecture",
        "We analyze access controls",
        "Get comprehensive report",
      ],
      icon: Eye,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      slug: "capability-gated",
      title: "Capability-Gated Architecture",
      price: 1.5,
      priceLabel: "1.5 USDC",
      tagline: "Cryptographic boundaries & least-privilege design",
      description: "Design and audit a capability-gated architecture for your agent. Implement cryptographic boundaries and least-privilege principles.",
      includes: [
        "Architecture design review",
        "Capability token implementation",
        "Least-privilege audit",
        "Boundary verification",
        "Implementation guide",
      ],
      howItWorks: [
        "Submit current architecture",
        "We design gated approach",
        "Receive implementation plan",
      ],
      icon: Key,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
    },
    {
      slug: "docker-sandbox",
      title: "Docker Sandbox Setup",
      price: -1,
      priceLabel: "Varies",
      tagline: "Isolated execution environment",
      description: "Set up a secure Docker sandbox for running untrusted code. Complete isolation with deny-by-default network and filesystem restrictions.",
      includes: [
        "Docker configuration",
        "Network isolation setup",
        "Filesystem sandboxing",
        "Security hardening",
        "Usage documentation",
      ],
      howItWorks: [
        "Discuss requirements",
        "We configure your sandbox",
        "Deploy and test together",
      ],
      icon: Zap,
      color: "text-indigo-400",
      bgColor: "bg-indigo-400/10",
      requiresConsultation: true,
    },
    {
      slug: "compliance",
      title: "Compliance Documentation",
      price: -1,
      priceLabel: "Varies",
      tagline: "SOC2 readiness & liability protection",
      description: "Get compliance-ready documentation for your AI agent. SOC2-aligned policies, liability protection docs, and audit trail setup.",
      includes: [
        "Security policies documentation",
        "Audit trail implementation",
        "SOC2 gap analysis",
        "Liability protection docs",
        "Compliance certificate guide",
      ],
      howItWorks: [
        "Discuss compliance needs",
        "We assess gaps",
        "Create documentation package",
      ],
      icon: FileText,
      color: "text-gray-400",
      bgColor: "bg-gray-400/10",
      requiresConsultation: true,
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
        <div className="mb-12 text-center max-w-3xl">
          <Shield className="w-16 h-16 text-[#FF4444] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Security Services
          </h1>
          <p className="text-gray-400 text-lg">
            Professional security audits for AI agents. Choose the service that fits your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="w-full max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="border border-[#333] bg-[#12121a] rounded-2xl overflow-hidden hover:border-[#FF4444]/30 transition-all"
              >
                {/* Service Header */}
                <div className="p-6 border-b border-[#333]">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <service.icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{service.title}</h3>
                      <p className="text-gray-500 text-xs mt-1">{service.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6 pb-4">
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  
                  {/* What's Included */}
                  <div className="mb-4">
                    <h4 className="text-white font-bold text-xs mb-2">INCLUDES:</h4>
                    <ul className="space-y-1">
                      {service.includes.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <Check className="w-3 h-3 text-[#FF4444] flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                      {service.includes.length > 4 && (
                        <li className="text-xs text-gray-500 pl-5">
                          +{service.includes.length - 4} more items
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* How It Works */}
                  <div className="mb-4">
                    <h4 className="text-white font-bold text-xs mb-2">HOW IT WORKS:</h4>
                    <ol className="space-y-1">
                      {service.howItWorks.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-[#FF4444] font-bold flex-shrink-0">{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#333]">
                    <div>
                      <span className={`text-2xl font-bold ${service.price === 0 ? 'text-green-400' : 'text-[#FF4444]'}`}>
                        {service.priceLabel}
                      </span>
                    </div>
                    <Link
                      href={service.slug === "skill-scan" ? "/scan" : service.requiresConsultation ? "mailto:hello@clawshield.pro" : `/checkout?service=${service.slug}`}
                      className="bg-[#FF4444] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#FF6666] transition-colors"
                    >
                      {service.price === 0 ? "GET SCAN" : service.requiresConsultation ? "CONTACT" : "GET STARTED"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center pb-8">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            🛡️ ClawShield © 2026 — Security-first AI agent auditing
          </p>
        </div>

      </main>
    </div>
  );
}

function ArrowLeft(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}