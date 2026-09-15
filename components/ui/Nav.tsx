"use client";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/config";

const links = [
  { href: "#quem-e", label: "Quem é" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#propostas", label: "Propostas" },
  { href: "#imprensa", label: "Imprensa" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#001A4D] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2" aria-label="Dr. Marco Vicenzo">
          <span
            className="font-display text-white text-xl font-bold tracking-wider"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.25rem", letterSpacing: "0.08em" }}
          >
            DR. VICENZO
          </span>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-sm"
            style={{ background: "#F5A623", color: "#001A4D", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}
          >
            55.678
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={siteConfig.whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-bold rounded-sm transition-colors"
            style={{ background: "#4E9E39", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
          >
            WHATSAPP
          </a>
        </nav>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
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
        <div className="md:hidden bg-[#001A4D] border-t border-white/10 px-4 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-white/80 hover:text-white text-base font-medium border-b border-white/10 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href={siteConfig.whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center py-3 font-bold rounded-sm"
            style={{ background: "#4E9E39", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            WHATSAPP
          </a>
        </div>
      )}
    </header>
  );
}
