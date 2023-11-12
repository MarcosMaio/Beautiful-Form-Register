import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email } = await request.json();
  console.log("Dados recebidos:", { email });

  const token = null;

  await prisma.user.update({
    data: {
      token: token,
    },
    where: { email: email },
  });

  return NextResponse.json({}, { status: 200 });
}
