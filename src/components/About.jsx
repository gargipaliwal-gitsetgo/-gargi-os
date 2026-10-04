import gargiPhoto from "../assets/gargi-about.jpg";
import { DoodleAnnotation } from "./Doodle";

import heart01Pink    from "../assets/doodles/heart-01-pink.png";
import handHennaOrange from "../assets/doodles/hand-henna-orange.png";
import nonchalantLavender from "../assets/doodles/nonchalant-lavender.png";
import cuteDuo        from "../assets/doodles/cute-duo.png";

const chips = [
  { text: "KIND",       color: "chip-pink"    },
  { text: "CURIOUS",    color: "chip-blue"    },
  { text: "CHAOTIC",    color: "chip-red"     },
  { text: "EXPRESSIVE", color: "chip-lavender"},
  { text: "OBSESSED",   color: "chip-yellow"  },
  { text: "TENACIOUS",  color: "chip-olive"   },
];

const statusItems = [
  { key: "LOCATION",  val: "VIT Vellore" },
  { key: "YEAR",      val: "2nd Year CSE" },
  { key: "STATUS",    val: "● ONLINE" },
  { key: "BUILD",     val: "v0.19.dev" },
];

function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">

        {/* Section header */}
        <div className="about-sys-label">
          GARGI.OS / 002 &nbsp;—&nbsp; WHO IS THIS?
        </div>

        {/* ── Bento grid ── */}
        <div className="about-bento">

          {/* Card 1: intro text */}
          <div className="about-card-intro">
            {/* Tape decoration */}
            <div style={{
              position:"absolute", top:-8, left:40,
              width:44, height:15, background:"rgba(227,195,84,0.55)",
              borderRadius:2, transform:"rotate(-2deg)"
            }} aria-hidden="true" />

            <div style={{ position:"relative", zIndex:2 }}>
              <h2 className="about-heading">
                Hi.<br />
                I'm <em>Gargi.</em>
              </h2>

              <div className="about-intro-text">
                <p>
                  CSE student who somehow ended up being equally obsessed
                  with code, pencil sketches, movies, music, making people
                  laugh and creating things that didn&apos;t necessarily need to exist.
                </p>
                <p>
                  I&apos;m still figuring out what I&apos;m going to become. But I know
                  I want to keep learning, creating, expressing myself and
                  making things I&apos;m proud of.
                </p>
              </div>

              {/* Lavender lettering accent */}
              <div style={{ marginTop: 20 }}>
                <DoodleAnnotation
                  src={nonchalantLavender}
                  alt="hand-lettered annotation"
                  width="180px"
                  rotate={-3}
                  opacity={0.85}
                />
              </div>
            </div>

            {/* Heart doodle pinned to corner */}
            <img
              src={heart01Pink}
              alt=""
              className="about-doodle-heart"
              aria-hidden="true"
            />

            {/* Pointing hand */}
            <img
              src={handHennaOrange}
              alt=""
              className="about-doodle-hand"
              aria-hidden="true"
            />
          </div>

          {/* Card 2: Photo */}
          <div className="about-card-photo">
            <img
              src={gargiPhoto}
              alt="Gargi"
              className="about-photo-img"
            />
            <div className="about-photo-label">GARGI.ID // 002</div>

            {/* Cute duo pinned to photo */}
            <div style={{
              position:"absolute", bottom:-24, right:-18,
              zIndex:5, transform:"rotate(5deg)"
            }} aria-hidden="true">
              <DoodleAnnotation
                src={cuteDuo}
                alt="hand-drawn duo sketch"
                width="140px"
                rotate={0}
                opacity={0.85}
              />
            </div>
          </div>

          {/* Card 3: Personality chips */}
          <div className="about-card-chips">
            <span className="chip-label">PERSONALITY.EXE →</span>
            {chips.map((c, i) => (
              <span
                key={c.text}
                className={`personality-chip ${c.color}`}
                style={{
                  transform: `rotate(${[-2,3,-4,2,-3,4][i]}deg)`,
                  display:"inline-block"
                }}
              >
                {c.text}
              </span>
            ))}
          </div>

          {/* Card 4: Scrapbook note */}
          <div className="about-card-note">
            <div className="about-note-tape" aria-hidden="true" />
            <p className="about-note-text">
              &ldquo;I&apos;m a work in progress. Always.
              But at least I&apos;m interesting work in progress.&rdquo;
            </p>
            <p className="about-note-sig">— a work in progress always ♥</p>
          </div>

          {/* Card 5: Status */}
          <div className="about-card-status">
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px",
                          letterSpacing:"0.2em", color:"rgba(255,255,255,0.2)",
                          marginBottom:12 }}>
              SYSTEM / PROFILE
            </div>
            {statusItems.map((s) => (
              <div className="about-status-item" key={s.key}>
                <span className="about-status-key">{s.key}</span>
                <span className="about-status-val">{s.val}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;