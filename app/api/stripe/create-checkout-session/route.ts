import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  console.log("🔍 [CHECKOUT] Starting checkout session creation...");

  try {
    const { userId, userEmail, userName } = await req.json();
    console.log("🔍 [CHECKOUT] Received data:", {
      userId,
      userEmail,
      userName,
    });

    if (!userId) {
      console.log("❌ [CHECKOUT] No userId provided");
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const priceId = process.env.STRIPE_STARTER_PRICE_ID;
    console.log("🔍 [CHECKOUT] Price ID:", priceId);

    if (!priceId) {
      console.log("❌ [CHECKOUT] No price ID configured");
      return NextResponse.json(
        { error: "Stripe price ID not configured" },
        { status: 500 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    console.log("🔍 [CHECKOUT] App URL:", appUrl);

    console.log("🔍 [CHECKOUT] Creating Stripe session...");

    // Opção 1: Criar customer primeiro com o nome correto
    let customerId = undefined;
    if (userEmail && userName) {
      console.log("🔍 [CHECKOUT] Creating customer with name:", userName);
      const customer = await stripe.customers.create({
        email: userEmail,
        name: userName,
        metadata: {
          userId: userId,
        },
      });
      customerId = customer.id;
      console.log("✅ [CHECKOUT] Customer created:", customerId);
    }

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
        userName: userName || "N/A",
      },
      success_url: `${appUrl}/create-store?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/subscription?canceled=true`,
      ...(customerId
        ? { customer: customerId }
        : {
            customer_email: userEmail,
            customer_creation: "always",
          }),
      billing_address_collection: "auto",
    });

    console.log("✅ [CHECKOUT] Session created successfully:", session.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("❌ [CHECKOUT] Error creating checkout session:", error);

    // Log mais detalhado do erro
    if (error instanceof Error) {
      console.error("❌ [CHECKOUT] Error message:", error.message);
      console.error("❌ [CHECKOUT] Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
