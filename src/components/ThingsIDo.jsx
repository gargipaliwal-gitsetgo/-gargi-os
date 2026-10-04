import { useState } from "react";
import DoodlePad from "./DoodlePad";
import { DoodleAnnotation } from "./Doodle";

import dateSunday     from "../assets/doodles/date-sunday.png";
import japaneseHiragana from "../assets/doodles/japanese-hiragana.png";
import doodleMandala  from "../assets/doodles/doodle-mandala.png";
import cuteFlameEye   from "../assets/doodles/cute-flame-eye.png";
import laptopSketch   from "../assets/doodles/laptop-sketch.png";

const things = [
  { number:"01", title:"BRAIN DUMP",      desc:"writing whatever is living rent-free in my head",    symbol:"✎", sym:"sym-orange", skin:"thing-dark",    col:"thing-col-4" },
  { number:"02", title:"DOODLE",          desc:"random pencil marks that somehow become something",   symbol:"✦", sym:"sym-yellow", skin:"thing-paper",   col:"thing-col-4", clickable: true },
  { number:"03", title:"SKETCH",          desc:"turning ideas into things I can actually see",        symbol:"⌁", sym:"sym-blue",   skin:"thing-dark",    col:"thing-col-4", clickable: true },
  { number:"04", title:"DANCE",           desc:"usually when nobody asked",                           symbol:"↯", sym:"sym-pink",   skin:"thing-olive",   col:"thing-col-3" },
  { number:"05", title:"MAKE REELS",      desc:"yapping, editing and posting whatever I want",       symbol:"▶", sym:"sym-red",    skin:"thing-dark",    col:"thing-col-3" },
  { number:"06", title:"LEARN JAPANESE",  desc:"somewhere between こんにちは and chaos",               symbol:"あ", sym:"sym-lavender",skin:"thing-lavender",col:"thing-col-3", wide:true },
  { number:"07", title:"CODE",            desc:"building things and figuring out why they broke",    symbol:"</>", sym:"sym-olive", skin:"thing-blue",   col:"thing-col-3" },
  { number:"08", title:"WATCH MOVIES",    desc:"one episode quickly becomes the entire season",      symbol:"◉", sym:"sym-purple", skin:"thing-dark",    col:"thing-col-4" },
  { number:"09", title:"STUDY",           desc:"trying to become the version of me I imagine",       symbol:"∞", sym:"sym-blue",   skin:"thing-dark",    col:"thing-col-4" },
  { number:"10", title:"CREATE",          desc:"because apparently having ideas isn't optional",     symbol:"✧", sym:"sym-pink",   skin:"thing-olive",   col:"thing-col-4" },
];

function ThingsIDo() {
  const [isDoodleOpen, setIsDoodleOpen] = useState(false);

  return (
    <section className="things" id="things">
      <DoodlePad isOpen={isDoodleOpen} onClose={() => setIsDoodleOpen(false)} />

      <div className="things-inner">
        {/* Header */}
        <div className="things-header-row">
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em",
                          color:"rgba(255,255,255,0.2)", marginBottom:10 }}>
              GARGI.OS / 004 — THINGS I DO
            </div>
            <h2 className="things-title">
              WHAT HAPPENS<br />
              WHEN I&apos;M NOT<br />
              <em>OVERTHINKING.</em>
            </h2>
          </div>

          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:12 }}>
            <button
              className="things-doodle-trigger"
              onClick={() => setIsDoodleOpen(true)}
            >
              ✎ OPEN DOODLE PAD
            </button>
            <DoodleAnnotation
              src={dateSunday}
              alt="Handwritten: Sunday"
              width="120px"
              rotate={-4}
              opacity={0.65}
            />
          </div>
        </div>

        {/* Bento grid */}
        <div className="things-bento">
          {things.map((t) => (
            <article
              key={t.number}
              className={`thing-cell ${t.skin} ${t.col}`}
              style={{ cursor: t.clickable ? "pointer" : "default" }}
              onClick={() => t.clickable && setIsDoodleOpen(true)}
              role={t.clickable ? "button" : undefined}
              tabIndex={t.clickable ? 0 : undefined}
              title={t.clickable ? "Click to open doodle pad" : undefined}
            >
              <div className="thing-num">{t.number}</div>
              <span className={`thing-symbol ${t.sym}`}>{t.symbol}</span>
              <div className="thing-title">{t.title}</div>
              <div className="thing-desc">{t.desc}</div>
              {t.clickable && (
                <div className="thing-cell-footer">TAP TO DRAW ✎</div>
              )}
            </article>
          ))}
        </div>

        {/* Floating authentic doodles */}
        <div style={{ position:"absolute", top:60, right:"2%", transform:"rotate(4deg)",
                      opacity:0.28, pointerEvents:"none", zIndex:0 }} aria-hidden="true">
          <img src={japaneseHiragana} alt="" style={{ width:130 }} />
        </div>
        <div style={{ position:"absolute", top:"42%", left:"1%", transform:"rotate(-8deg)",
                      opacity:0.35, pointerEvents:"none", zIndex:0 }} aria-hidden="true">
          <img src={laptopSketch} alt="" style={{ width:105 }} />
        </div>
        <div style={{ position:"absolute", bottom:"22%", left:"2%", transform:"rotate(12deg)",
                      opacity:0.3, pointerEvents:"none", zIndex:0 }} aria-hidden="true">
          <img src={doodleMandala} alt="" style={{ width:110 }} />
        </div>
        <div style={{ position:"absolute", bottom:"15%", right:"3%", transform:"rotate(6deg)",
                      opacity:0.36, pointerEvents:"none", zIndex:0 }} aria-hidden="true">
          <img src={cuteFlameEye} alt="" style={{ width:90 }} />
        </div>

        {/* Footer */}
        <div style={{ marginTop:48, fontFamily:"var(--font-mono)", fontSize:"9px",
                      letterSpacing:"0.14em", color:"rgba(255,255,255,0.18)",
                      display:"flex", justifyContent:"space-between" }}>
          <span>STATUS: ALWAYS MAKING SOMETHING</span>
          <span>● ONLINE</span>
        </div>
      </div>
    </section>
  );
}

export default ThingsIDo;