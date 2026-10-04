import { useEffect, useRef, useState } from "react";
import { playClick, playPing } from "../utils/soundFx";
import { DoodleAnnotation } from "./Doodle";

import notePrivate from "../assets/doodles/note-private.png";
import heart01Pink from "../assets/doodles/heart-01-pink.png";
import butterfly02Olive from "../assets/doodles/butterfly-02-olive.png";

const upgrades = [
  {
    number: "01",
    title: "CODING",
    text: "going deeper than just making things work — architecture & intuition",
    progress: "70%",
    fillClass: "fill-blue",
  },
  {
    number: "02",
    title: "STUDIES",
    text: "trying to actually understand, not just survive exam semesters",
    progress: "65%",
    fillClass: "fill-olive",
  },
  {
    number: "03",
    title: "CONTENT",
    text: "finding my voice and becoming fearless at expressing it",
    progress: "80%",
    fillClass: "fill-pink",
  },
  {
    number: "04",
    title: "MYSELF",
    text: "becoming someone I am genuinely proud of",
    progress: "∞",
    width: "100%",
    fillClass: "fill-yellow",
    hasHeart: true,
  },
  {
    number: "05",
    title: "MAKING MY BED",
    text: "some days it happens, some days it doesn't",
    progress: "??%",
    width: "35%",
    fillClass: "fill-grey",
  },
  {
    number: "06",
    title: "SLEEP",
    text: "currently in negotiations with my 2:00 AM thoughts",
    progress: "30%",
    width: "30%",
    fillClass: "fill-lavender",
  },
];

const transmissionChannels = [
  {
    name: "GITHUB",
    handle: "github.com",
    url: "https://github.com",
    symbol: "⌥",
    desc: "Code repositories & open-source projects",
  },
  {
    name: "LINKEDIN",
    handle: "linkedin.com/in",
    url: "https://linkedin.com",
    symbol: "⌁",
    desc: "Academic background & network",
  },
  {
    name: "INSTAGRAM",
    handle: "@gargi",
    url: "https://instagram.com",
    symbol: "◈",
    desc: "Stories, edits & behind the scenes",
  },
  {
    name: "SPOTIFY",
    handle: "Gargi's Loop",
    url: "https://open.spotify.com",
    symbol: "♫",
    desc: "Heavy rotation tracks & soundtrack",
  },
  {
    name: "EMAIL",
    handle: "gargi.dev.os@gmail.com",
    url: "mailto:gargi.dev.os@gmail.com",
    symbol: "✉",
    desc: "Direct transmission & inbox",
  },
];

