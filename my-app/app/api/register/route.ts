import { NextResponse } from "next/server";
import { createUser, findUserByNick } from "@/lib/db";
import { scryptSync, randomBytes } from "crypto";

export async function POST(request: Request,) {
  const body = await request.json();
  const { nick, password } = body;

  if (!nick || nick.length < 4 || nick.length > 20) {
    return NextResponse.json({ error: "Ник: от 4 о 20 символов"}, { status: 400 });
  }
  if (!password || password.length < 4 || password.length > 8) {
    return NextResponse.json({ error: "Пароль: от 4 до 8 символов" }, {
status: 400});
  }
  
const existing = findUserByNick(nick);
if (existing) {
  return NextResponse.json({ error: "Ник занят"}, { status: 409 });
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
const passwordHash = `${salt}:${hash}`;

try {
    createUser(nick, passwordHash);
    return NextResponse.json({ ok: true });
}   catch (e) {
    return NextResponse.json({ error: "Ошибка сохронения"}, { status: 500});
} 
    
}