import { useEffect, useState } from "react";
import {
  isSfxEnabled,
  playClick,
  subscribeSfx,
  toggleSfx,
} from "../utils/soundFx";

const SECTIONS = [
  { id: "hero", num: "001", name: "HERO" },
  { id: "about", num: "002", name: "ABOUT" },
  { id: "loves", num: "003", name: "LOVES" },
  { id: "things", num: "004", name: "DO" },
  { id: "made", num: "005", name: "MADE" },
  { id: "obsessions", num: "006", name: "STATUS" },
  { id: "becoming", num: "007", name: "UPDATE" },
];

function OSDock({
  activeSection,
  onOpenPalette,
  isPlayingMusic,
  onToggleMusic,
  isCrtMode,
  onToggleCrt,
}) {
  const [time, setTime] = useState("");
  const [sfxActive, setSfxActive] = useState(isSfxEnabled());

  useEffect(() => {
    const unsub = subscribeSfx((state) => setSfxActive(state));
    return unsub;
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="os-dock" aria-label="GARGI.OS Navigation Dock">
      {/* LEFT — OS STATUS */}
      <div className="dock-status">
        <span className="dock-pulse-dot" />
        <span className="dock-brand">GARGI.OS</span>
        <span className="dock-time">{time}</span>
      </div>

      {/* CENTER — SECTION NAVIGATION (001 ... 007) */}
      <div className="dock-modules">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`dock-mod-btn ${isActive ? "active" : ""}`}
              title={`${sec.num} — ${sec.name}`}
            >
              <span>{sec.num}</span>
            </button>
          );
        })}
      </div>

      {/* RIGHT — SYSTEM UTILITIES */}
      <div className="dock-actions">
        {/* CRT FILTER */}
        <button
          onClick={() => {
            playClick();
            onToggleCrt?.();
          }}
          className={`dock-tool-btn ${isCrtMode ? "active" : ""}`}
          title={isCrtMode ? "Disable Retro CRT Filter" : "Enable Retro CRT Filter"}
        >
          <span className="dock-btn-text">{isCrtMode ? "CRT ON" : "CRT"}</span>
        </button>

        {/* SFX SOUNDS */}
        <button
          onClick={() => toggleSfx()}
          className={`dock-tool-btn ${sfxActive ? "active" : ""}`}
          title={sfxActive ? "Mute Procedural Audio" : "Enable Procedural Audio"}
        >
          <span className="dock-btn-text">{sfxActive ? "SFX 🔊" : "SFX 🔇"}</span>
        </button>

        {/* COMMAND PALETTE */}
        <button
          onClick={() => {
            playClick();
            onOpenPalette();
          }}
          className="dock-tool-btn"
          title="Open System Command Palette (Ctrl+K)"
        >
          <span className="dock-key-badge">⌘K</span>
          <span className="dock-btn-text">CLI</span>
        </button>

        {/* AMBIENT MUSIC */}
        <button
          onClick={() => {
            playClick();
            onToggleMusic();
          }}
          className={`dock-tool-btn ${isPlayingMusic ? "playing" : ""}`}
          title={isPlayingMusic ? "Stop Procedural Lofi" : "Play Procedural Lofi"}
        >
          <span className="dock-music-bars">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </span>
          <span className="dock-btn-text">{isPlayingMusic ? "LOFI" : "LOFI"}</span>
        </button>
      </div>
    </nav>
  );
}

export default OSDock;