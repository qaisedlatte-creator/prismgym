"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateShipping, COD_FEE } from "@/lib/utils";
import { useToast } from "@/components/ui/toaster";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AddressForm {
  name: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

const empty: AddressForm = {
  name: "", phone: "", email: "",
  line1: "", line2: "", city: "", state: "", pincode: "",
};

function Field({
  label, value, onChange, type = "text", placeholder, optional = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; optional?: boolean;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#666",
          marginBottom: 6,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
        }}
      >
        {label}
        {optional && <span style={{ color: "#bbb", marginLeft: 4 }}>(optional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={type === "tel" ? "numeric" : type === "email" ? "email" : undefined}
        autoComplete={
          type === "tel" ? "tel" : type === "email" ? "email" : "on"
        }
        style={{
          width: "100%",
          background: "#f8f8f8",
          border: "1px solid #e0e0e0",
          color: "#000",
          fontSize: "1rem",
          padding: "13px 14px",
          outline: "none",
          fontFamily: "'DM Sans', sans-serif",
          WebkitAppearance: "none",
          borderRadius: 0,
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#000")}
        onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
      />
    </div>
  );
}

declare global { interface Window { Razorpay: any; } }

function OrderItems({ items }: { items: ReturnType<typeof useCartStore>["items"] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((item) => (
        <div
          key={`${item.productId}-${item.size}-${item.color}`}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            style={{
              position: "relative",
              width: 52,
              height: 62,
              background: "#e8e8e8",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
            <span
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                background: "#000",
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                borderRadius: "50%",
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.quantity}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: "#000",
                fontSize: "0.82rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {item.name}
            </p>
            <p style={{ color: "#888", fontSize: "0.7rem", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>
              {item.size} · {item.color}
            </p>
          </div>
          <span
            style={{
              color: "#000",
              fontSize: "0.82rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      ))}
    </div>
  );
}

function PriceSummary({
  subtotal, shipping, paymentMethod, total,
}: {
  subtotal: number; shipping: number; paymentMethod: "online" | "cod"; total: number;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid #e0e0e0",
        paddingTop: 14,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginTop: 14,
      }}
    >
      {[
        { label: "Subtotal", val: formatPrice(subtotal) },
        { label: "Shipping", val: shipping === 0 ? "FREE" : formatPrice(shipping) },
        ...(paymentMethod === "cod" ? [{ label: "COD Fee", val: `+${formatPrice(COD_FEE)}` }] : []),
      ].map(({ label, val }) => (
        <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#888", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
          <span style={{ color: "#000", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>{val}</span>
        </div>
      ))}
      <div
        style={{
          borderTop: "1px solid #e0e0e0",
          paddingTop: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#000",
            fontSize: "0.95rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
          }}
        >
          Total
        </span>
        <span
          style={{
            color: "#000",
            fontSize: "0.95rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
          }}
        >
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { toast } = useToast();

  const [address, setAddress] = useState<AddressForm>(empty);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [loading, setLoading] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const codFee = paymentMethod === "cod" ? COD_FEE : 0;
  const total = subtotal + shipping + codFee;

  const set = (field: keyof AddressForm) => (v: string) =>
    setAddress((a) => ({ ...a, [field]: v }));

  if (items.length === 0) {
    router.push("/catalog");
    return null;
  }

  const validate = () => {
    const required: [keyof AddressForm, string][] = [
      ["name", "full name"],
      ["phone", "phone number"],
      ["line1", "address"],
      ["city", "city"],
      ["state", "state"],
      ["pincode", "pincode"],
    ];
    for (const [field, label] of required) {
      if (!address[field].trim()) {
        toast({ title: `Please enter your ${label}`, variant: "error" });
        return false;
      }
    }
    if (!/^\d{10}$/.test(address.phone)) {
      toast({ title: "Enter a valid 10-digit phone number", variant: "error" });
      return false;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      toast({ title: "Enter a valid 6-digit pincode", variant: "error" });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (paymentMethod === "cod") {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items, address, paymentMethod: "cod",
            subtotal, shippingFee: shipping, codFee: COD_FEE, total,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Order failed");
        clearCart();
        router.push(`/order/${data.id}`);
      } else {
        const res = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total }),
        });
        const { orderId, keyId } = await res.json();
        if (!window.Razorpay) {
          await new Promise<void>((resolve) => {
            const s = document.createElement("script");
            s.src = "https://checkout.razorpay.com/v1/checkout.js";
            s.onload = () => resolve();
            document.body.appendChild(s);
          });
        }
        const rzp = new window.Razorpay({
          key: keyId,
          amount: total * 100,
          currency: "INR",
          name: "PRISM INDIA",
          description: `${items.length} item${items.length > 1 ? "s" : ""}`,
          image: "/logo-mark.png",
          order_id: orderId,
          prefill: {
            name: address.name,
            contact: address.phone,
            ...(address.email ? { email: address.email } : {}),
          },
          notes: {
            address: `${address.line1}${address.line2 ? ", " + address.line2 : ""}, ${address.city}, ${address.state} - ${address.pincode}`,
          },
          theme: { color: "#000000" },
          handler: async (response: any) => {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                items, address, subtotal,
                shippingFee: shipping, codFee: 0, total,
              }),
            });
            const data = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(data.error);
            clearCart();
            router.push(`/order/${data.id}`);
          },
          modal: { ondismiss: () => setLoading(false) },
        });
        rzp.open();
        return;
      }
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err.message, variant: "error" });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 90, paddingBottom: 80, background: "#fff" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>

        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
            lineHeight: 0.95,
            color: "#000",
            marginBottom: 28,
          }}
        >
          CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-start">

          {/* ── LEFT: form ───────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Mobile order summary (collapsible) */}
            <div className="block lg:hidden" style={{ border: "1px solid #e8e8e8" }}>
              <button
                onClick={() => setSummaryOpen((v) => !v)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 16px",
                  background: "#f8f8f8",
                  border: "none",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  {summaryOpen ? "Hide" : "Show"} order summary &nbsp;·&nbsp; {formatPrice(total)}
                </span>
                {summaryOpen ? <ChevronUp size={16} color="#666" /> : <ChevronDown size={16} color="#666" />}
              </button>
              {summaryOpen && (
                <div style={{ padding: 16 }}>
                  <OrderItems items={items} />
                  <PriceSummary
                    subtotal={subtotal}
                    shipping={shipping}
                    paymentMethod={paymentMethod}
                    total={total}
                  />
                </div>
              )}
            </div>

            {/* ── Delivery Details ─────────────────────────────────── */}
            <section>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.15rem",
                  color: "#000",
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                }}
              >
                DELIVERY DETAILS
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" value={address.name} onChange={set("name")} placeholder="Rahul Sharma" />
                  <Field label="Phone" value={address.phone} onChange={set("phone")} type="tel" placeholder="9876543210" />
                </div>
                <Field
                  label="Email"
                  value={address.email}
                  onChange={set("email")}
                  type="email"
                  placeholder="rahul@email.com"
                  optional
                />
                <Field
                  label="Address Line 1"
                  value={address.line1}
                  onChange={set("line1")}
                  placeholder="Flat / House No., Building, Street"
                />
                <Field
                  label="Address Line 2"
                  value={address.line2}
                  onChange={set("line2")}
                  placeholder="Area, Landmark"
                  optional
                />
                <div className="grid grid-cols-3 gap-3">
                  <Field label="City" value={address.city} onChange={set("city")} placeholder="Kochi" />
                  <Field label="State" value={address.state} onChange={set("state")} placeholder="Kerala" />
                  <Field label="Pincode" value={address.pincode} onChange={set("pincode")} placeholder="682001" />
                </div>
              </div>
            </section>

            {/* ── Payment Method ───────────────────────────────────── */}
            <section>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.15rem",
                  color: "#000",
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                }}
              >
                PAYMENT
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(
                  [
                    {
                      val: "online" as const,
                      title: "Pay Online",
                      desc: "UPI · Cards · Net Banking · Wallets",
                      badge: "🔒 via Razorpay",
                    },
                    {
                      val: "cod" as const,
                      title: "Cash on Delivery",
                      desc: "Pay when your order arrives",
                      badge: "+₹100 COD fee",
                    },
                  ] as const
                ).map(({ val, title, desc, badge }) => (
                  <label
                    key={val}
                    onClick={() => setPaymentMethod(val)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "16px 18px",
                      border: `1px solid ${paymentMethod === val ? "#000" : "#e0e0e0"}`,
                      background: paymentMethod === val ? "#f8f8f8" : "#fff",
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: `2px solid ${paymentMethod === val ? "#000" : "#ccc"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {paymentMethod === val && (
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#000",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          color: "#000",
                          fontSize: "0.9rem",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {title}
                      </p>
                      <p
                        style={{
                          color: "#888",
                          fontSize: "0.72rem",
                          fontFamily: "'DM Sans', sans-serif",
                          marginTop: 2,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "#666",
                        fontFamily: "'DM Sans', sans-serif",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {badge}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? "#555" : "#000",
                  color: "#fff",
                  padding: "18px 0",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  WebkitTapHighlightColor: "transparent",
                  transition: "background 0.2s",
                }}
              >
                {loading
                  ? "PROCESSING..."
                  : paymentMethod === "online"
                    ? `PAY NOW — ${formatPrice(total)}`
                    : `PLACE ORDER — ${formatPrice(total)}`}
              </button>
              <p
                style={{
                  fontSize: "0.62rem",
                  color: "#aaa",
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: "center",
                  lineHeight: 1.7,
                }}
              >
                By placing this order you agree to our{" "}
                <Link href="/terms" style={{ color: "#888", textDecoration: "underline" }}>
                  Terms & Conditions
                </Link>
                . &nbsp;🚚 Free shipping ₹999+ &nbsp;·&nbsp; 📦 Delivery in 5–7 days &nbsp;·&nbsp; ↩️ 7-day returns
              </p>
            </div>
          </div>

          {/* ── RIGHT: sticky sidebar (desktop only) ─────────────── */}
          <div
            className="hidden lg:block"
            style={{
              position: "sticky",
              top: 108,
              border: "1px solid #e8e8e8",
              padding: 24,
              background: "#f8f8f8",
            }}
          >
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "0.95rem",
                color: "#000",
                letterSpacing: "0.1em",
                marginBottom: 20,
              }}
            >
              ORDER SUMMARY ({items.length} item{items.length > 1 ? "s" : ""})
            </p>
            <OrderItems items={items} />
            <PriceSummary
              subtotal={subtotal}
              shipping={shipping}
              paymentMethod={paymentMethod}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
