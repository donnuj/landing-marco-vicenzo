export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const password = typeof body.password === "string" ? body.password : "";
  const correct = process.env.DASH_PASSWORD;
  if (!correct || password !== correct)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("dash_auth", correct, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("dash_auth");
  return res;
}
