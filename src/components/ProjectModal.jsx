import { useEffect } from "react";
import portraitEye from "../assets/doodles/portrait-eye.png";
import cuteDuo from "../assets/doodles/cute-duo.png";
import ribcage from "../assets/doodles/ribcage.png";
import celestialFace from "../assets/doodles/celestial-face-olive.png";
import doodleMandala from "../assets/doodles/doodle-mandala.png";
import cuteFlameEye from "../assets/doodles/cute-flame-eye.png";

const PROJECT_DETAILS = {
  "01": {
    category: "SYSTEM / LOGIC",
    subtitle: "Python CLI Restaurant Ordering Engine",
    date: "2024",
    stack: ["Python 3", "Data Structures", "Terminal UI", "File I/O"],
    overview:
      "QuickBite is a console-based restaurant management and ordering simulation built with clean object-oriented Python. It features dynamic menu selection, order state management, real-time discount calculations, and a customer loyalty reward-point tier system.",
    highlights: [
      "Dynamic menu rendering with category filtering",
      "Interactive cart with item quantity modifiers",
      "Custom loyalty points engine (+10 points per $1 spent)",
      "Automated ASCII receipt generation with timestamp",
    ],
    codePreview: `$ python quickbite.py
[GARGI.OS // QUICKBITE v1.2]
[+] Initializing menu database... OK
[+] Checking loyalty tier: GOLD MEMBER (pts: 340)

SELECT ORDER:
> 1x Spicy Truffle Fries   $8.50
> 1x Iced Matcha Latte     $5.00
------------------------------------
SUBTOTAL:                 $13.50
LOYALTY REWARD (10% OFF): -$1.35
TOTAL DUE:                $12.15
[✓] Order confirmed! Receipt generated.`,
  },
  "02": {
    category: "AI & COMPUTER VISION",
    subtitle: "Automated Waste Classification System",
    date: "2024",
    stack: ["Python", "OpenCV", "Convolutional Neural Nets", "Transfer Learning"],
    overview:
      "An exploratory computer vision project aimed at sorting and classifying urban municipal solid waste. Trained on image datasets to recognize recyclable plastic, paper, organic compost, and hazardous electronics in real-time camera streams.",
    highlights: [
      "Image preprocessing with OpenCV edge sharpening",
      "Multi-class classification (Plastic, Organic, Glass, Metal)",
      "Real-time bounding box prediction with confidence scores",
      "Focus on sustainable college campus waste management",
    ],
    codePreview: `[AI.INSPECT] Stream started (1920x1080 @ 30FPS)
FRAME 0429:
[DETECTED] item: "Plastic Bottle (PET)" | conf: 94.2%
[CLASSIFY] bin: BLUE_RECYCLING
[ACTION]   Actuator signal sent -> OPEN FLAP 02
STATUS: CLASSIFICATION COMPLETE (latency: 38ms)`,
  },
  "03": {
    category: "GRAPHIC DESIGN / EDITORIAL",
    subtitle: "Visual Identity for VIT Film Society & Dramatics",
    date: "2024",
    stack: ["Adobe Illustrator", "Photoshop", "Typography", "Editorial Layout"],
    overview:
      "A collection of digital posters and promo identity assets designed for collegiate cultural events, screenings, and theater productions. Combines bold typographic hierarchy, heavy contrast, film grain textures, and intentional asymmetry.",
    highlights: [
      "Brutalist typography experiments with custom title treatments",
      "Print-ready posters and Instagram digital story collateral",
      "Color theory inspired by retro cinema and arthouse aesthetics",
      "High-engagement campaign for college campus film screenings",
    ],
    codePreview: `PROJECT: VIT FILM SOCIETY // SCREENING 04
ASPECT: 16:9 Digital + A3 Print Ready
PALETTE: Dark Slate, Safety Orange, Paper White
TYPE: Helvetica Neue Bold Condensed + Monospace Meta
NOTE: "Good poster design shouldn't just announce; it should evoke."`,
  },
  "04": {
    category: "CONTENT & STORYTELLING",
    subtitle: "Short-form Video Production & Creative Editing",
    date: "2024 - PRESENT",
    stack: ["Premiere Pro", "CapCut", "Color Grading", "Sound Design"],
    overview:
      "Short-form reels, vlogs, and storytelling snippets documenting life as a 19-year-old CSE student, creative explorations, humor, and honest reflections. Focused on rhythmic cut pacing, audio-visual synchrony, and genuine voice.",
    highlights: [
      "Overthinking & relatable student life micro-narratives",
      "Sound design driven edits mapped precisely to beat drops",
      "Color grading with warm filmic tones",
      "Documenting personal growth in public ('work in progress')",
    ],
    codePreview: `STORYBOARD: REEL_019.MP4
TIMELINE: 00:00 - 00:45
AUDIO: Indie Lo-fi + Ambient Room Ambience
HOOK: "Nobody warned me CSE would just be arguing with semicolons..."
PACING: Fast cuts on beat, lingering pause on reflection`,
  },
  "05": {
    category: "FINE ART & ILLUSTRATION",
    subtitle: "Graphite Pencil & Ink Concept Doodles",
    date: "ONGOING",
    stack: ["Graphite Pencils", "Ink Pens", "Spiral Sketchbook", "Digital Scans"],
    overview:
      "Pencil sketches and pen studies created during late-night study sessions and brainstorms. Ranging from anatomical studies to spontaneous surreal doodles, every digital idea first starts with graphite on paper.",
    highlights: [
      "Quick gesture drawings and perspective studies",
      "High-contrast shading with 2B - 6B graphite pencils",
      "Ideation playground for UI icons and sticker graphics",
      "Physical tactile balance to long hours of screen coding",
    ],
    codePreview: `SKETCHBOOK LOG: VOL. 03 // PAGE 48
MEDIUM: Faber-Castell 4B + Micron 0.3mm
SUBJECT: "Spider-Man in thought atop a clocktower"
QUOTE: "Pencil is forgiving, but honest. What is drawn cannot be hidden."`,
  },
  "06": {
    category: "VISUAL CURATION",
    subtitle: "Aesthetic Moodboards & Design Archive",
    date: "CURATED DAILY",
    stack: ["Color Palettes", "Texture Archives", "Architecture", "Cinema Stills"],
    overview:
      "A vast visual moodboard collecting typography samples, cozy minimalist spaces, olive-green palettes, vintage tech hardware (Casio watches, retro headphones), and cinema frames that directly influence the GARGI.OS visual identity.",
    highlights: [
      "Over 1,200 curated design references and color harmonies",
      "Industrial design inspiration from retro watches and audio tech",
      "Streetwear and cozy baggy silhouettes moodboards",
      "The primary visual blueprint for this portfolio website",
    ],
    codePreview: `MOODBOARD SEED: "GARGI.AESTHETIC"
CORE MOTIFS:
- 01: Andrew Garfield Spider-Man (dynamic freedom)
- 02: Olive Green & Off-White (calm earthy technical)
- 03: Casio Digital Watch (tactile precision, 90s nostalgia)
- 04: Spiral Notebooks & Pencils (ideas in raw form)`,
  },
};

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling only when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const details = PROJECT_DETAILS[project.number] || {
    category: project.type,
    subtitle: project.title,
    date: "2024",
    stack: project.tags,
    overview: project.description,
    highlights: [],
    codePreview: `PROJECT: ${project.title}\nSTATUS: ARCHIVED\nTAGS: ${project.tags.join(", ")}`,
  };

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        className="project-modal-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Terminal Header Bar */}
        <div className="modal-header-bar">
          <div className="modal-header-left">
            <span className="modal-dot red" />
            <span className="modal-dot yellow" />
            <span className="modal-dot green" />
            <span className="modal-path">
              GARGI.OS / ARCHIVE / PROJECT_0{project.number}.EXE
            </span>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            title="Close Inspector (ESC)"
          >
            ESC ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">
          {/* Top Title Banner */}
          <div className="modal-banner">
            <div className="modal-meta-row">
              <span className="modal-category">{details.category}</span>
              <span className="modal-date">YEAR: {details.date}</span>
            </div>

            <h1 className="modal-title">{project.title}</h1>
            <p className="modal-subtitle">{details.subtitle}</p>

            <div className="modal-tags">
              {details.stack.map((tag) => (
                <span key={tag} className="modal-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="modal-section">
            <h3>// OVERVIEW</h3>
            <p className="modal-overview-text">{details.overview}</p>
          </div>

          {/* Key Highlights */}
          {details.highlights.length > 0 && (
            <div className="modal-section">
              <h3>// KEY HIGHLIGHTS</h3>
              <ul className="modal-highlights-list">
                {details.highlights.map((h, i) => (
                  <li key={i}>
                    <span className="highlight-bullet">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Free-Form Sketchbook Studies (Zero Square Boxes / Completely Free) */}
          {project.number === "05" && (
            <div className="modal-section modal-free-sketches-section">
              <h3>// FREE-FORM SKETCHBOOK STUDIES</h3>
              <p className="modal-free-sketches-subtitle">
                "Real graphite & ink studies released from the sketchbook — zero square containers, pure drawings."
              </p>
              <div className="modal-free-sketches-canvas">
                <div className="free-sketch-artifact f-eye">
                  <img src={portraitEye} alt="Graphite eye study" />
                  <span>01 // GRAPHITE EYE STUDY</span>
                </div>
                <div className="free-sketch-artifact f-duo">
                  <img src={cuteDuo} alt="Manga character ink" />
                  <span>02 // CHARACTER INK DUO</span>
                </div>
                <div className="free-sketch-artifact f-rib">
                  <img src={ribcage} alt="Anatomical pen study" />
                  <span>03 // ANATOMICAL PERSPECTIVE</span>
                </div>
                <div className="free-sketch-artifact f-face">
                  <img src={celestialFace} alt="Celestial face sketch" />
                  <span>04 // CELESTIAL PROPORTIONS</span>
                </div>
                <div className="free-sketch-artifact f-mandala">
                  <img src={doodleMandala} alt="Intricate ink mandala" />
                  <span>05 // INTRICATE PEN MANDALA</span>
                </div>
                <div className="free-sketch-artifact f-flame">
                  <img src={cuteFlameEye} alt="Flame eye illustration" />
                  <span>06 // STYLIZED FLAME STUDY</span>
                </div>
              </div>
            </div>
          )}

          {/* Terminal Code / Execution Preview */}
          <div className="modal-section">
            <h3>// SYSTEM TERMINAL PREVIEW</h3>
            <pre className="modal-code-box">
              <code>{details.codePreview}</code>
            </pre>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="modal-footer-bar">
          <span>GARGI.OS // ARCHIVE LOG</span>
          <span>CLICK ANYWHERE OUTSIDE OR PRESS [ESC] TO EXIT</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;

