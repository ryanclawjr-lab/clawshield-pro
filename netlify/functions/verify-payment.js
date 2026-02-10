const { checkForPayments, getCustomerInfo, PAYMENT_WALLET, TIERS } = require("./payment-detector");

// Demo wallets for testing (bypass real verification)
const DEMO_WALLETS = {
  "0x1234567890abcdef1234567890abcdef12345678": {
    tier: "Sentinel",
    totalPaid: 30,
    activated: true,
  },
  "0xdeadbeef1234567890abcdef1234567890abcdef": {
    tier: "Protect",
    totalPaid: 15,
    activated: true,
  },
  "0xabcdef1234567890abcdef1234567890abcdef12": {
    tier: "Watchtower",
    totalPaid: 10,
    activated: true,
  },
};

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const method = event.httpMethod;
    const path = event.path;

    // POST: Trigger payment check (admin only in production)
    if (method === "POST" && path.endsWith("/check-payments")) {
      console.log("🔄 Triggering payment check...");
      const result = await checkForPayments();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    }

    // GET: Verify customer and get access
    if (method === "GET" && path.endsWith("/verify")) {
      const walletAddress = event.queryStringParameters?.wallet;
      
      if (!walletAddress || !walletAddress.startsWith("0x")) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Invalid wallet address" }),
        };
      }

      // Check demo wallets first (for testing)
      const demoWallet = DEMO_WALLETS[walletAddress.toLowerCase()];
      if (demoWallet) {
        const tierInfo = demoWallet.tier ? TIERS[demoWallet.tier] : null;
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            verified: true,
            tier: demoWallet.tier,
            services: tierInfo?.services || [],
            demo: true,
            message: "Demo mode - using test wallet",
          }),
        };
      }

      // Check real database
      const customer = getCustomerInfo(walletAddress);

      if (!customer.found) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            verified: false,
            error: "No payments found",
            paymentWallet: PAYMENT_WALLET,
            tiers: {
              Sentinel: { amount: 25, services: TIERS.Sentinel.services },
              Protect: { amount: 12.5, services: TIERS.Protect.services },
              Watchtower: { amount: 5, services: TIERS.Watchtower.services },
            },
          }),
        };
      }

      if (!customer.activated || !customer.tier) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            verified: false,
            error: "Payment amount below minimum tier threshold",
            totalPaid: customer.totalPaid,
            minimumAmount: 5,
          }),
        };
      }

      const tierInfo = TIERS[customer.tier];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          verified: true,
          tier: customer.tier,
          totalPaid: customer.totalPaid,
          services: tierInfo.services,
          paymentCount: customer.paymentCount,
          lastPayment: customer.lastPayment,
        }),
      };
    }

    // GET: Get payment info
    if (method === "GET" && path.endsWith("/info")) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          paymentWallet: PAYMENT_WALLET,
          network: "Base",
          token: "USDC",
          tiers: TIERS,
        }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" }),
    };
  } catch (error) {
    console.error("❌ Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
