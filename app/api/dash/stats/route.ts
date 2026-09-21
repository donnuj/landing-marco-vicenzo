export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { fetchGA4Stats } from "@/lib/ga4";
import { getRequestContext } from "@cloudflare/next-on-pages";

function isAuthed(req: NextRequest) {
  const cookie = req.cookies.get("dash_auth")?.value;
  const correct = process.env.DASH_PASSWORD;
  return correct && cookie === correct;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const days = parseInt(req.nextUrl.searchParams.get("days") ?? "30");

  const [ga4, leadsData] = await Promise.all([
    fetchGA4Stats(days).catch((e) => {
      console.error("[dash] ga4 error:", e);
      return null;
    }),
    (async () => {
      try {
        const { env } = getRequestContext();
        const db = (env as Record<string, unknown>).DB as D1Database | undefined;
        if (!db) return { total: 0, recent: [], bySource: [] };

        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        const iso = cutoff.toISOString();

        const [totalRes, recentRes, bySourceRes] = await Promise.all([
          db.prepare("SELECT COUNT(*) as count FROM leads WHERE created_at >= ?").bind(iso).first<{ count: number }>(),
          db.prepare("SELECT id, name, phone, email, source, campaign, created_at FROM leads ORDER BY created_at DESC LIMIT 50").all(),
          db.prepare("SELECT COALESCE(source, campaign, 'direto') as src, COUNT(*) as count FROM leads WHERE created_at >= ? GROUP BY src ORDER BY count DESC").bind(iso).all(),
        ]);

        return {
          total: totalRes?.count ?? 0,
          recent: recentRes.results ?? [],
          bySource: bySourceRes.results ?? [],
        };
      } catch (e) {
        console.error("[dash] d1 error:", e);
        return { total: 0, recent: [], bySource: [] };
      }
    })(),
  ]);

  return NextResponse.json({ ga4, leads: leadsData, days });
}
