import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import generateRandomCode from "../generate-code/generateRandomCode";
import sendVerificationEmail from "../send-email/sendVerificationEmail";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email } = await request.json();
  console.log("Dados recebidos:", { email });

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    console.log("tudo certo ele existe");
    const verificationCode = generateRandomCode();

    await prisma.user.update({
      data: {
        token: verificationCode,
      },
      where: { email: email },
    });

    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({}, { status: 200 });
  } else {
    console.log("não existe usuario com esse email");
    return NextResponse.json({}, { status: 401 });
  }
}
