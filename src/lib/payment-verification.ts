"use client";

import { useState } from "react";

// Simulated verification for static export
// In production, you'd use:
// 1. Netlify Functions (+)
// 2. Third-party API (coinbase commerce, etc)
// 3. Smart contract events

const DEMO_WALLETS: Record<string, { tier: string; amount: number }> = {
  "0x1234567890abcdef1234567890abcdef12345678": { tier: "Sentinel", amount: 30 },
  "0xdeadbeef1234567890abcdef1234567890abcdef": { tier: "Protect", amount: 15 },
  "0xabcdef1234567890abcdef1234567890abcdef12": { tier: "Watchtower", amount: 10 },
};

export function usePaymentVerification() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [tier, setTier] = useState("");
  const [services, setServices] = useState<string[]>([]);

  const verify = async (walletAddress: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check demo wallets
    const result = DEMO_WALLETS[walletAddress.toLowerCase()];
    
    if (result) {
      setVerified(true);
      setTier(result.tier);
      setServices(getServicesForTier(result.tier));
      localStorage.setItem("clawshield_tier", result.tier);
      localStorage.setItem("clawshield_wallet", walletAddress);
    } else {
      // For real wallets, in production this would call an API
      // For now, show instructions
      setVerified(false);
    }
    
    setLoading(false);
    return { verified: result ? true : false, tier: result?.tier || null };
  };

  const getServicesForTier = (tier: string): string[] => {
    const services: Record<string, string[]> = {
      Watchtower: ["Weekly Security Scan", "Threat Intelligence Feed", "Monthly Security Report", "Email Alerts"],
      Protect: ["Daily Security Scan", "Real-time Anomaly Detection", "Input Sanitization", "Weekly Reports", "Skill Verification (5/mo)", "Telegram Priority Channel"],
      Sentinel: ["Continuous Monitoring", "Docker Sandbox", "Compliance Documentation", "Unlimited Verification", "Priority Support"],
    };
    return services[tier] || [];
  };

  return { verify, loading, verified, tier, services };
}
