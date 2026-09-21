export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  campaign?: string;
  source?: string;
}

const MAX_LEN = { name: 120, phone: 20, email: 254, message: 2000, campaign: 80 };
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
      <tr><td style="padding:8px 12px;background:#0a2060;color:#a0b0c0;font-size:13px;width:110px">TELEFONE</td><td style="padding:8px 12px;font-size:13px">${lead.phone ?? "—"}</td></tr>
      ${lead.email ? `<tr><td style="padding:8px 12px;background:#0a2060;color:#a0b0c0;font-size:13px">EMAIL</td><td style="padding:8px 12px;font-size:13px">${lead.email}</td></tr>` : ""}
      <tr><td style="padding:8px 12px;background:#0a2060;color:#a0b0c0;font-size:13px">ORIGEM</td><td style="padding:8px 12px;font-size:13px">${lead.source ?? lead.campaign ?? "—"}</td></tr>
      ${lead.message ? `<tr><td style="padding:8px 12px;background:#0a2060;color:#a0b0c0;font-size:13px">MENSAGEM</td><td style="padding:8px 12px;font-size:13px">${lead.message}</td></tr>` : ""}
    </table>
    ${lead.phone ? `<div style="margin-top:20px;text-align:center"><a href="https://wa.me/55${lead.phone.replace(/\D/g,"")}" style="display:inline-block;padding:12px 28px;background:#4E9E39;color:#fff;text-decoration:none;font-weight:bold;font-size:13px;letter-spacing:2px">RESPONDER NO WHATSAPP</a></div>` : ""}
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

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { name, phone, email, message, campaign, source } = body;

  if (!name?.trim() || (!phone?.trim() && !email?.trim()))
    return NextResponse.json({ error: "invalid_fields" }, { status: 422 });

  if (name.length > MAX_LEN.name)
    return NextResponse.json({ error: "field_too_long", field: "name" }, { status: 422 });
  if (phone && (phone.length > MAX_LEN.phone || !PHONE_RE.test(phone)))
    return NextResponse.json({ error: "invalid_phone" }, { status: 422 });
  if (message && message.length > MAX_LEN.message)
    return NextResponse.json({ error: "field_too_long", field: "message" }, { status: 422 });

  const lead = {
    name: name.trim(),
    phone: phone?.trim(),
    email: email?.trim(),
    message: message?.trim(),
    campaign: campaign?.trim(),
    source: source?.trim(),
    receivedAt: new Date().toISOString(),
  };

  console.info("[lead]", { name: lead.name, source: lead.source, receivedAt: lead.receivedAt });
  await sendNotification(lead);

  return NextResponse.json({ ok: true }, { status: 201 });
}
