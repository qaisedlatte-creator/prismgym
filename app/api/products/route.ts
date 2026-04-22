import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");

    const where: any = {};
    if (category) where.category = category;
    if (featured === "true") where.isFeatured = true;

    if (slug) {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: { reviews: { include: { user: { select: { name: true } } } } },
      });
      if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(product);
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
