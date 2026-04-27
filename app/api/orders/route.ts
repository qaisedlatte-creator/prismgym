import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendOrderConfirmationEmail, sendOwnerOrderAlert } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { items, address, paymentMethod, subtotal, shippingFee, codFee, total, razorpayOrderId, razorpayPaymentId } = body;

    if (!items?.length || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
        guestName: userId ? undefined : address.name,
        guestPhone: userId ? undefined : address.phone,
        subtotal: Number(subtotal),
        shippingFee: Number(shippingFee),
        codFee: Number(codFee),
        total: Number(total),
        paymentMethod,
        paymentStatus: paymentMethod === "online" ? "paid" : "pending",
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

    if (address.email) sendOrderConfirmationEmail(address.email, order).catch(console.error);
    sendOwnerOrderAlert(order, items, address).catch(console.error);

    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        orders: {
          orderBy: { createdAt: "desc" },
          include: { items: { include: { product: true } } },
        },
      },
    });

    return NextResponse.json(user?.orders ?? []);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
