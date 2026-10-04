import { useState } from "react";
import { playClick, playOpen } from "../utils/soundFx";
import { DoodleAnnotation } from "./Doodle";

import hourglassDark from "../assets/doodles/hourglass-sketch-dark.png";
import skullLight    from "../assets/doodles/skull-sketch.png";
import gitWorkshop   from "../assets/doodles/git-workshop.png";
import spideyRules   from "../assets/doodles/spidey-rules.png";

const studyModules = [
  { name: "Data Structures & Algorithms", progress: "88%", code: "CSE2001", fillClass: "obs-bar-fill-blue" },
  { name: "Computer Architecture & Logic", progress: "74%", code: "CSE2002", fillClass: "obs-bar-fill-olive" },
  { name: "Discrete Math & Graph Theory",  progress: "92%", code: "MAT2001", fillClass: "obs-bar-fill-lavender" },
  { name: "Japanese Language (N5)",         progress: "65%", code: "FLA1001", fillClass: "obs-bar-fill-olive" },
];

function Obsessions() {
  const [active, setActive] = useState(null);

  const handleMusicBtn = (e) => {
    e.stopPropagation();
    playClick();
    window.dispatchEvent(new CustomEvent("gargi:toggle-music"));
  };

  const toggle = (key) => {
    playOpen();
    setActive((p) => (p === key ? null : key));
  };

  return (
    <section className="obsessions" id="obsessions">
      <div className="obsessions-inner">

        {/* Header */}
        <div className="obsessions-header-row">
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em",
                          color:"rgba(30,28,20,0.4)", marginBottom:10 }}>
              GARGI.OS / 006 — CURRENT STATUS
            </div>
            <h2 className="obsessions-title">
              CURRENTLY<br />
              <em>OBSESSED WITH.</em>
            </h2>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:12,
                        fontFamily:"var(--font-mono)", fontSize:"9px",
                        color:"rgba(30,28,20,0.4)", letterSpacing:"0.14em" }}>
            <DoodleAnnotation
              src={hourglassDark}
              alt="hourglass sketch"
              width="44px"
              rotate={6}
              opacity={0.65}
            />
            <span>4 CHANNELS MONITORED</span>
          </div>
        </div>

        {/* Bento status board */}
        <div className="obsessions-board">

          {/* 01 MUSIC */}
          <div
            className="obsession-deck obs-dark obs-col-3"
            onClick={() => toggle("music")}
          >
            <div className="obsession-deck-inner">
              <div className="obs-deck-header">
                <span className="obs-symbol sym-blue">♫</span>
                <span className="obs-status-badge">PLAYING ON LOOP</span>
              </div>
              <div className="obs-title">MUSIC</div>
              <div className="obs-subtitle">Heavy rotation & procedural lofi chords</div>

              <div className="obs-detail">
                {active === "music" ? (
                  <>
                    <div className="obs-vinyl">
                      <span className="obs-vinyl-dot" />
                    </div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)", lineHeight:1.6, marginBottom:12 }}>
                      "Over-ear headphones on = instant hyperfocus mode."
                    </div>
                    <button className="obs-music-btn" onClick={handleMusicBtn}>
                      ▶ TOGGLE PROCEDURAL LOFI
                    </button>
                    <div style={{ marginTop:14 }}>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px",
                                    letterSpacing:"0.14em", color:"rgba(255,255,255,0.25)",
                                    marginBottom:6 }}>AUDIO PROFILE</div>
                      <div className="deck-mini-bars">
                        <span className="mini-bar b1" />
                        <span className="mini-bar b2" />
                        <span className="mini-bar b3" />
                        <span className="mini-bar b4" />
                        <span className="mini-bar b5" />
                      </div>
                      <img src={spideyRules} alt="" className="deck-spidey-doodle"
                           style={{ marginTop:10 }} aria-hidden="true" />
                    </div>
                  </>
                ) : (
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px",
                                color:"rgba(255,255,255,0.2)", letterSpacing:"0.12em",
                                marginTop:12 }}>
                    TAP TO EXPAND ↗
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 02 STUDIES */}
          <div
            className="obsession-deck obs-olive obs-col-5"
            onClick={() => toggle("studies")}
          >
            <div className="obsession-deck-inner">
              <div className="obs-deck-header">
                <span className="obs-symbol sym-yellow">✎</span>
                <span className="obs-status-badge">LOCKED IN</span>
              </div>
              <div className="obs-title">STUDIES</div>
              <div className="obs-subtitle">VIT CSE Coursework & Japanese N5</div>

              {active === "studies" && (
                <div className="obs-detail">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                                marginBottom:16, marginTop:12 }}>
                    <div>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px",
                                    letterSpacing:"0.16em", opacity:0.7 }}>
                        VIT CSE 2ND YEAR
                      </div>
                      <div style={{ fontWeight:700, fontSize:14 }}>Academic Modules</div>
                    </div>
                    <div>
                      <img src={gitWorkshop} alt="" className="deck-git-doodle" aria-hidden="true" />
                      <span className="streak-badge" style={{ display:"block", marginTop:6 }}>🔥 42-DAY STREAK</span>
                    </div>
                  </div>
                  {studyModules.map((m) => (
                    <div key={m.code} className="obs-module">
                      <div className="obs-module-header">
                        <span>{m.code}</span>
                        <span>{m.progress}</span>
                      </div>
                      <div style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.7)",
                                    marginBottom:5 }}>{m.name}</div>
                      <div className="obs-bar-track">
                        <div className={`obs-bar-fill ${m.fillClass}`} style={{ width: m.progress }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 03 CONTENT */}
          <div
            className="obsession-deck obs-blue obs-col-4"
            onClick={() => toggle("content")}
          >
            <div className="obsession-deck-inner">
              <div className="obs-deck-header">
                <span className="obs-symbol sym-pink">▶</span>
                <span className="obs-status-badge">MAKING SOMETHING</span>
              </div>
              <div className="obs-title">CONTENT</div>
              <div className="obs-subtitle">Reels, Dramatics Club & Film Society</div>

              {active === "content" && (
                <div className="obs-detail" style={{ marginTop:14 }}>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px",
                                letterSpacing:"0.16em", color:"rgba(255,255,255,0.4)",
                                marginBottom:10 }}>
                    STORYTELLING LAB / 3-BEAT STRUCTURE
                  </div>
                  <div className="storyboard-timeline">
                    {[
                      ["00:00–00:05", "01 / THE HOOK", "\"The single line of CSS that ruined my Friday.\""],
                      ["00:05–00:35", "02 / THE CHAOS", "Cafeteria espresso, debugging logs, questioning life."],
                      ["00:35–00:55", "03 / RESOLUTION", "Missing semicolon. Unexpected triumph. Post and move on."],
                    ].map(([time, label, text]) => (
                      <div key={label} className="storyboard-node">
                        <span className="node-time">{time}</span>
                        <strong style={{ display:"block", fontSize:11, marginBottom:3 }}>{label}</strong>
                        <span style={{ fontSize:11, opacity:0.65 }}>{text}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:12 }}>
                    {["VIT FILM SOCIETY", "DRAMATICS", "TECH HUMOR"].map((p) => (
                      <span key={p} className="c-pill">{p}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 04 SLEEP */}
          <div
            className="obsession-deck obs-paper obs-col-3"
            onClick={() => toggle("sleep")}
          >
            <div className="obsession-deck-inner">
              <div className="obs-deck-header">
                <span className="obs-symbol" style={{ color:"var(--red-dark)" }}>zzz</span>
                <span className="obs-status-badge">WE NEED TO TALK</span>
              </div>
              <div className="obs-title" style={{ color:"var(--black)" }}>SLEEP</div>
              <div className="obs-subtitle">Negotiating with brain at 2:00 AM</div>

              {active === "sleep" && (
                <div className="obs-detail" style={{ marginTop:14 }}>
                  <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                    <img src={skullLight} alt="" className="sleep-skull-doodle"
                         style={{ filter:"invert(1) opacity(0.5)" }} aria-hidden="true" />
                    <div>
                      <div className="obs-gauge-big">4.5h</div>
                      <div className="obs-gauge-sub" style={{ color:"rgba(0,0,0,0.4)" }}>AVERAGE REST</div>
                    </div>
                  </div>
                  <div style={{ marginTop:12, fontSize:12, fontStyle:"italic",
                                color:"rgba(30,28,20,0.6)", lineHeight:1.5 }}>
                    "Midnight epiphany generator running at peak efficiency."
                  </div>
                  <div style={{ marginTop:10, fontFamily:"var(--font-mono)", fontSize:"9px",
                                color:"rgba(30,28,20,0.4)", letterSpacing:"0.1em" }}>
                    PROPOSED FIX: chamomile tea + turn thoughts off
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Ticker */}
        <div className="ticker">
          <div className="ticker-track">
            MUSIC ✦ STUDIES ✦ CONTENT ✦ SLEEP ✦ MUSIC ✦ STUDIES ✦ CONTENT ✦ SLEEP ✦ MUSIC ✦ STUDIES ✦ CONTENT ✦ SLEEP ✦ &nbsp;
            MUSIC ✦ STUDIES ✦ CONTENT ✦ SLEEP ✦ MUSIC ✦ STUDIES ✦ CONTENT ✦ SLEEP ✦ MUSIC ✦ STUDIES ✦ CONTENT ✦ SLEEP ✦
          </div>
        </div>
      </div>
    </section>
  );
}

export default Obsessions;
