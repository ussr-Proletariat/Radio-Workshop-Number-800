import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const schemes = await prisma.scheme.findMany({ orderBy: { id: "desc" }   
});
  return NextResponse.json(schemes);  
}

export async function POST(request: Request) {
    const body = await request.json();
    const data = JSON.stringify({ components: body.components, wires: 
        body.wires});
    await prisma.scheme.create({ data: { name: body.name ?? "Без имени", data} });
    return NextResponse.json({ ok: true });
    }
    
