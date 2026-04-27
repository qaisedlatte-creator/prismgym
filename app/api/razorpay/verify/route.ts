import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendOrderConfirmationEmail, sendOwnerOrderAlert } from "@/lib/email";

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
      paymentMethod = "online",
    } = await req.json();

    // Verify Razorpay signature
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

    const isCod = paymentMethod === "cod";

    const order = await prisma.order.create({
      data: {
        userId,
        guestEmail: userId ? undefined : (address.email || undefined),
        guestName: userId ? undefined : address.name,
        guestPhone: userId ? undefined : address.phone,
        subtotal: Number(subtotal),
        shippingFee: Number(shippingFee),
        codFee: isCod ? Number(codFee ?? 100) : 0,
        total: Number(total),
        paymentMethod,
        paymentStatus: isCod ? "cod_advance_paid" : "paid",
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

    // Send emails non-blocking
    if (address.email) sendOrderConfirmationEmail(address.email, order).catch(console.error);
    sendOwnerOrderAlert(order, items, address).catch(console.error);

    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    console.error("Razorpay verify error:", err);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
