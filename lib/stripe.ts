import Stripe from "stripe";

console.log("🔍 [STRIPE] Initializing Stripe...");
console.log("🔍 [STRIPE] Secret key exists:", !!process.env.STRIPE_SECRET_KEY);
console.log(
  "🔍 [STRIPE] Secret key starts with:",
  process.env.STRIPE_SECRET_KEY?.substring(0, 7)
);

export const stripe = new Stripe(
  "sk_test_51QY5lG2M4f5OsxL2VAutqGRT3UkBS44GsebdHUofEfOxlo1Sf7os5rUdElX34Lyvc2cJrkwWQF0iY2MtBGLNLxPh00iJUGgVhx" as string
);

console.log("✅ [STRIPE] Stripe initialized successfully");
