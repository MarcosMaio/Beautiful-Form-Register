import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const { newPassword, currentCode } = await request.json();
  console.log("Dados recebidos:", { newPassword, currentCode });

  const user = await prisma.user.findFirst({
    where: {
      token: currentCode,
    },
  });

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  if (!user) {
    console.log(
      "Erro na solicitação, o token expirou ou usuário não encontrado"
    );
    return NextResponse.json({}, { status: 500 });
  }

  const alreadyUsedPassword = await prisma.user.findFirst({
    where: {
      id: user.id,
      password: hashedPassword,
    },
  });

  if (alreadyUsedPassword) {
    console.log("Senha já registrada anteriormente");
    return NextResponse.json({}, { status: 409 });
  } else {
    const changeUserPassword = await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: user.id,
      },
    });

    if (changeUserPassword) {
      console.log("Senha alterada com sucesso");
      const currentCode = null;

      await prisma.user.update({
        data: {
          token: currentCode,
        },
        where: {
          id: user.id,
        },
      });

      return NextResponse.json({}, { status: 200 });
    } else {
      console.log(
        "Erro na solicitação, o token expirou ou usuário não encontrado"
      );
      return NextResponse.json({}, { status: 500 });
    }
  }
}
