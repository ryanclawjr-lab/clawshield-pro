"use client";

import { useState, useCallback } from "react";

const API_BASE = "/.netlify/functions";

export function usePaymentVerification() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [tier, setTier] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [error, setError] = useState("");

  const verify = useCallback(async (walletAddress: string) => {
    if (!walletAddress || !walletAddress.startsWith("0x")) {
      setError("Please enter a valid wallet address");
      return { verified: false, error: "Invalid wallet" };
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/verify-payment?wallet=${encodeURIComponent(walletAddress)}`
      );

      const data = await response.json();

      if (data.verified) {
        setVerified(true);
        setTier(data.tier);
        setServices(data.services || []);
        
        // Save session
        localStorage.setItem("clawshield_tier", data.tier);
        localStorage.setItem("clawshield_wallet", walletAddress);
        
        return { verified: true, tier: data.tier };
      } else {
        setVerified(false);
        setTier("");
        setServices([]);
        setError(data.error || "Payment not found");
        
        return { verified: false, error: data.error };
      }
    } catch (err) {
      setError("Verification failed - please try again");
      return { verified: false, error: "Network error" };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setVerified(false);
    setTier("");
    setServices([]);
    setError("");
    localStorage.removeItem("clawshield_tier");
    localStorage.removeItem("clawshield_wallet");
  }, []);

  const getServicesForTier = (tierName: string): string[] => {
    const servicesMap: Record<string, string[]> = {
      Watchtower: [
        "Weekly Security Scan",
        "Threat Intelligence Feed", 
        "Email Alerts",
        "Monthly Security Report",
        "Dashboard Access",
      ],
      Protect: [
        "Daily Security Scan",
        "Real-time Threat Monitoring",
        "Priority Alerts (Telegram)",
        "Live Dashboard with Metrics",
        "Weekly Security Reports",
        "Incident Response Support",
        "5 Skill Verification Credits/mo",
      ],
      Sentinel: [
        "Continuous Monitoring",
        "Real-time Anomaly Detection",
        "Priority Telegram Channel",
        "Unlimited Skill Verification",
        "Compliance Documentation",
        "Priority Support",
      ],
    };
    return servicesMap[tierName] || [];
  };

  return {
    verify,
    loading,
    verified,
    tier,
    services: verified ? services : [],
    error,
    logout,
    getServicesForTier,
  };
}
