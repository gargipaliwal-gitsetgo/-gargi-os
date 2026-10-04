import { useState } from "react";
import { playFlip } from "../utils/soundFx";

import spiderman   from "../assets/spiderman.jpg";
import casio       from "../assets/casio.jpg";
import headphones  from "../assets/headphones.jpg";
import converse    from "../assets/converse.jpg";
import stars       from "../assets/stars.jpg";
import olive       from "../assets/olive.jpg";
import pencils     from "../assets/pencils.jpg";
import notebook    from "../assets/notebook.jpg";
import chocolate   from "../assets/chocolate.jpg";
import specs       from "../assets/specs.jpg";

import spideyHandRed    from "../assets/doodles/spidey-hand-red.png";
import butterfly03Orange from "../assets/doodles/butterfly-03-orange.png";
import starsClusterYellow from "../assets/doodles/stars-cluster-yellow.png";
import heart01Pink      from "../assets/doodles/heart-01-pink.png";
import glassesSketchPink from "../assets/doodles/glasses-sketch-pink.png";
import eye03Dark        from "../assets/doodles/eye-03-dark.png";

const loves = [
  {
    number: "01",
    title: "SPIDER-MAN",
    sub: "friendly neighbourhood obsession",
    backstory: "Andrew Garfield's Spider-Man is my supreme comfort. The humor, raw vulnerability, and that swinging scene are unmatched.",
    image: spiderman,
    skin: "love-card-dark",
    colSpan: "love-col-5",
    tilt: "tilt-cw1",
  },
  {
    number: "02",
    title: "CASIO",
    sub: "my little time machine",
    backstory: "Digital retro icon. It beeps on the hour. Timeless 90s industrial design that never gets old.",
    image: casio,
    skin: "love-card-olive",
    colSpan: "love-col-3",
    tilt: "tilt-ccw1",
  },
  {
    number: "03",
    title: "HEADPHONES",
    sub: "world off. music on.",
    backstory: "My personal shield against the world. Currently on heavy rotation: indie lo-fi and cinematic K-drama OSTs.",
    image: headphones,
    skin: "love-card-dark",
    colSpan: "love-col-4",
    tilt: "tilt-cw1",
  },
  {
    number: "04",
    title: "CONVERSE",
    sub: "classic for a reason",
    backstory: "Black Chuck Taylors. The universal language of people who don't need to try that hard.",
    image: converse,
    skin: "love-card-paper",
    colSpan: "love-col-4",
    tilt: "tilt-ccw2",
  },
  {
    number: "05",
    title: "STARS",
    sub: "sky is my wallpaper",
    backstory: "There's something overwhelming about how small we are. Staring at stars is my way of feeling things.",
    image: stars,
    skin: "love-card-blue",
    colSpan: "love-col-4",
    tilt: "tilt-cw2",
  },
  {
    number: "06",
    title: "OLIVE GREEN",
    sub: "a colour that understands me",
    backstory: "Not the flashiest. Not the loudest. Just quietly perfect. Exactly my personality.",
    image: olive,
    skin: "love-card-olive",
    colSpan: "love-col-4",
    tilt: "tilt-ccw1",
  },
  {
    number: "07",
    title: "PENCILS",
    sub: "my first medium",
    backstory: "B2, B4, H. The tools that started everything. A blank page + a pencil = infinite possibility.",
    image: pencils,
    skin: "love-card-paper",
    colSpan: "love-col-4",
    tilt: "tilt-cw1",
  },
  {
    number: "08",
    title: "NOTEBOOKS",
    sub: "brain archive",
    backstory: "Unruled spirals filled with late-night brainstorms, half-baked code ideas, and daily reflections.",
    image: notebook,
    skin: "love-card-dark",
    colSpan: "love-col-5",
    tilt: "tilt-ccw2",
  },
  {
    number: "09",
    title: "DARK CHOCOLATE",
    sub: "no explanation required",
    backstory: "85% cocoa. Zero explanation needed. Ultimate fuel for surviving late-night debugging marathons.",
    image: chocolate,
    skin: "love-card-dark",
    colSpan: "love-col-3",
    tilt: "tilt-cw2",
  },
  {
    number: "10",
    title: "BLACK SPECS",
    sub: "seeing the world my way",
    backstory: "Square frames that instantly make me look like a serious software engineer — even when I'm just watching reels.",
    image: specs,
    skin: "love-card-paper",
    colSpan: "love-col-4",
    tilt: "tilt-ccw1",
  },
];

