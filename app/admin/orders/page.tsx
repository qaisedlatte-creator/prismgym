import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "webbes.in@gmail.com";

function badge(label: string, color: string) {
  return `<span style="background:${color};padding:2px 10px;border-radius:999px;font-size:11px;font-weight:600;">${label}</span>`;
}

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== ADMIN_EMAIL) redirect("/login");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      items: {
        include: { product: { select: { name: true, images: true } } },
      },
    },
  });

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const codPending = orders.filter(
    (o) => o.paymentMethod === "cod" && o.paymentStatus === "cod_advance_paid"
  ).reduce((s, o) => s + (o.total - o.codFee), 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        paddingTop: 32,
        paddingBottom: 80,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#555", marginBottom: 6 }}>
            PRISM INDIA · ADMIN
          </p>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              lineHeight: 1,
              color: "#fff",
              marginBottom: 4,
            }}
          >
            ORDERS
          </h1>
          <p style={{ color: "#555", fontSize: "0.8rem" }}>{orders.length} orders total</p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 40,
          }}
        >
          {[
            { label: "Total Revenue", value: formatPrice(totalRevenue), note: "all orders" },
            { label: "Orders", value: String(orders.length), note: "all time" },
            {
              label: "COD Pending",
              value: formatPrice(codPending),
              note: "to collect on delivery",
            },
            {
              label: "Online Paid",
              value: formatPrice(
                orders
                  .filter((o) => o.paymentStatus === "paid")
                  .reduce((s, o) => s + o.total, 0)
              ),
              note: "fully settled",
            },
          ].map(({ label, value, note }) => (
            <div
              key={label}
              style={{
                background: "#111",
                border: "1px solid #1e1e1e",
                padding: "20px 18px",
              }}
            >
              <p style={{ color: "#555", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
                {label}
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{value}</p>
              <p style={{ color: "#444", fontSize: "0.65rem", marginTop: 4 }}>{note}</p>
            </div>
          ))}
        </div>

        {/* Orders list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {orders.length === 0 && (
            <p style={{ color: "#555", textAlign: "center", padding: 40 }}>No orders yet.</p>
          )}
          {orders.map((order) => {
            const isCod = order.paymentMethod === "cod";
            const isPaid = order.paymentStatus === "paid";
            const isCodAdvance = order.paymentStatus === "cod_advance_paid";
            const remaining = isCod ? order.total - order.codFee : 0;

            return (
              <div
                key={order.id}
                style={{
                  background: "#111",
                  border: "1px solid #1e1e1e",
                  padding: "20px 22px",
                }}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.72rem",
                        color: "#444",
                        marginBottom: 4,
                        letterSpacing: "0.05em",
                      }}
                    >
                      #{order.id.slice(0, 14).toUpperCase()}
                    </p>
                    <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>
                      {order.addressName}
                    </p>
                    <p style={{ color: "#666", fontSize: "0.78rem" }}>
                      {order.addressPhone} &nbsp;·&nbsp; {order.addressCity}, {order.addressState}
                    </p>
                    <p style={{ color: "#555", fontSize: "0.72rem", marginTop: 2 }}>
                      {order.addressLine1}
                      {order.addressLine2 ? `, ${order.addressLine2}` : ""} — {order.addressPincode}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                      {formatPrice(order.total)}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        background: isPaid ? "#14532d" : isCodAdvance ? "#78350f" : "#1e1b4b",
                        color: isPaid ? "#4ade80" : isCodAdvance ? "#fbbf24" : "#a5b4fc",
                        marginBottom: 4,
                      }}
                    >
                      {isPaid ? "PAID ONLINE" : isCodAdvance ? "COD · ADV. PAID" : "PENDING"}
                    </span>
                    {isCod && (
                      <p style={{ color: "#888", fontSize: "0.68rem" }}>
                        Collect ₹{remaining.toLocaleString("en-IN")} on delivery
                      </p>
                    )}
                    <p style={{ color: "#555", fontSize: "0.65rem", marginTop: 4 }}>
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: 12, display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: "#1a1a1a",
                        padding: "8px 12px",
                        fontSize: "0.72rem",
                        color: "#ccc",
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#fff", fontWeight: 500 }}>{item.product?.name ?? "—"}</span>
                      <span style={{ color: "#555" }}>
                        {item.size} / {item.color} × {item.quantity}
                      </span>
                      <span style={{ color: "#888" }}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
