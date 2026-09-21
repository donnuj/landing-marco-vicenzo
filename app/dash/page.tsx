"use client";

import { useState, useEffect, useCallback } from "react";

interface Lead {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  source?: string;
  campaign?: string;
  created_at: string;
}

interface GA4Stats {
  sessions: number;
  users: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: { page: string; sessions: number }[];
  dailySessions: { date: string; sessions: number }[];
  events: { name: string; count: number }[];
  topSources: { source: string; sessions: number }[];
}

interface Stats {
  ga4: GA4Stats | null;
  leads: { total: number; recent: Lead[]; bySource: { src: string; count: number }[] };
  days: number;
}

const DAYS_OPTIONS = [7, 14, 30, 60, 90];

function fmt(n: number) { return n.toLocaleString("pt-BR"); }
function fmtDuration(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function DashPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async (d: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dash/stats?days=${d}`);
      if (res.status === 401) { setAuthed(false); return; }
      setStats(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/dash/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { setAuthed(true); setLoginError(false); }
    else setLoginError(true);
  }

  async function logout() {
    await fetch("/api/dash/auth", { method: "DELETE" });
    setAuthed(false);
    setStats(null);
  }

  useEffect(() => {
    if (authed) fetchStats(days);
  }, [authed, days, fetchStats]);

  useEffect(() => {
    fetch(`/api/dash/stats?days=30`).then((r) => {
      if (r.ok) { setAuthed(true); r.json().then((d) => setStats(d as Stats)); }
    });
  }, []);

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#001A4D", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
        <form onSubmit={login} style={{ background: "#0a2060", border: "1px solid #0a3d9e", borderRadius: 8, padding: 40, width: 340 }}>
          <div style={{ color: "#F5A623", fontWeight: 700, fontSize: 11, letterSpacing: 3, marginBottom: 24 }}>MARCO VICENZO — DASHBOARD</div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px 16px", background: "#001A4D", border: loginError ? "1px solid #ef4444" : "1px solid #0a3d9e", borderRadius: 6, color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none" }}
            autoFocus
          />
          {loginError && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 8 }}>Senha incorreta.</p>}
          <button type="submit" style={{ marginTop: 16, width: "100%", padding: "12px", background: "#F5A623", color: "#001A4D", fontWeight: 700, fontSize: 13, letterSpacing: 2, border: "none", borderRadius: 6, cursor: "pointer" }}>
            ENTRAR
          </button>
        </form>
      </div>
    );
  }

  const g = stats?.ga4;
  const l = stats?.leads;

  const maxDaily = Math.max(...(g?.dailySessions.map((d) => d.sessions) ?? [1]), 1);

  return (
    <div style={{ minHeight: "100vh", background: "#001A4D", fontFamily: "Inter, sans-serif", color: "#fff", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ color: "#F5A623", fontWeight: 700, fontSize: 11, letterSpacing: 3, marginBottom: 4 }}>MARCO VICENZO</div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Dashboard da Campanha</h1>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 4 }}>
              {DAYS_OPTIONS.map((d) => (
                <button key={d} onClick={() => setDays(d)} style={{ padding: "6px 12px", fontSize: 12, background: days === d ? "#F5A623" : "#0a2060", color: days === d ? "#001A4D" : "#a0b0c0", border: "1px solid #0a3d9e", borderRadius: 4, cursor: "pointer", fontWeight: days === d ? 700 : 400 }}>
                  {d}d
                </button>
              ))}
            </div>
            <button onClick={() => fetchStats(days)} style={{ padding: "6px 12px", fontSize: 12, background: "#0a2060", color: "#a0b0c0", border: "1px solid #0a3d9e", borderRadius: 4, cursor: "pointer" }}>
              {loading ? "..." : "Atualizar"}
            </button>
            <button onClick={logout} style={{ padding: "6px 12px", fontSize: 12, background: "transparent", color: "#a0b0c0", border: "1px solid #0a3d9e", borderRadius: 4, cursor: "pointer" }}>
              Sair
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { label: "SESSOES", value: g ? fmt(g.sessions) : "—", sub: `${days} dias` },
            { label: "USUARIOS", value: g ? fmt(g.users) : "—", sub: "ativos" },
            { label: "PAGEVIEWS", value: g ? fmt(g.pageviews) : "—", sub: "visualizacoes" },
            { label: "TAXA REJEICAO", value: g ? `${g.bounceRate.toFixed(1)}%` : "—", sub: "bounce rate" },
            { label: "DURACAO MEDIA", value: g ? fmtDuration(g.avgSessionDuration) : "—", sub: "por sessao" },
            { label: "LEADS", value: l ? fmt(l.total) : "—", sub: `${days} dias`, highlight: true },
          ].map((c) => (
            <div key={c.label} style={{ background: c.highlight ? "#0e3a1a" : "#0a2060", border: `1px solid ${c.highlight ? "#0e7c3f" : "#0a3d9e"}`, borderRadius: 8, padding: "20px 16px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: c.highlight ? "#4E9E39" : "#a0b0c0", marginBottom: 8 }}>{c.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: c.highlight ? "#4ade80" : "#fff" }}>{c.value}</div>
              <div style={{ fontSize: 11, color: "#a0b0c0", marginTop: 4 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Grafico de sessoes diarias */}
        {g?.dailySessions && g.dailySessions.length > 0 && (
          <div style={{ background: "#0a2060", border: "1px solid #0a3d9e", borderRadius: 8, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#a0b0c0", marginBottom: 20 }}>SESSOES POR DIA</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80 }}>
              {g.dailySessions.map((d) => (
                <div key={d.date} title={`${d.date}: ${d.sessions} sessoes`} style={{ flex: 1, background: "#1d4ed8", borderRadius: "2px 2px 0 0", height: `${Math.max((d.sessions / maxDaily) * 100, 4)}%`, minWidth: 4, transition: "height 0.3s" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "#a0b0c0" }}>
              <span>{g.dailySessions[0]?.date}</span>
              <span>{g.dailySessions[g.dailySessions.length - 1]?.date}</span>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          {/* Paginas mais visitadas */}
          <div style={{ background: "#0a2060", border: "1px solid #0a3d9e", borderRadius: 8, padding: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#a0b0c0", marginBottom: 16 }}>PAGINAS MAIS VISITADAS</div>
            {(g?.topPages ?? []).map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #0a3d9e", fontSize: 13 }}>
                <span style={{ color: "#cbd5e1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>{p.page || "/"}</span>
                <span style={{ color: "#F5A623", fontWeight: 600 }}>{fmt(p.sessions)}</span>
              </div>
            ))}
          </div>

          {/* Origens de trafego */}
          <div style={{ background: "#0a2060", border: "1px solid #0a3d9e", borderRadius: 8, padding: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#a0b0c0", marginBottom: 16 }}>ORIGENS DE TRAFEGO</div>
            {(g?.topSources ?? []).map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #0a3d9e", fontSize: 13 }}>
                <span style={{ color: "#cbd5e1" }}>{s.source || "direct"}</span>
                <span style={{ color: "#F5A623", fontWeight: 600 }}>{fmt(s.sessions)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          {/* Eventos GA4 */}
          <div style={{ background: "#0a2060", border: "1px solid #0a3d9e", borderRadius: 8, padding: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#a0b0c0", marginBottom: 16 }}>EVENTOS</div>
            {(g?.events ?? []).map((e, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #0a3d9e", fontSize: 13 }}>
                <span style={{ color: "#cbd5e1" }}>{e.name}</span>
                <span style={{ color: "#F5A623", fontWeight: 600 }}>{fmt(e.count)}</span>
              </div>
            ))}
          </div>

          {/* Leads por origem */}
          <div style={{ background: "#0a2060", border: "1px solid #0a3d9e", borderRadius: 8, padding: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#a0b0c0", marginBottom: 16 }}>LEADS POR ORIGEM</div>
            {(l?.bySource ?? []).map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #0a3d9e", fontSize: 13 }}>
                <span style={{ color: "#cbd5e1" }}>{s.src}</span>
                <span style={{ color: "#4ade80", fontWeight: 600 }}>{fmt(s.count)}</span>
              </div>
            ))}
            {(!l?.bySource || l.bySource.length === 0) && (
              <p style={{ color: "#a0b0c0", fontSize: 13 }}>Nenhum lead ainda.</p>
            )}
          </div>
        </div>

        {/* Tabela de leads recentes */}
        <div style={{ background: "#0a2060", border: "1px solid #0a3d9e", borderRadius: 8, padding: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#a0b0c0", marginBottom: 16 }}>LEADS RECENTES</div>
          {(!l?.recent || l.recent.length === 0) ? (
            <p style={{ color: "#a0b0c0", fontSize: 13 }}>Nenhum lead registrado ainda.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    {["Nome", "Telefone", "Email", "Origem", "Data"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#a0b0c0", fontSize: 11, letterSpacing: 1, borderBottom: "1px solid #0a3d9e" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {l.recent.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: "1px solid #0a3d9e" }}>
                      <td style={{ padding: "10px 12px", color: "#fff" }}>{lead.name}</td>
                      <td style={{ padding: "10px 12px", color: "#cbd5e1" }}>{lead.phone ? <a href={`https://wa.me/55${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" style={{ color: "#4ade80", textDecoration: "none" }}>{lead.phone}</a> : "—"}</td>
                      <td style={{ padding: "10px 12px", color: "#cbd5e1" }}>{lead.email ?? "—"}</td>
                      <td style={{ padding: "10px 12px", color: "#a0b0c0" }}>{lead.source ?? lead.campaign ?? "—"}</td>
                      <td style={{ padding: "10px 12px", color: "#a0b0c0", whiteSpace: "nowrap" }}>{fmtDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
