import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"

const stripeApiKey = process.env.STRIPE_SECRET_KEY
const defaultPriceId = process.env.STRIPE_DEFAULT_PRICE_ID

if (!stripeApiKey || !defaultPriceId) {
  throw new Error("Stripe environment variables are not configured")
}

const stripe = new Stripe(stripeApiKey as string, {})


type CheckoutRequestBody = {
  name?: string
  priceId?: string
}

export async function POST(req: NextRequest) {
  try {
    const { priceId }: CheckoutRequestBody = await req.json()

    const price = priceId || defaultPriceId

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: new URL("/payment/success", req.nextUrl.origin).toString(),
      cancel_url: new URL("/payment/cancel", req.nextUrl.origin).toString(),
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Unable to start checkout session" },
      { status: 500 },
    )
  }
}
