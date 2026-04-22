import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      items,
      address,
      subtotal,
      shippingFee,
      codFee,
      total,
    } = await req.json();

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET ?? "")
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    let userId: string | undefined;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (user) userId = user.id;
    }

    const order = await prisma.order.create({
      data: {
        userId,
        guestEmail: userId ? undefined : address.email,
        subtotal: Number(subtotal),
        shippingFee: Number(shippingFee),
        codFee: 0,
        total: Number(total),
        paymentMethod: "online",
        paymentStatus: "paid",
        razorpayOrderId,
        razorpayPaymentId,
        status: "confirmed",
        addressName: address.name,
        addressLine1: address.line1,
        addressLine2: address.line2 || undefined,
        addressCity: address.city,
        addressState: address.state,
        addressPincode: address.pincode,
        addressPhone: address.phone,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    sendOrderConfirmationEmail(address.email, order).catch(console.error);

    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    console.error("Razorpay verify error:", err);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
