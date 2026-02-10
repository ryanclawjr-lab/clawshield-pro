const Alchemy = require("alchemy-sdk");
const fs = require("fs");
const path = require("path");

// Configure Alchemy
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY || "FaapY_txMQJx08IHM9VLj",
  network: Alchemy.networks.BASE_MAINNET,
};

const alchemy = new Alchemy(settings);

// Payment wallet
const PAYMENT_WALLET = "0x687716fd518a5B257cE13455Ffd9967db309Ac1B";

// Tier thresholds (in USDC)
const TIERS = {
  Sentinel: { amount: 25, services: ["Continuous Monitoring", "Real-time Anomaly Detection", "Priority Telegram Channel", "Unlimited Verification", "Compliance Documentation", "Priority Support"] },
  Protect: { amount: 12.5, services: ["Daily Security Scan", "Real-time Threat Monitoring", "Priority Alerts", "Weekly Reports", "Skill Verification (5/mo)", "Telegram Support"] },
  Watchtower: { amount: 5, services: ["Weekly Security Scan", "Threat Intelligence Feed", "Email Alerts", "Monthly Report"] },
};

// Database file path
const DB_PATH = path.join(__dirname, "..", "data", "customers.json");

// Initialize database
function initDB() {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ customers: {}, payments: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Get customer's tier based on total payments
function getCustomerTier(walletAddress) {
  const db = initDB();
  const customer = db.customers[walletAddress.toLowerCase()];
  
  if (!customer) return null;
  
  const totalPaid = customer.totalPaid || 0;
  
  if (totalPaid >= 25) return "Sentinel";
  if (totalPaid >= 12.5) return "Protect";
  if (totalPaid >= 5) return "Watchtower";
  return null;
}

// Check for new payments and update database
async function checkForPayments() {
  try {
    console.log("🔍 Checking for payments...");
    
    // Get recent transfers to payment wallet
    const transfers = await alchemy.core.getAssetTransfers({
      fromAddress: "ANY",
      toAddress: PAYMENT_WALLET,
      category: ["external", "internal"],
      withMetadata: true,
      blockRange: 1000, // Last ~1000 blocks
    });

    const db = initDB();
    let newPayments = 0;

    for (const transfer of transfers.transfers) {
      // Skip if not USDC (asset contract)
      if (transfer.erc721TokenId || !transfer.asset) continue;
      
      // Check if already recorded
      const txHash = transfer.hash;
      const existing = db.payments.find(p => p.txHash === txHash);
      
      if (existing) continue;

      // Record new payment
      const payment = {
        txHash,
        from: transfer.fromAddress,
        value: parseFloat(transfer.value),
        asset: transfer.asset,
        timestamp: transfer.metadata.blockTimestamp,
        block: transfer.blockNum,
      };

      db.payments.push(payment);

      // Update customer record
      const customerWallet = payment.from.toLowerCase();
      if (!db.customers[customerWallet]) {
        db.customers[customerWallet] = {
          wallet: customerWallet,
          firstPayment: payment.timestamp,
          lastPayment: payment.timestamp,
          totalPaid: 0,
          payments: [],
          tier: null,
          activated: false,
        };
      }

      const customer = db.customers[customerWallet];
      customer.payments.push({
        txHash: payment.txHash,
        value: payment.value,
        timestamp: payment.timestamp,
        asset: payment.asset,
      });
      customer.lastPayment = payment.timestamp;
      customer.totalPaid += payment.value;

      // Update tier
      customer.tier = getCustomerTier(customerWallet);
      if (customer.tier) {
        customer.activated = true;
      }

      newPayments++;
      console.log(`💰 New payment: ${payment.value} ${payment.asset} from ${payment.from}`);
    }

    saveDB(db);

    if (newPayments > 0) {
      console.log(`✅ Found ${newPayments} new payments`);
    } else {
      console.log("✅ No new payments");
    }

    return { newPayments, totalPayments: db.payments.length };
  } catch (error) {
    console.error("❌ Error checking payments:", error.message);
    return { error: error.message };
  }
}

// Get customer info
function getCustomerInfo(walletAddress) {
  const db = initDB();
  const customer = db.customers[walletAddress.toLowerCase()];
  
  if (!customer) {
    return { found: false };
  }

  const tierInfo = customer.tier ? TIERS[customer.tier] : null;

  return {
    found: true,
    wallet: customer.wallet,
    tier: customer.tier,
    activated: customer.activated,
    totalPaid: customer.totalPaid,
    paymentCount: customer.payments.length,
    firstPayment: customer.firstPayment,
    lastPayment: customer.lastPayment,
    services: tierInfo?.services || [],
  };
}

module.exports = {
  checkForPayments,
  getCustomerInfo,
  PAYMENT_WALLET,
  TIERS,
};
