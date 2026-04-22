"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { LogOut, Package, User } from "lucide-react";

interface Order {
  id: string;
  status: string;
  paymentMethod: string;
  total: number;
  createdAt: Date | string;
  items: { id: string; quantity: number; product: { name: string; images: string[] } }[];
}

export function AccountClient({ user, orders }: { user: any; orders: Order[] }) {
  const statusColors: Record<string, string> = {
    confirmed: "text-white",
    shipped: "text-white",
    delivered: "text-[#888888]",
    pending: "text-[#888888]",
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-[#888888] text-xs tracking-[0.3em] uppercase mb-2">MY ACCOUNT</p>
            <h1
              className="text-white tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.9 }}
            >
              {user.name || "Athlete"}
            </h1>
            <p className="text-[#888888] text-sm mt-2">{user.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-[#888888] hover:text-white text-xs tracking-[0.2em] uppercase transition-colors border border-[#2e2e2e] hover:border-white px-4 py-2"
          >
            <LogOut size={14} />
            SIGN OUT
          </button>
        </motion.div>

        {/* Orders */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Package size={18} className="text-[#888888]" />
            <h2
              className="text-white tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem" }}
            >
              MY ORDERS ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-12 text-center">
              <Package size={48} className="text-[#2e2e2e] mx-auto mb-4" />
              <p className="text-[#888888] text-sm mb-6">You haven't placed any orders yet.</p>
              <Link
                href="/catalog"
                className="inline-block bg-white text-[#0a0a0a] px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors"
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-white text-sm font-medium font-mono">{order.id.toUpperCase().slice(0, 12)}...</p>
                      <p className="text-[#888888] text-xs mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatPrice(order.total)}</p>
                      <p className={`text-xs mt-1 capitalize ${statusColors[order.status] || "text-[#888888]"}`}>
                        {order.status} · {order.paymentMethod === "cod" ? "COD" : "Online"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    {order.items.slice(0, 4).map((item) => (
                      <div key={item.id} className="relative w-12 h-14 bg-[#0a0a0a] rounded-sm overflow-hidden">
                        {item.product.images[0] && (
                          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                        )}
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="w-12 h-14 bg-[#0a0a0a] rounded-sm flex items-center justify-center text-[#888888] text-xs">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/order/${order.id}`}
                    className="text-[#888888] hover:text-white text-xs tracking-[0.2em] uppercase transition-colors underline underline-offset-4"
                  >
                    VIEW ORDER DETAILS
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
