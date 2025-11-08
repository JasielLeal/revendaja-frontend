import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  console.log("Webhook received:", {
    hasSignature: !!signature,
    bodyLength: body.length,
    webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
  });

  if (!signature) {
    console.error("No signature found in headers");
    return NextResponse.json({ error: "No signature found" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Webhook signature verified successfully");
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;

        if (userId) {
          // TODO: Atualizar o plano do usuário no banco de dados
          // await updateUserPlan(userId, 'starter');
          console.log(`Payment completed for user ${userId}`);
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // TODO: Associar subscription ao usuário
        console.log(`Subscription created for customer ${customerId}`);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // TODO: Atualizar status da subscription
        console.log(`Subscription updated for customer ${customerId}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // TODO: Cancelar subscription do usuário
        console.log(`Subscription canceled for customer ${customerId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
