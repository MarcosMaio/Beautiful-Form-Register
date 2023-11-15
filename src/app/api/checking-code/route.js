import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { token } = await request.json();
  console.log("Dados recebidos:", { token });

  const existingToken = await prisma.user.findFirst({
    where: {
      OR: [{ token: token }],
    },
  });

  if (existingToken) {
    console.log("O token e valido");
    return NextResponse.json({}, { status: 200 });
  } else {
    console.log("O token e invalido");
    return NextResponse.json({}, { status: 401 });
  }
}
