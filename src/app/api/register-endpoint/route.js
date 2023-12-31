import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request) {
  const { username, email, password } = await request.json();
  console.log("Dados recebidos:", { username, email, password });

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: username }, { email: email }],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email or Username already registered" },
      { status: 401 }
    );
  } else {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const token = undefined;

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        salt,
        token,
      },
    });

    await prisma.$disconnect();

    console.log("Usuario registrado com sucesso");
    return NextResponse.json({}, { status: 200 });
  }
}
