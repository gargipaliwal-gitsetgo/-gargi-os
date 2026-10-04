import { useState } from "react";
import { FloatingDoodle } from "./Doodle";

import eye01Blue        from "../assets/doodles/eye-01-blue.png";
import butterfly01Pink  from "../assets/doodles/butterfly-01-pink.png";
import butterfly02Olive from "../assets/doodles/butterfly-02-olive.png";
import spideyWebDark    from "../assets/doodles/spidey-web.png";
import starsClusterYellow from "../assets/doodles/stars-cluster-yellow.png";
import spideyRulesRed   from "../assets/doodles/spidey-rules-red.png";

function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <main
      className="hero"
      id="hero"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setMouse({ x, y });
      }}
    >
      {/* 90s Editorial Top Header Bar */}
      <div className="hero-sys-bar">
        <span>GARGI.OS / 001 — VOL. XIX</span>
        <span>CSE • CREATIVE • CHAOS</span>
        <span>STILL FIGURING IT OUT</span>
      </div>

      {/* ── Magazine Cover Corner Badges (Y2K / Editorial) ── */}
      <div
        style={{
          position: "absolute",
          top: "calc(var(--nav-h) + 48px)",
          left: "36px",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.3)",
          lineHeight: 1.5,
          pointerEvents: "none",
          zIndex: 4,
        }}
        className="hero-magazine-meta-left"
      >
        <span style={{ color: "var(--olive)" }}>[ARCHIVE: 2024–2026]</span><br />
        SYSTEM: GARGI.EXE<br />
        VIT CHENNAI // CSE
      </div>

      <div
        style={{
          position: "absolute",
          top: "calc(var(--nav-h) + 48px)",
          right: "36px",
          textAlign: "right",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.3)",
          lineHeight: 1.5,
          pointerEvents: "none",
          zIndex: 4,
        }}
        className="hero-magazine-meta-right"
      >
        <span style={{ color: "var(--pink)" }}>✦ SPECIAL ISSUE</span><br />
        GENRE: EDITORIAL TECH<br />
        LAT: 12.9692° N
      </div>

      {/* ── Floating Doodle Layer (Scrapbook scanned drawings) ── */}
      <div className="hero-doodle-layer" aria-hidden="true">

        {/* Large signature eye behind title */}
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            transform: `translate(calc(-50% + ${mouse.x * -18}px), calc(-50% + ${mouse.y * -18}px)) rotate(-4deg)`,
            transition: "transform 0.22s cubic-bezier(0.2,0.8,0.2,1)",
            width: "min(480px, 70vw)",
            opacity: 0.22,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <img src={eye01Blue} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>

        {/* Pink butterfly — upper right */}
        <FloatingDoodle
          src={butterfly01Pink}
          alt=""
          mouseX={mouse.x} mouseY={mouse.y}
          speed={22} opacity={0.88} width="100px" rotate={12}
          style={{ top: "20%", right: "8%" }}
        />

        {/* Olive butterfly — lower left */}
        <FloatingDoodle
          src={butterfly02Olive}
          alt=""
          mouseX={mouse.x} mouseY={mouse.y}
          speed={-18} opacity={0.75} width="85px" rotate={-14}
          style={{ bottom: "22%", left: "6%" }}
        />

        {/* Spidey web — upper right corner */}
        <FloatingDoodle
          src={spideyWebDark}
          alt=""
          mouseX={mouse.x} mouseY={mouse.y}
          speed={10} opacity={0.55} width="125px" rotate={6}
          style={{ top: "16%", right: "3%" }}
        />

        {/* Stars cluster — upper left */}
        <FloatingDoodle
          src={starsClusterYellow}
          alt=""
          mouseX={mouse.x} mouseY={mouse.y}
          speed={-14} opacity={0.72} width="90px" rotate={10}
          style={{ top: "24%", left: "5%" }}
        />

        {/* Spidey rules note — lower right */}
        <FloatingDoodle
          src={spideyRulesRed}
          alt=""
          mouseX={mouse.x} mouseY={mouse.y}
          speed={8} opacity={0.7} width="130px" rotate={3}
          style={{ bottom: "14%", right: "6%" }}
        />
      </div>

      {/* ── Main Editorial Composition ── */}
      <div className="hero-main">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          <span>GARGI.OS // 001</span>
          <span className="hero-eyebrow-dot" style={{ background: "var(--red)" }} />
        </div>

        <h1 className="hero-title">
          {"GARGI".split("").map((letter, i) => (
            <span
              key={`${letter}-${i}`}
              className="hero-letter"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <div className="hero-subtitle-block">
          <p className="hero-tagline">
            I make things because<br />
            I can&apos;t stop having ideas.
          </p>
          <p className="hero-handwritten-note">
            — CSE student / creative brain / professional overthinker
          </p>
        </div>

        <button
          className="enter-btn"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          onMouseMove={(e) => {
            const btn = e.currentTarget;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            btn.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
          }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
        >
          ENTER MY WORLD →
        </button>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="hero-bottom-bar">
        <div className="hero-scroll-hint">
          <span>scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <span style={{ opacity: 0.6 }}>BARCODE: ||| | |||| || |</span>
          <span>v0.19</span>
        </div>
      </div>

      {/* ── Floating scrapbook notes (non-parallax) ── */}
      <div
        style={{
          position: "absolute",
          top: "34%",
          left: "3%",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "rgba(124,143,85,0.65)",
          transform: "rotate(-8deg)",
          pointerEvents: "none",
          zIndex: 4,
          lineHeight: 1.4,
        }}
        aria-hidden="true"
      >
        music<br/>is<br/>therapy ♫
      </div>
    </main>
  );
}

export default Hero;