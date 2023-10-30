import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password } = await request.json();
  console.log("Dados recebidos:", { email, password });

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      console.log("usuario logado");
      return NextResponse.json({}, { status: 200 });
    } else {
      console.log("usuario ou senha invalidos");
      return NextResponse.json({}, { status: 401 });
    }
  } else {
    console.log("deu merda");
    return NextResponse.json({}, { status: 404 });
  }
}
