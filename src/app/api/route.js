import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { username, email, password } = request.data;
  console.log("Dados recebidos:", { username, email, password });

  const existingUser = await prisma.user.findUnique({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email or Username already registered" },
      { status: 400 }
    );
  } else {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        salt,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({ message: "User registered successfully" });
  }
}
