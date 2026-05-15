import React, { useState } from "react";
import ParticleCanvas from "./ParticleCanvas";

function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#journey", label: "Journey" },
    { href: "#craft", label: "Craft" },
    { href: "#products", label: "Products" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container flex items-center justify-between py-5 md:py-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-yellow-700/90 flex items-center justify-center text-xs font-medium">
            S
          </div>
          <div className="text-beige/90 font-semibold tracking-wide">
            Saffrona
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 uppercase text-sm tracking-widest text-beige/70">
          {navLinks.map((l) => (
            <a key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#origin"
            className="btn-glow"
            style={{
              padding: "0.6rem 1rem",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            Origin Story
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 z-50 relative"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-beige/80 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-beige/80 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-beige/80 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-30 transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
        style={{
          background: "rgba(11,10,9,0.92)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          className="flex flex-col items-center justify-center h-full gap-10"
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="uppercase tracking-[0.25em] text-2xl text-beige/85 hover:text-[#D8A700] transition-colors duration-200"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#origin"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-3 rounded-full border border-beige/20 text-beige/70 tracking-widest uppercase text-sm hover:border-[#D8A700]/40 hover:text-[#D8A700] transition-all duration-200"
          >
            Origin Story
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children, particleRef }) {
  return (
    <div className="min-h-screen relative bg-earth spotlight grain">
      <SiteNav />
      {children}
      <div className="canvas-overlay">
        <ParticleCanvas ref={particleRef} />
      </div>
    </div>
  );
}
