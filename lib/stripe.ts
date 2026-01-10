import Stripe from "stripe";

console.log("🔍 [STRIPE] Initializing Stripe...");
console.log("🔍 [STRIPE] Secret key exists:", !!process.env.STRIPE_SECRET_KEY);
console.log(
  "🔍 [STRIPE] Secret key starts with:",
  process.env.STRIPE_SECRET_KEY?.substring(0, 7)
);


export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-10-29.clover",
});

console.log("✅ [STRIPE] Stripe initialized successfully");
