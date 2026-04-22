import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

async function getOrder(id: string) {
  try {
    return await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
  } catch {
    return null;
  }
}

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem" }}>
          ORDER NOT FOUND
        </h1>
        <Link href="/" className="text-[#888888] underline underline-offset-4 hover:text-white">Go Home</Link>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    confirmed: "text-white bg-white/10 border-white/30",
    shipped: "text-white bg-white/10 border-white/30",
    delivered: "text-white bg-white/10 border-white/30",
    pending: "text-[#888888] bg-[#888888]/10 border-[#888888]/30",
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border border-white rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-white" />
            </div>
          </div>
          <h1
            className="text-white tracking-widest mb-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.9 }}
          >
            ORDER CONFIRMED
          </h1>
          <p className="text-[#888888] text-sm mb-2">
            Thank you, {order.addressName}! Your order has been placed.
          </p>
          <p className="text-[#888888] text-xs tracking-widest">
            ORDER ID: <span className="text-white font-mono">{order.id.toUpperCase()}</span>
          </p>
        </div>

        {/* Order details */}
        <div className="space-y-6">
          {/* Items */}
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-6">
            <h2
              className="text-white tracking-widest mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem" }}
            >
              YOUR ITEMS
            </h2>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-20 bg-[#0a0a0a] rounded-sm overflow-hidden flex-shrink-0">
                    {item.product.images[0] && (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{item.product.name}</p>
                    <p className="text-[#888888] text-xs mt-1">{item.size} · {item.color} · ×{item.quantity}</p>
                  </div>
                  <span className="text-white text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Delivery address */}
            <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-6">
              <h3 className="text-white text-xs tracking-[0.2em] uppercase mb-4">Delivering To</h3>
              <p className="text-white text-sm font-medium">{order.addressName}</p>
              <p className="text-[#888888] text-sm">{order.addressLine1}</p>
              {order.addressLine2 && <p className="text-[#888888] text-sm">{order.addressLine2}</p>}
              <p className="text-[#888888] text-sm">{order.addressCity}, {order.addressState} — {order.addressPincode}</p>
              <p className="text-[#888888] text-sm mt-2">{order.addressPhone}</p>
            </div>

            {/* Payment summary */}
            <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-6">
              <h3 className="text-white text-xs tracking-[0.2em] uppercase mb-4">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Subtotal</span>
                  <span className="text-white">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Shipping</span>
                  <span className="text-white">{order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee)}</span>
                </div>
                {order.codFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888888]">COD Fee</span>
                    <span className="text-white">+{formatPrice(order.codFee)}</span>
                  </div>
                )}
                <div className="border-t border-[#2e2e2e] pt-2 flex justify-between font-medium">
                  <span className="text-white">Total</span>
                  <span className="text-white">{formatPrice(order.total)}</span>
                </div>
                <div className="pt-2">
                  <span className={`inline-block px-3 py-1 text-xs border rounded-full ${statusColors[order.status] || statusColors.pending}`}>
                    {order.paymentMethod === "cod" ? "Cash on Delivery" : "Paid Online"} · {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated delivery */}
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-6">
            <h3 className="text-white text-xs tracking-[0.2em] uppercase mb-2">Estimated Delivery</h3>
            <p className="text-white text-sm">5–7 Business Days</p>
            <p className="text-[#888888] text-xs mt-2">You'll receive an email with tracking information once your order ships.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/catalog"
            className="flex-1 border border-white text-white text-center py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
          <Link
            href="/account"
            className="flex-1 bg-white text-[#0a0a0a] text-center py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors"
          >
            MY ACCOUNT
          </Link>
        </div>
      </div>
    </div>
  );
}
