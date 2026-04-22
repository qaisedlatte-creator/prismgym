import { NextRequest, NextResponse } from "next/server";
import { getRazorpay, formatAmountForRazorpay } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: formatAmountForRazorpay(amount),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err: any) {
    console.error("Razorpay create order error:", err);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
