import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    console.log("🔍 [TEST] Testing Stripe configuration...");

    // Testar se consegue listar produtos
    const products = await stripe.products.list({ limit: 1 });
    console.log(
      "✅ [TEST] Stripe connection successful, products found:",
      products.data.length
    );

    // Verificar se o price ID existe
    const priceId = process.env.STRIPE_STARTER_PRICE_ID;
    if (priceId) {
      const price = await stripe.prices.retrieve(priceId);
      console.log(
        "✅ [TEST] Price found:",
        price.id,
        "- Amount:",
        price.unit_amount
      );

      return NextResponse.json({
        success: true,
        stripe_connected: true,
        price_id: priceId,
        price_amount: price.unit_amount,
        price_currency: price.currency,
        secret_key_prefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7),
        app_url: process.env.NEXT_PUBLIC_APP_URL,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "STRIPE_STARTER_PRICE_ID not configured",
      });
    }
  } catch (error) {
    console.error("❌ [TEST] Stripe test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: {
          secret_key_configured: !!process.env.STRIPE_SECRET_KEY,
          price_id_configured: !!process.env.STRIPE_STARTER_PRICE_ID,
          app_url_configured: !!process.env.NEXT_PUBLIC_APP_URL,
        },
      },
      { status: 500 }
    );
  }
}