function Becoming() {
  const [inView, setInView] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [logs, setLogs] = useState([
    { time: "SYS.INIT", text: "TRANSMISSION PORTS OPEN ON LOCALHOST:2004" },
    { time: "STANDBY", text: "LISTENING FOR INCOMING PINGS // 0 PACKETS DROPPED" },
  ]);
  const sectionRef = useRef(null);

  const handleSendPing = () => {
    if (isPinging) return;
    playPing();
    setIsPinging(true);
    const timeNow = new Date().toLocaleTimeString();

    setLogs((prev) => [
      ...prev,
      { time: timeNow, text: "UPLINK REQUEST INITIATED... ROUTING PACKET" },
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), text: "HANDSHAKE CONFIRMED (RTT: 14ms) // HTTP 200 OK" },
      ]);
    }, 450);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          text: 'PAYLOAD RECEIVED: "Hello explorer! Welcome to my digital operating system ✦"',
        },
      ]);
      setIsPinging(false);
    }, 950);
  };

  const handleCopyEmail = () => {
    playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText("gargi.dev.os@gmail.com");
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="becoming" id="becoming" ref={sectionRef}>
      <div className="becoming-inner">
        {/* Editorial label */}
        <div className="becoming-sys-label">
          <span>GARGI.OS / 007</span>
          <span>SYSTEM UPDATE &amp; TRANSMISSION</span>
        </div>

        {/* Top headline block */}
        <div className="becoming-top">
          <div>
            <h2 className="becoming-hero-text">
              STILL FIGURING<br />
              <em>IT OUT.</em>
            </h2>
            <div style={{ marginTop: 20, fontStyle: "italic", fontSize: "15px", color: "rgba(240,237,227,0.6)", lineHeight: 1.6 }}>
              learning.<br />
              making.<br />
              changing.<br />
              trying again.
            </div>
          </div>

          <div className="becoming-note-col">
            <div className="becoming-version">
              <div className="becoming-v-num">0.19</div>
              <div>
                <div className="becoming-v-label">CURRENT BUILD VERSION</div>
                <div className="becoming-status-msg">
                  <span>● STATUS:</span>
                  <strong>STILL BECOMING</strong>
                </div>
              </div>
            </div>

            <div className="becoming-note-private">
              <DoodleAnnotation
                src={notePrivate}
                alt="Handwritten note: keep it private until its permanent"
                width="160px"
                rotate={-2.5}
                opacity={0.8}
                className="becoming-private-note"
              />
            </div>
          </div>
        </div>

        {/* Upgrade / Life Progress list */}
        <div className="upgrade-list">
          {upgrades.map((upgrade) => (
            <article className="upgrade-row" key={upgrade.number}>
              <span className="upgrade-num">{upgrade.number}</span>

              <div className="upgrade-info">
                <h2>
                  {upgrade.title}
                  {upgrade.hasHeart && (
                    <img
                      src={heart01Pink}
                      alt=""
                      className="upgrade-heart-doodle"
                      aria-hidden="true"
                    />
                  )}
                </h2>
                <p>{upgrade.text}</p>
              </div>

              <div className="upgrade-progress">
                <div className="progress-track">
                  <div
                    className={`progress-fill ${upgrade.fillClass}`}
                    style={{
                      width: inView ? (upgrade.width || upgrade.progress) : "0%",
                    }}
                  />
                </div>
                <span className="progress-pct">{upgrade.progress}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Transmission & Contact section */}
        <div className="transmission-block">
          <div className="transmission-header">
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--olive)", marginBottom: 8 }}>
                GARGI.NET // TRANSMISSION CHANNELS
              </div>
              <h3 className="transmission-title">ESTABLISH CONNECTION</h3>
            </div>
            <button
              className="transmission-copy-btn"
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
            >
              {copiedEmail ? "✓ COPIED TO CLIPBOARD" : "✉ COPY EMAIL DIRECT"}
            </button>
          </div>

          <div className="transmission-grid">
            {transmissionChannels.map((channel) => (
              <a
                key={channel.name}
                href={channel.url}
                target="_blank"
                rel="noreferrer"
                className="transmission-card"
              >
                <div className="transmission-card-top">
                  <span className="transmission-symbol">{channel.symbol}</span>
                  <span className="transmission-arrow">↗</span>
                </div>
                <strong className="transmission-name">{channel.name}</strong>
                <span className="transmission-handle">{channel.handle}</span>
                <p className="transmission-desc">{channel.desc}</p>
              </a>
            ))}
          </div>

          {/* Interactive Live Ping Terminal */}
          <div className="ping-terminal">
            <div className="ping-terminal-bar">
              <div className="terminal-dots">
                <span className="t-dot dot-red" />
                <span className="t-dot dot-yellow" />
                <span className="t-dot dot-green" />
              </div>
              <span className="terminal-bar-title">GARGI.OS // NETWORK TELEMETRY &amp; PING CONSOLE</span>
              <button
                className={`ping-trigger-btn ${isPinging ? "is-active" : ""}`}
                onClick={handleSendPing}
                disabled={isPinging}
              >
                {isPinging ? "TRANSMITTING..." : "⚡ TRANSMIT PING"}
              </button>
            </div>

            <div className="ping-log-body">
              {logs.map((log, i) => (
                <div key={i} className="ping-log-row">
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-arrow">&gt;</span>
                  <span className="log-text">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="becoming-footer">
          <span>NO FINAL VERSION AVAILABLE</span>
          <img
            src={butterfly02Olive}
            alt=""
            className="becoming-butterfly-doodle"
            aria-hidden="true"
          />
          <span>UPDATE IN PROGRESS ✦ ALWAYS BECOMING</span>
        </div>
      </div>
    </section>
  );
}

export default Becoming;