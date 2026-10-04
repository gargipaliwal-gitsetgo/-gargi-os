import { DoodleAnnotation } from "./Doodle";
import engineeringExpress from "../assets/doodles/engineering-express.png";
import portraitEye    from "../assets/doodles/portrait-eye.png";
import ribcage        from "../assets/doodles/ribcage.png";
import runningFigures from "../assets/doodles/running-figures.png";
import cseOperations  from "../assets/doodles/cse-operations.png";

const creations = [
  {
    number: "01",
    type: "CS PROJECT",
    title: "QUICKBITE",
    description: "A food ordering project where code meets something I actually love — food.",
    tags: ["PYTHON", "PROJECT"],
    accent: "var(--olive)",
  },
  {
    number: "02",
    type: "AI / CS",
    title: "AI WASTE DETECTION",
    description: "A project exploring how technology can help identify and manage waste.",
    tags: ["AI", "COMPUTER VISION"],
    accent: "var(--blue)",
  },
  {
    number: "03",
    type: "DESIGN",
    title: "DIGITAL POSTERS",
    description: "Posters made because apparently I can't attend an event without wanting to redesign it.",
    tags: ["DESIGN", "FILM SOCIETY"],
    accent: "var(--pink)",
  },
  {
    number: "04",
    type: "CONTENT",
    title: "REELS",
    description: "Random thoughts, jokes, edits, yapping and whatever else I feel like posting.",
    tags: ["CONTENT", "EDITING"],
    accent: "var(--red)",
  },
  {
    number: "05",
    type: "ART",
    title: "SKETCHES",
    description: "Little pencil drawings that started as random doodles and somehow became actual art.",
    tags: ["PENCIL", "ART"],
    accent: "var(--yellow)",
  },
  {
    number: "06",
    type: "INTERNET",
    title: "PINTEREST",
    description: "Tiny pieces of visual inspiration I've collected and created along the way.",
    tags: ["VISUALS", "MOOD"],
    accent: "var(--lavender)",
  },
];

function Made({ onSelectProject }) {
  return (
    <section className="made" id="made">
      <div className="made-inner">

        {/* Floating doodles behind everything */}
        <div style={{ position:"absolute", top:60, right:"2%", opacity:0.16, transform:"rotate(-6deg)",
                      pointerEvents:"none", zIndex:0 }} aria-hidden="true">
          <img src={ribcage} alt="" style={{ width:260 }} />
        </div>
        <div style={{ position:"absolute", top:"38%", left:"1%", opacity:0.32, transform:"rotate(-8deg)",
                      pointerEvents:"none", zIndex:0 }} aria-hidden="true">
          <img src={portraitEye} alt="" style={{ width:120 }} />
        </div>
        <div style={{ position:"absolute", bottom:"22%", right:"2%", opacity:0.28, transform:"rotate(8deg)",
                      pointerEvents:"none", zIndex:0 }} aria-hidden="true">
          <img src={runningFigures} alt="" style={{ width:130 }} />
        </div>
        <div style={{ position:"absolute", bottom:"8%", right:"8%", opacity:0.26, transform:"rotate(-4deg)",
                      pointerEvents:"none", zIndex:0 }} aria-hidden="true">
          <img src={cseOperations} alt="" style={{ width:140 }} />
        </div>

        {/* Header */}
        <div className="made-top">
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em",
                          color:"rgba(255,255,255,0.2)", marginBottom:10 }}>
              GARGI.OS / 005 — THINGS I'VE MADE
            </div>
            <h2 className="made-title">
              I DON&apos;T JUST<br />
              HAVE IDEAS.<br />
              <em>I MAKE THEM.</em>
            </h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
            <span className="made-count-badge">6 PROJECTS</span>
            <DoodleAnnotation
              src={engineeringExpress}
              alt="hand-drawn engineering express"
              width="110px"
              rotate={2}
              opacity={0.55}
            />
          </div>
        </div>

        {/* Project list */}
        <div className="creation-list">
          {creations.map((c) => (
            <article
              key={c.number}
              className="creation-card"
              onClick={() => onSelectProject?.(c)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelectProject?.(c)}
              title={`Inspect ${c.title}`}
            >
              <div className="creation-orbital" />

              <span className="creation-number" style={{ color: c.accent }}>
                {c.number}
              </span>

              <div className="creation-main">
                <span className="creation-type">{c.type}</span>
                <h2>{c.title}</h2>
                <p>{c.description}</p>
                <div className="creation-tags">
                  {c.tags.map((t) => (
                    <span key={t} className="creation-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="creation-meta">
                <span className="creation-status">INSPECT / 0{c.number}</span>
                <span className="creation-arrow">↗</span>
              </div>
            </article>
          ))}
        </div>

        <div className="made-footer-bar">
          <span>STILL MAKING</span>
          <span>MORE COMING SOON ✦</span>
        </div>
      </div>
    </section>
  );
}

export default Made;