function Loves() {
  const [flipped, setFlipped] = useState({});

  const toggle = (num) => {
    playFlip();
    setFlipped((p) => ({ ...p, [num]: !p[num] }));
  };

  return (
    <section className="loves" id="loves">
      <div className="loves-grain" aria-hidden="true" />

      {/* Floating ambient doodles on paper background */}
      <div style={{ position:"absolute", top:60, left:"2%", transform:"rotate(-14deg)", opacity:0.28, pointerEvents:"none", zIndex:1 }} aria-hidden="true">
        <img src={eye03Dark} alt="" style={{ width:110 }} />
      </div>
      <div style={{ position:"absolute", bottom:80, right:"3%", transform:"rotate(10deg)", opacity:0.32, pointerEvents:"none", zIndex:1 }} aria-hidden="true">
        <img src={butterfly03Orange} alt="" style={{ width:100 }} />
      </div>
      <div style={{ position:"absolute", top:"35%", right:"1.5%", transform:"rotate(-6deg)", opacity:0.3, pointerEvents:"none", zIndex:1 }} aria-hidden="true">
        <img src={glassesSketchPink} alt="" style={{ width:95 }} />
      </div>

      <div className="loves-inner">
        {/* Header */}
        <div className="loves-header-row">
          <div>
            <div className="loves-sys-label">GARGI.OS / 003 — THINGS I LOVE</div>
            <h2 className="loves-title-text">
              THE LITTLE THINGS<br />
              THAT <em>MAKE ME, ME.</em>
            </h2>
          </div>
          <div className="loves-sys-label" style={{ textAlign:"right" }}>
            10 THINGS /<br />IN NO PARTICULAR ORDER
          </div>
        </div>

        {/* Cards grid */}
        <div className="loves-grid">
          {loves.map((item) => {
            const isFlipped = !!flipped[item.number];
            return (
              <article
                key={item.number}
                className={`love-card ${item.skin} ${item.colSpan} ${item.tilt}`}
                onClick={() => toggle(item.number)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggle(item.number)}
                title="Click to flip"
              >
                <span className="love-card-tap-hint">TAP ↻</span>
                <span className="love-card-num">{item.number}</span>

                {!isFlipped && (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="love-card-img"
                    />
                    <div className="love-card-title">{item.title}</div>
                    <div className="love-card-sub">{item.sub}</div>
                  </>
                )}

                {isFlipped && (
                  <div style={{ flex:1 }}>
                    <div className="love-card-title" style={{ marginBottom:12 }}>
                      "{item.title}"
                    </div>
                    <div className="love-card-backstory" style={{ display:"block" }}>
                      {item.backstory}
                    </div>
                    <div style={{ marginTop:16, fontFamily:"var(--font-mono)", fontSize:"8px",
                                  letterSpacing:"0.14em", opacity:0.35 }}>
                      ✦ GARGI.MEM
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Floating accent doodles over grid */}
        <div style={{ position:"absolute", top:"50%", left:"0%", transform:"rotate(20deg)", opacity:0.4,
                      pointerEvents:"none", zIndex:3 }} aria-hidden="true">
          <img src={spideyHandRed} alt="" style={{ width:70 }} />
        </div>
        <div style={{ position:"absolute", bottom:"12%", left:"38%", transform:"rotate(12deg)", opacity:0.45,
                      pointerEvents:"none", zIndex:3 }} aria-hidden="true">
          <img src={heart01Pink} alt="" style={{ width:56 }} />
        </div>
        <div style={{ position:"absolute", top:"18%", right:"18%", transform:"rotate(8deg)", opacity:0.4,
                      pointerEvents:"none", zIndex:3 }} aria-hidden="true">
          <img src={starsClusterYellow} alt="" style={{ width:80 }} />
        </div>

        <div className="loves-bottom-label">
          <span>✦ CLICK ANY CARD TO READ BACKSTORY</span>
          <span>GARGI.ARCHIVE / 003</span>
        </div>
      </div>
    </section>
  );
}

export default Loves;