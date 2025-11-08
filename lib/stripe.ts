import Stripe from "stripe";

console.log("🔍 [STRIPE] Initializing Stripe...");
console.log("🔍 [STRIPE] Secret key exists:", !!process.env.STRIPE_SECRET_KEY);
console.log(
  "🔍 [STRIPE] Secret key starts with:",
  process.env.STRIPE_SECRET_KEY?.substring(0, 7)
);

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
});

console.log("✅ [STRIPE] Stripe initialized successfully");
