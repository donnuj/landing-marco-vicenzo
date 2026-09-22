export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { getRequestContext } from "@cloudflare/next-on-pages";

interface LeadPayload {
  name: string;
  whatsapp: string;
  regiao?: string;
  instagram?: string;
  campaign?: string;
  source?: string;
}

const MAX_LEN = { name: 120, whatsapp: 20, regiao: 120, instagram: 120, campaign: 80 };
const PHONE_RE = /^\+?[\d\s\-(). ]{6,20}$/;

async function sendNotification(lead: LeadPayload & { receivedAt: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const alertContacts = siteConfig.alertContacts.filter(Boolean);
  if (!alertContacts.length) return;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="background:#001A4D;color:#fff;font-family:sans-serif;padding:32px;margin:0">
  <div style="max-width:560px;margin:0 auto">
    <div style="background:#F5A623;padding:4px 12px;display:inline-block;margin-bottom:16px;font-weight:bold;font-size:11px;letter-spacing:3px;color:#001A4D">MARCO VICENZO — NOVO CONTATO</div>
    <h2 style="margin:0 0 4px;font-size:22px">${lead.name}</h2>
    <p style="color:#a0b0c0;margin:0 0 20px;font-size:13px">${lead.receivedAt}</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #0a3d9e">
      <tr><td style="padding:8px 12px;background:#0a2060;color:#a0b0c0;font-size:13px;width:130px">WHATSAPP</td><td style="padding:8px 12px;font-size:13px">${lead.whatsapp}</td></tr>
      ${lead.regiao ? `<tr><td style="padding:8px 12px;background:#0a2060;color:#a0b0c0;font-size:13px">REGIÃO</td><td style="padding:8px 12px;font-size:13px">${lead.regiao}</td></tr>` : ""}
      ${lead.instagram ? `<tr><td style="padding:8px 12px;background:#0a2060;color:#a0b0c0;font-size:13px">INSTAGRAM</td><td style="padding:8px 12px;font-size:13px">${lead.instagram}</td></tr>` : ""}
      <tr><td style="padding:8px 12px;background:#0a2060;color:#a0b0c0;font-size:13px">ORIGEM</td><td style="padding:8px 12px;font-size:13px">${lead.source ?? lead.campaign ?? "—"}</td></tr>
    </table>
    <div style="margin-top:20px;text-align:center"><a href="https://wa.me/55${lead.whatsapp.replace(/\D/g,"")}" style="display:inline-block;padding:12px 28px;background:#4E9E39;color:#fff;text-decoration:none;font-weight:bold;font-size:13px;letter-spacing:2px">RESPONDER NO WHATSAPP</a></div>
  </div>
</body></html>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Dr. Marco Vicenzo <contato@votevicenzo.com.br>",
      to: alertContacts,
      subject: `[VICENZO] Novo contato: ${lead.name}`,
      html,
    }),
  }).catch((e) => console.error("[lead] email error:", e));
}

async function syncToBackend(lead: LeadPayload & { receivedAt: string }) {
  const apiUrl = process.env.BACKEND_API_URL;
  if (!apiUrl) return;
  const ORG_ID = "eeeeeeee-0000-0000-0000-000000000005";
  const apiKey = process.env.API_KEY;
  await fetch(`${apiUrl}/marketing/${ORG_ID}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "X-API-Key": apiKey } : {}),
    },
    body: JSON.stringify({
      name: lead.name,
      whatsapp: lead.whatsapp,
      regiaoAdministrativa: lead.regiao,
      instagram: lead.instagram,
      fontes: ["Site"],
      source: lead.source ?? "site",
    }),
  }).catch((e) => console.error("[lead] backend sync error:", e));
}

async function saveLead(lead: LeadPayload & { receivedAt: string }) {
  try {
    const { env } = getRequestContext();
    const db = (env as Record<string, unknown>).DB as D1Database | undefined;
    if (!db) return;
    await db.prepare(
      "INSERT INTO leads (name, phone, regiao_administrativa, instagram, campaign, source, created_at) VALUES (?,?,?,?,?,?,?)"
    ).bind(
      lead.name,
      lead.whatsapp,
      lead.regiao ?? null,
      lead.instagram ?? null,
      lead.campaign ?? null,
      lead.source ?? null,
      lead.receivedAt,
    ).run();
  } catch (e) {
    console.error("[lead] d1 error:", e);
  }
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { name, whatsapp, regiao, instagram, campaign, source } = body;

  if (!name?.trim() || !whatsapp?.trim())
    return NextResponse.json({ error: "invalid_fields" }, { status: 422 });

  if (name.length > MAX_LEN.name)
    return NextResponse.json({ error: "field_too_long", field: "name" }, { status: 422 });
  if (whatsapp.length > MAX_LEN.whatsapp || !PHONE_RE.test(whatsapp))
    return NextResponse.json({ error: "invalid_phone" }, { status: 422 });
  if (regiao && regiao.length > MAX_LEN.regiao)
    return NextResponse.json({ error: "field_too_long", field: "regiao" }, { status: 422 });
  if (instagram && instagram.length > MAX_LEN.instagram)
    return NextResponse.json({ error: "field_too_long", field: "instagram" }, { status: 422 });

  const lead = {
    name: name.trim(),
    whatsapp: whatsapp.trim(),
    regiao: regiao?.trim(),
    instagram: instagram?.trim() || undefined,
    campaign: campaign?.trim(),
    source: source?.trim(),
    receivedAt: new Date().toISOString(),
  };

  console.info("[lead]", { name: lead.name, source: lead.source, receivedAt: lead.receivedAt });
  await Promise.all([sendNotification(lead), saveLead(lead), syncToBackend(lead)]);

  return NextResponse.json({ ok: true }, { status: 201 });
}
