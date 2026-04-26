"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateShipping, COD_FEE } from "@/lib/utils";
import { useToast } from "@/components/ui/toaster";
import { Check, CreditCard, Truck, ClipboardList } from "lucide-react";

type Step = 1 | 2 | 3;
type PaymentMethod = "online" | "cod";

interface AddressForm {
  name: string; email: string; phone: string;
  line1: string; line2: string; city: string; state: string; pincode: string;
}

const initialAddress: AddressForm = { name: "", email: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" };

// ── InputField defined OUTSIDE component to prevent focus loss on re-render ──
function InputField({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label style={{ display: "block", color: "#666", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "#f8f8f8",
          border: "1px solid #e0e0e0",
          color: "#000",
          fontSize: "0.875rem",
          padding: "12px 14px",
          outline: "none",
          fontFamily: "'DM Sans', sans-serif",
          transition: "border-color 0.18s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#000")}
        onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
      />
    </div>
  );
}

declare global { interface Window { Razorpay: any; } }

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState<AddressForm>(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const codFee = paymentMethod === "cod" ? COD_FEE : 0;
  const total = subtotal + shipping + codFee;

  const set = (field: keyof AddressForm) => (v: string) => setAddress((a) => ({ ...a, [field]: v }));

  if (items.length === 0) { router.push("/catalog"); return null; }

  const validateAddress = () => {
    const required: (keyof AddressForm)[] = ["name", "email", "phone", "line1", "city", "state", "pincode"];
    for (const f of required) {
      if (!address[f].trim()) { toast({ title: `Please fill in your ${f}`, variant: "error" }); return false; }
    }
    if (!/^\d{10}$/.test(address.phone)) { toast({ title: "Enter a valid 10-digit phone number", variant: "error" }); return false; }
    if (!/^\d{6}$/.test(address.pincode)) { toast({ title: "Enter a valid 6-digit pincode", variant: "error" }); return false; }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!agreed) { toast({ title: "Please accept the Terms & Conditions", variant: "error" }); return; }
    setLoading(true);
    try {
      if (paymentMethod === "cod") {
        const res = await fetch("/api/orders", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, address, paymentMethod: "cod", subtotal, shippingFee: shipping, codFee: COD_FEE, total }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Order failed");
        clearCart(); router.push(`/order/${data.id}`);
      } else {
        const res = await fetch("/api/razorpay/create-order", {
          method: "POST", headers: { "Content-Type": "application/json" },
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
          key: keyId, amount: total * 100, currency: "INR",
          name: "PRISM INDIA", description: `Order — ${items.length} item(s)`,
          order_id: orderId,
          prefill: { name: address.name, email: address.email, contact: address.phone },
          theme: { color: "#000000" },
          handler: async (response: any) => {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ razorpayOrderId: response.razorpay_order_id, razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature, items, address, subtotal, shippingFee: shipping, codFee: 0, total }),
            });
            const data = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(data.error);
            clearCart(); router.push(`/order/${data.id}`);
          },
          modal: { ondismiss: () => setLoading(false) },
        });
        rzp.open(); return;
      }
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err.message, variant: "error" });
    }
    setLoading(false);
  };

  const steps = [
    { num: 1, label: "Address", icon: Truck },
    { num: 2, label: "Payment", icon: CreditCard },
    { num: 3, label: "Review", icon: ClipboardList },
  ];

  const lbl = "text-[#000] text-xs tracking-[0.1em] uppercase";
  const card = "bg-[#f8f8f8] border border-[#e8e8e8]";

  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80, background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
        <motion.h1
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.9, color: "#000", marginBottom: 40 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        >
          CHECKOUT
        </motion.h1>

        {/* Steps */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 48, maxWidth: 360 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: 700, border: "1px solid",
                background: step > s.num ? "#000" : "transparent",
                borderColor: step >= s.num ? "#000" : "#ccc",
                color: step > s.num ? "#fff" : step === s.num ? "#000" : "#bbb",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {step > s.num ? <Check size={14} /> : s.num}
              </div>
              <span style={{ marginLeft: 8, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: step >= s.num ? "#000" : "#bbb", fontFamily: "'DM Sans', sans-serif" }}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: step > s.num ? "#000" : "#e0e0e0", margin: "0 12px" }} />}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48, alignItems: "start" }} className="grid-cols-1 lg:grid-cols-[1fr_340px]">
          {/* Main */}
          <div>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#000", letterSpacing: "0.05em", marginBottom: 24 }}>SHIPPING ADDRESS</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <InputField label="Full Name" value={address.name} onChange={set("name")} placeholder="Rahul Sharma" />
                      <InputField label="Email" value={address.email} onChange={set("email")} type="email" placeholder="rahul@email.com" />
                    </div>
                    <InputField label="Phone" value={address.phone} onChange={set("phone")} type="tel" placeholder="9876543210" />
                    <InputField label="Address Line 1" value={address.line1} onChange={set("line1")} placeholder="Flat/House No., Building, Street" />
                    <InputField label="Address Line 2 (Optional)" value={address.line2} onChange={set("line2")} placeholder="Area, Landmark" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <InputField label="City" value={address.city} onChange={set("city")} placeholder="Kochi" />
                      <InputField label="State" value={address.state} onChange={set("state")} placeholder="Kerala" />
                      <InputField label="Pincode" value={address.pincode} onChange={set("pincode")} placeholder="682001" />
                    </div>
                  </div>
                  <button
                    onClick={() => { if (validateAddress()) setStep(2); }}
                    style={{ marginTop: 28, width: "100%", background: "#000", color: "#fff", padding: "14px 0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", border: "none", cursor: "pointer" }}
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#000", marginBottom: 24 }}>PAYMENT METHOD</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {([
                      { val: "online" as PaymentMethod, title: "Pay Online", desc: "UPI · Cards · Net Banking via Razorpay", sub: "🔒 100% secure" },
                      { val: "cod" as PaymentMethod, title: "Cash on Delivery", desc: "Pay when your order arrives", sub: "+₹100 COD handling fee" },
                    ] as const).map(({ val, title, desc, sub }) => (
                      <label key={val} onClick={() => setPaymentMethod(val)} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: 20, border: `1px solid ${paymentMethod === val ? "#000" : "#e0e0e0"}`, background: paymentMethod === val ? "#f8f8f8" : "#fff", cursor: "pointer" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${paymentMethod === val ? "#000" : "#ccc"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                          {paymentMethod === val && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#000" }} />}
                        </div>
                        <div>
                          <p style={{ color: "#000", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{title}</p>
                          <p style={{ color: "#888", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{desc}</p>
                          <p style={{ color: "#666", fontSize: "0.72rem", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{sub}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, border: "1px solid #e0e0e0", color: "#666", padding: "13px 0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", background: "transparent", cursor: "pointer" }}>BACK</button>
                    <button onClick={() => setStep(3)} style={{ flex: 2, background: "#000", color: "#fff", padding: "13px 0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>REVIEW ORDER</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#000", marginBottom: 24 }}>REVIEW YOUR ORDER</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                    <div style={{ border: "1px solid #e8e8e8", padding: 16, background: "#f8f8f8" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", fontFamily: "'DM Sans', sans-serif" }}>Delivering to</span>
                        <button onClick={() => setStep(1)} style={{ fontSize: "0.65rem", color: "#888", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
                      </div>
                      <p style={{ color: "#000", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{address.name}</p>
                      <p style={{ color: "#666", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>{address.line1}{address.line2 ? `, ${address.line2}` : ""}</p>
                      <p style={{ color: "#666", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>{address.city}, {address.state} — {address.pincode}</p>
                      <p style={{ color: "#666", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>{address.phone}</p>
                    </div>
                    <div style={{ border: "1px solid #e8e8e8", padding: 16, background: "#f8f8f8" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", fontFamily: "'DM Sans', sans-serif" }}>Payment</span>
                        <button onClick={() => setStep(2)} style={{ fontSize: "0.65rem", color: "#888", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
                      </div>
                      <p style={{ color: "#000", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif" }}>{paymentMethod === "cod" ? "Cash on Delivery (+₹100)" : "Online Payment via Razorpay"}</p>
                    </div>
                    <div style={{ border: "1px solid #e8e8e8", padding: 16, background: "#f8f8f8" }}>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>Items ({items.length})</p>
                      {items.map((item) => (
                        <div key={`${item.productId}-${item.size}`} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                          <div style={{ position: "relative", width: 44, height: 52, background: "#e8e8e8", overflow: "hidden", flexShrink: 0 }}>
                            <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ color: "#000", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>{item.name}</p>
                            <p style={{ color: "#888", fontSize: "0.7rem", fontFamily: "'DM Sans', sans-serif" }}>{item.size} · {item.color} · ×{item.quantity}</p>
                          </div>
                          <span style={{ color: "#000", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div style={{ border: "1px solid #e8e8e8", padding: 20, background: "#f8f8f8", marginBottom: 20 }}>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: "#000", marginBottom: 10, letterSpacing: "0.05em" }}>TERMS & CONDITIONS</p>
                    <div style={{ maxHeight: 120, overflowY: "auto", marginBottom: 14 }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#666", lineHeight: 1.7 }}>
                        By placing this order you agree to our Terms of Service and Privacy Policy. Orders are processed within 1–2 business days. Delivery takes 5–7 business days across India. Returns are accepted within 7 days of delivery for unused items in original packaging. COD orders carry a ₹100 handling fee. Razorpay processes all online payments securely — PRISM INDIA does not store your card details. For queries contact us at support@prismindia.co or on Instagram @prismindia.in.
                      </p>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ width: 16, height: 16, accentColor: "#000" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#000" }}>
                        I have read and agree to the <Link href="/terms" style={{ color: "#000", textDecoration: "underline" }}>Terms & Conditions</Link>
                      </span>
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setStep(2)} style={{ flex: 1, border: "1px solid #e0e0e0", color: "#666", padding: "13px 0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", background: "transparent", cursor: "pointer" }}>BACK</button>
                    <button onClick={handlePlaceOrder} disabled={loading} style={{ flex: 2, background: loading ? "#666" : "#000", color: "#fff", padding: "13px 0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
                      {loading ? "PLACING ORDER..." : `PLACE ORDER — ${formatPrice(total)}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div style={{ border: "1px solid #e8e8e8", padding: 24, position: "sticky", top: 120, background: "#f8f8f8" }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: "#000", letterSpacing: "0.08em", marginBottom: 20 }}>ORDER SUMMARY</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ position: "relative", width: 36, height: 44, background: "#e8e8e8", overflow: "hidden", flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                    <span style={{ position: "absolute", top: -4, right: -4, background: "#000", color: "#fff", fontSize: 8, fontWeight: 700, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.quantity}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "#000", fontSize: "0.72rem", fontFamily: "'DM Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                    <p style={{ color: "#888", fontSize: "0.65rem", fontFamily: "'DM Sans', sans-serif" }}>{item.size}</p>
                  </div>
                  <span style={{ color: "#000", fontSize: "0.72rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #e0e0e0", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
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
              <div style={{ borderTop: "1px solid #e0e0e0", paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#000", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Total</span>
                <span style={{ color: "#000", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
