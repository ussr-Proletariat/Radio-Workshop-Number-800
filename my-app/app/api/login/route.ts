import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scryptSync } from "crypto";

export async function POST(request: Request) {
  const { nick, password } = await request.json();

  if (!nick || !password) {
    return NextResponse.json({ error: "Введите ник и пароль" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { nick } });
  if (!user) {
    return NextResponse.json({ error: "Неверный ник или пароль" }, { status: 401 });
  }

  const [salt, hash] = user.passwordHash.split(":");
  const testHash = scryptSync(password, salt, 64).toString("hex");

  if (testHash !== hash) {
    return NextResponse.json({ error: "Неверный ник или пароль" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}