import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderConfirmationEmail(to: string, order: any) {
  if (!process.env.SMTP_USER) return; // Skip if not configured

  await transporter.sendMail({
    from: `"PRISM INDIA" <${process.env.SMTP_USER}>`,
    to,
    subject: `Order Confirmed — #${order.id.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="background:#0a0a0a;color:#ffffff;font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;">
        <h1 style="font-size:32px;letter-spacing:0.1em;margin-bottom:8px;">PRISM INDIA</h1>
        <p style="color:#888;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:32px;">WEAR THE GRIND</p>

        <h2 style="font-size:24px;margin-bottom:8px;">ORDER CONFIRMED ✓</h2>
        <p style="color:#888;margin-bottom:24px;">Thank you ${order.addressName}! Your order is confirmed.</p>

        <div style="background:#1a1a1a;border:1px solid #2e2e2e;border-radius:4px;padding:20px;margin-bottom:24px;">
          <p style="color:#888;font-size:12px;margin-bottom:4px;">ORDER ID</p>
          <p style="font-family:monospace;font-size:14px;">${order.id.toUpperCase()}</p>
        </div>

        <div style="background:#1a1a1a;border:1px solid #2e2e2e;border-radius:4px;padding:20px;margin-bottom:24px;">
          <p style="color:#888;font-size:12px;margin-bottom:12px;">DELIVERING TO</p>
          <p>${order.addressLine1}${order.addressLine2 ? ", " + order.addressLine2 : ""}</p>
          <p>${order.addressCity}, ${order.addressState} — ${order.addressPincode}</p>
        </div>

        <div style="background:#1a1a1a;border:1px solid #2e2e2e;border-radius:4px;padding:20px;margin-bottom:24px;">
          <p style="color:#888;font-size:12px;margin-bottom:4px;">ORDER TOTAL</p>
          <p style="font-size:18px;font-weight:600;">₹${order.total.toLocaleString("en-IN")}</p>
          <p style="color:#888;font-size:12px;">${order.paymentMethod === "cod" ? "Cash on Delivery" : "Paid Online"}</p>
        </div>

        <p style="color:#888;font-size:12px;margin-bottom:8px;">Estimated Delivery: 5–7 Business Days</p>

        <div style="border-top:1px solid #2e2e2e;margin-top:32px;padding-top:24px;">
          <p style="color:#888;font-size:11px;">© 2025 PRISM INDIA · Made in India 🇮🇳</p>
          <p style="color:#888;font-size:11px;">@prismindia.in · prismindia.co</p>
        </div>
      </div>
    `,
  });
}

export async function sendOwnerOrderAlert(order: any, items: any[], address: any) {
  if (!process.env.SMTP_USER) return;

  const OWNER_EMAIL = process.env.OWNER_EMAIL ?? process.env.SMTP_USER;

  const itemRows = items
    .map(
      (i: any) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #333;color:#fff;">${i.name}</td>
          <td style="padding:8px;border-bottom:1px solid #333;color:#aaa;">${i.size} / ${i.color}</td>
          <td style="padding:8px;border-bottom:1px solid #333;color:#aaa;">×${i.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #333;color:#fff;">₹${(i.price * i.quantity).toLocaleString("en-IN")}</td>
        </tr>`
    )
    .join("");

  const isCod = order.paymentMethod === "cod";
  const remaining = order.total - (isCod ? order.codFee : 0);

  await transporter.sendMail({
    from: `"PRISM INDIA Orders" <${process.env.SMTP_USER}>`,
    to: OWNER_EMAIL,
    subject: `🛒 New Order — ₹${order.total.toLocaleString("en-IN")} · ${isCod ? "COD" : "PAID"} · #${order.id.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="background:#0a0a0a;color:#ffffff;font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:32px 24px;">
        <h1 style="font-size:22px;letter-spacing:0.1em;margin-bottom:4px;">NEW ORDER 🛒</h1>
        <p style="color:#888;font-size:11px;margin-bottom:24px;">#${order.id.toUpperCase()}</p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <thead>
            <tr style="border-bottom:1px solid #333;">
              <th style="text-align:left;padding:8px;color:#888;font-size:11px;">ITEM</th>
              <th style="text-align:left;padding:8px;color:#888;font-size:11px;">VARIANT</th>
              <th style="text-align:left;padding:8px;color:#888;font-size:11px;">QTY</th>
              <th style="text-align:left;padding:8px;color:#888;font-size:11px;">PRICE</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="background:#1a1a1a;padding:16px;margin-bottom:16px;">
          <p style="color:#888;font-size:11px;margin-bottom:8px;">PAYMENT</p>
          <p style="font-size:20px;font-weight:700;margin-bottom:4px;">₹${order.total.toLocaleString("en-IN")}</p>
          ${isCod
            ? `<p style="color:#f59e0b;font-size:13px;">COD — ₹${order.codFee} advance paid · ₹${remaining.toLocaleString("en-IN")} to collect on delivery</p>`
            : `<p style="color:#4ade80;font-size:13px;">✓ Fully paid online via Razorpay</p>`
          }
        </div>

        <div style="background:#1a1a1a;padding:16px;margin-bottom:16px;">
          <p style="color:#888;font-size:11px;margin-bottom:8px;">SHIP TO</p>
          <p style="font-size:14px;font-weight:600;">${address.name}</p>
          <p style="color:#ccc;font-size:13px;">${address.phone}</p>
          <p style="color:#ccc;font-size:13px;">${address.line1}${address.line2 ? ", " + address.line2 : ""}</p>
          <p style="color:#ccc;font-size:13px;">${address.city}, ${address.state} — ${address.pincode}</p>
        </div>

        <p style="color:#555;font-size:11px;">View all orders: prismindia.co/admin/orders</p>
      </div>
    `,
  });
}
