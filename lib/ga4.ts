const GA4_PROPERTY = process.env.GA4_PROPERTY_ID ?? "";
const SCOPES = "https://www.googleapis.com/auth/analytics.readonly";

async function getAccessToken(): Promise<string> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? "";
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not set");
  const sa = JSON.parse(raw) as { client_email: string; private_key: string };

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: sa.client_email,
    scope: SCOPES,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: unknown) =>
    btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const unsigned = `${encode(header)}.${encode(payload)}`;

  const pemBody = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const keyDer = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsigned)
  );

  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const jwt = `${unsigned}.${sigB64}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const { access_token } = await tokenRes.json() as { access_token: string };
  return access_token;
}

export interface GA4Stats {
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

export async function fetchGA4Stats(days = 30): Promise<GA4Stats> {
  const token = await getAccessToken();
  const base = `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY}`;
  const dateRange = { startDate: `${days}daysAgo`, endDate: "today" };

  const [overviewRes, pagesRes, dailyRes, eventsRes, sourcesRes] = await Promise.all([
    fetch(`${base}:runReport`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        dateRanges: [dateRange],
        metrics: [
          { name: "sessions" },
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
        ],
      }),
    }),
    fetch(`${base}:runReport`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        dateRanges: [dateRange],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),
    }),
    fetch(`${base}:runReport`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        dateRanges: [dateRange],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
    }),
    fetch(`${base}:runReport`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        dateRanges: [dateRange],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
        limit: 10,
      }),
    }),
    fetch(`${base}:runReport`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        dateRanges: [dateRange],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 8,
      }),
    }),
  ]);

  const [overview, pages, daily, events, sources] = await Promise.all([
    overviewRes.json() as Promise<{ rows?: { metricValues: { value: string }[] }[] }>,
    pagesRes.json() as Promise<{ rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] }>,
    dailyRes.json() as Promise<{ rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] }>,
    eventsRes.json() as Promise<{ rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] }>,
    sourcesRes.json() as Promise<{ rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] }>,
  ]);

  const ov = overview.rows?.[0]?.metricValues ?? [];

  return {
    sessions: parseInt(ov[0]?.value ?? "0"),
    users: parseInt(ov[1]?.value ?? "0"),
    pageviews: parseInt(ov[2]?.value ?? "0"),
    bounceRate: parseFloat(ov[3]?.value ?? "0") * 100,
    avgSessionDuration: parseFloat(ov[4]?.value ?? "0"),
    topPages: (pages.rows ?? []).map((r) => ({
      page: r.dimensionValues[0].value,
      sessions: parseInt(r.metricValues[0].value),
    })),
    dailySessions: (daily.rows ?? []).map((r) => ({
      date: r.dimensionValues[0].value,
      sessions: parseInt(r.metricValues[0].value),
    })),
    events: (events.rows ?? []).map((r) => ({
      name: r.dimensionValues[0].value,
      events: parseInt(r.metricValues[0].value),
    })) as unknown as { name: string; count: number }[],
    topSources: (sources.rows ?? []).map((r) => ({
      source: r.dimensionValues[0].value,
      sessions: parseInt(r.metricValues[0].value),
    })),
  };
}
