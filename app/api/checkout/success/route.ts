import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request, response: Response) {
  const { sessionId } = await request.json();
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log(
      "sessionnn + " +
        session.client_reference_id +
        "book " +
        session.metadata?.bookId
    );
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId,
      },
    });
    console.log(existingPurchase);
    if (!existingPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        },
      });

      return NextResponse.json({ purchase });
    } else {
      console.log("sssssssssss");
      return NextResponse.json({ message: "すでに購入済みです。" });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
