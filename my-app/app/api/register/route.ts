import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scryptSync, randomBytes } from "crypto";

export async function POST(request: Request,) {
  const { nick, password } = await request.json();

  if (!nick || nick.length < 4 || nick.length > 20) {
    return NextResponse.json({ error: "Ник: от 4 о 20 символов"}, { status: 400 });
  }
  if (!password || password.length < 4 || password.length > 8) {
    return NextResponse.json({ error: "Пароль: от 4 до 8 символов" }, {
status: 400});
  }
  
const existing = await prisma.user.findUnique({where: { nick }});
if (existing) {
  return NextResponse.json({ error: "Ник занят"}, { status: 409 });
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
const passwordHash = `${salt}:${hash}`;

await prisma.user.create({ data: { nick, passwordHash} });
return NextResponse.json({ ok: true });
   
}