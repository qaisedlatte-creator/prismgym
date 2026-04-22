"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateShipping, COD_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";
import { useToast } from "@/components/ui/toaster";
import { Check, CreditCard, Truck, ClipboardList } from "lucide-react";

type Step = 1 | 2 | 3;
type PaymentMethod = "online" | "cod";

interface AddressForm {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

const initialAddress: AddressForm = {
  name: "", email: "", phone: "", line1: "", line2: "",
  city: "", state: "", pincode: "",
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState<AddressForm>(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const codFee = paymentMethod === "cod" ? COD_FEE : 0;
  const total = subtotal + shipping + codFee;

  if (items.length === 0) {
    router.push("/catalog");
    return null;
  }

  const validateAddress = () => {
    const required: (keyof AddressForm)[] = ["name", "email", "phone", "line1", "city", "state", "pincode"];
    for (const field of required) {
      if (!address[field].trim()) {
        toast({ title: `Please fill in your ${field}`, variant: "error" });
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
        // Create Razorpay order
        const res = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total }),
        });
        const { orderId, keyId } = await res.json();

        // Load Razorpay script
        if (!window.Razorpay) {
          await new Promise<void>((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve();
            document.body.appendChild(script);
          });
        }

        const rzp = new window.Razorpay({
          key: keyId,
          amount: total * 100,
          currency: "INR",
          name: "PRISM INDIA",
          description: `Order — ${items.length} item(s)`,
          order_id: orderId,
          prefill: { name: address.name, email: address.email, contact: address.phone },
          theme: { color: "#ffffff" },
          handler: async (response: any) => {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                items, address, subtotal, shippingFee: shipping, codFee: 0, total,
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

  const InputField = ({ label, field, type = "text", placeholder }: {
    label: string; field: keyof AddressForm; type?: string; placeholder?: string;
  }) => (
    <div>
      <label className="block text-[#888888] text-xs tracking-[0.2em] uppercase mb-2">{label}</label>
      <input
        type={type}
        value={address[field]}
        onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
        placeholder={placeholder}
        className="w-full bg-[#1a1a1a] border border-[#2e2e2e] text-white text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors rounded-sm"
      />
    </div>
  );

  const steps = [
    { num: 1, label: "Address", icon: Truck },
    { num: 2, label: "Payment", icon: CreditCard },
    { num: 3, label: "Review", icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h1
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.9 }}
          className="text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CHECKOUT
        </motion.h1>

        {/* Step indicators */}
        <div className="flex items-center gap-0 mb-12 max-w-sm">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors border ${
                step > s.num ? "bg-white text-[#0a0a0a] border-white" :
                step === s.num ? "border-white text-white" :
                "border-[#2e2e2e] text-[#888888]"
              }`}>
                {step > s.num ? <Check size={14} /> : s.num}
              </div>
              <span className={`ml-2 text-xs tracking-[0.1em] uppercase hidden sm:block ${step >= s.num ? "text-white" : "text-[#888888]"}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-4 ${step > s.num ? "bg-white" : "bg-[#2e2e2e]"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Address */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-white tracking-widest mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem" }}>
                    SHIPPING ADDRESS
                  </h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Full Name" field="name" placeholder="John Doe" />
                      <InputField label="Email" field="email" type="email" placeholder="john@example.com" />
                    </div>
                    <InputField label="Phone" field="phone" type="tel" placeholder="9876543210" />
                    <InputField label="Address Line 1" field="line1" placeholder="Flat/House No., Building, Street" />
                    <InputField label="Address Line 2 (Optional)" field="line2" placeholder="Area, Landmark" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <InputField label="City" field="city" placeholder="Mumbai" />
                      <InputField label="State" field="state" placeholder="Maharashtra" />
                      <InputField label="Pincode" field="pincode" placeholder="400001" />
                    </div>
                  </div>
                  <button
                    onClick={() => { if (validateAddress()) setStep(2); }}
                    className="mt-8 w-full bg-white text-[#0a0a0a] py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-white tracking-widest mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem" }}>
                    PAYMENT METHOD
                  </h2>
                  <div className="space-y-4">
                    {/* Online payment */}
                    <label className={`flex items-start gap-4 p-5 border cursor-pointer transition-colors rounded-sm ${
                      paymentMethod === "online" ? "border-white bg-[#1a1a1a]" : "border-[#2e2e2e] hover:border-[#888888]"
                    }`}>
                      <input
                        type="radio"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        paymentMethod === "online" ? "border-white" : "border-[#2e2e2e]"
                      }`}>
                        {paymentMethod === "online" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Pay Online</p>
                        <p className="text-[#888888] text-xs mt-1">UPI · Cards · Net Banking · Wallets via Razorpay</p>
                        <p className="text-[#888888] text-xs mt-0.5">🔒 100% secure payments</p>
                      </div>
                    </label>

                    {/* COD */}
                    <label className={`flex items-start gap-4 p-5 border cursor-pointer transition-colors rounded-sm ${
                      paymentMethod === "cod" ? "border-white bg-[#1a1a1a]" : "border-[#2e2e2e] hover:border-[#888888]"
                    }`}>
                      <input
                        type="radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        paymentMethod === "cod" ? "border-white" : "border-[#2e2e2e]"
                      }`}>
                        {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Cash on Delivery</p>
                        <p className="text-[#888888] text-xs mt-1">Pay when your order arrives</p>
                        <p className="text-white text-xs mt-1 font-medium">+₹100 COD handling fee applied</p>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-[#2e2e2e] text-[#888888] py-4 text-sm tracking-[0.2em] uppercase hover:border-white hover:text-white transition-colors"
                    >
                      BACK
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-white text-[#0a0a0a] py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors"
                    >
                      REVIEW ORDER
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-white tracking-widest mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem" }}>
                    REVIEW YOUR ORDER
                  </h2>

                  {/* Address summary */}
                  <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-xs tracking-[0.2em] uppercase">Delivering to</h3>
                      <button onClick={() => setStep(1)} className="text-[#888888] hover:text-white text-xs underline underline-offset-4 transition-colors">Edit</button>
                    </div>
                    <p className="text-white text-sm font-medium">{address.name}</p>
                    <p className="text-[#888888] text-sm">{address.line1}{address.line2 ? `, ${address.line2}` : ""}</p>
                    <p className="text-[#888888] text-sm">{address.city}, {address.state} — {address.pincode}</p>
                    <p className="text-[#888888] text-sm">{address.phone}</p>
                  </div>

                  {/* Payment summary */}
                  <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-xs tracking-[0.2em] uppercase">Payment</h3>
                      <button onClick={() => setStep(2)} className="text-[#888888] hover:text-white text-xs underline underline-offset-4 transition-colors">Edit</button>
                    </div>
                    <p className="text-white text-sm">{paymentMethod === "cod" ? "Cash on Delivery (+₹100)" : "Online Payment via Razorpay"}</p>
                  </div>

                  {/* Items */}
                  <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-5 mb-8">
                    <h3 className="text-white text-xs tracking-[0.2em] uppercase mb-4">Items ({items.length})</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
                          <div className="relative w-12 h-14 bg-[#2e2e2e] rounded-sm overflow-hidden flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm">{item.name}</p>
                            <p className="text-[#888888] text-xs">{item.size} · {item.color} · ×{item.quantity}</p>
                          </div>
                          <span className="text-white text-sm">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border border-[#2e2e2e] text-[#888888] py-4 text-sm tracking-[0.2em] uppercase hover:border-white hover:text-white transition-colors"
                    >
                      BACK
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="flex-1 bg-white text-[#0a0a0a] py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "PLACING ORDER..." : `PLACE ORDER — ${formatPrice(total)}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-6 sticky top-28">
              <h3 className="text-white tracking-widest mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>
                ORDER SUMMARY
              </h3>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
                    <div className="relative w-10 h-12 bg-[#2e2e2e] rounded-sm overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 bg-white text-[#0a0a0a] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs truncate">{item.name}</p>
                      <p className="text-[#888888] text-[10px]">{item.size}</p>
                    </div>
                    <span className="text-white text-xs">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2e2e2e] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Shipping</span>
                  <span className="text-white">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888888]">COD Fee</span>
                    <span className="text-white">+{formatPrice(COD_FEE)}</span>
                  </div>
                )}
                <div className="border-t border-[#2e2e2e] pt-3 flex justify-between font-medium">
                  <span className="text-white">Total</span>
                  <span className="text-white">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
