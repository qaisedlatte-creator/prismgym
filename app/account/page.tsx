import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AccountClient } from "./AccountClient";
import prisma from "@/lib/prisma";

export const metadata = { title: "My Account" };

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login?callbackUrl=/account");

  let orders: any[] = [];
  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        orders: {
          orderBy: { createdAt: "desc" },
          include: { items: { include: { product: true } } },
        },
      },
    });
    orders = user?.orders ?? [];
  } catch {}

  return <AccountClient user={session.user} orders={orders} />;
}
