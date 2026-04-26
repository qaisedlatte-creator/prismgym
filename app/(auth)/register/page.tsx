"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/toaster";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast({ title: "Passwords don't match", variant: "error" });
      return;
    }
    if (form.password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "error" });
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });
    setLoading(false);
    const data = await res.json();
    if (!res.ok) {
      toast({ title: data.error || "Registration failed", variant: "error" });
    } else {
      toast({ title: "Account created!", description: "Please sign in.", variant: "success" });
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-10">
          <Image src="/logo-mark.png" alt="PRISM" width={40} height={40} className="invert mx-auto mb-4" />
          <h1
            className="text-white tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem" }}
          >
            JOIN PRISM
          </h1>
          <p className="text-[#888888] text-sm mt-2">Create your account</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Full Name", key: "name", type: "text" },
              { label: "Email", key: "email", type: "email" },
              { label: "Password", key: "password", type: "password" },
              { label: "Confirm Password", key: "confirmPassword", type: "password" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-[#888888] text-xs tracking-[0.2em] uppercase mb-2">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required
                  className="w-full bg-[#0a0a0a] border border-[#2e2e2e] text-white text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors rounded-sm"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#0a0a0a] py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors disabled:opacity-60"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#888888] text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-white underline underline-offset-4 hover:text-[#c0c0c0] transition-colors">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
