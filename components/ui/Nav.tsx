"use client";
import { useState } from "react";
import { siteConfig } from "@/lib/config";

const links = [
  { href: "#quem-e", label: "Quem é" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#propostas", label: "Propostas" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 dark:border-white/10" style={{ background: "var(--bg-surface)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-1">
          <span
            className="font-black tracking-tight"
            style={{ color: "#0e7c3f", fontSize: "17px" }}
          >
            DR. MARCO
          </span>
          <span
            className="font-black tracking-tight ml-1"
            style={{ color: "#D2540B", fontSize: "17px" }}
          >
            VICENZO
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[12px] font-bold text-zinc-400 uppercase tracking-widest">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-zinc-700 transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href={siteConfig.whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-bold px-5 py-2 rounded text-white transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: "#0e7c3f" }}
          >
            WHATSAPP
          </a>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ color: "#0e7c3f" }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            {open ? (
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-100 dark:border-white/10 px-4 pb-4" style={{ background: "var(--bg-surface)" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-sm font-medium border-b border-zinc-100 dark:border-white/10 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href={siteConfig.whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center py-3 font-bold rounded text-sm text-white"
            style={{ background: "#0e7c3f" }}
          >
            WHATSAPP
          </a>
        </div>
      )}
    </header>
  );
}
