import { NextResponse } from "next/server";
import { saveScheme, loadSchemes} from "@/lib/db";

export async function GET() {
    const schemes = loadSchemes();
    return NextResponse.json(schemes);    
}

export async function POST(request: Request) {
    const body = await request.json();
    const data = JSON.stringify({ components: body.components, wires: 
        body.wires});
    saveScheme(body.name ?? "Без имени", data);
    return NextResponse.json({ ok: true });    
    
}