import { useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import BackgroundMotion from "./components/BackgroundMotion";
import OSDock from "./components/OSDock";
import CommandPalette from "./components/CommandPalette";
import ProjectModal from "./components/ProjectModal";
import MusicPlayer from "./components/MusicPlayer";
import Hero from "./components/Hero";
import About from "./components/About";
import Loves from "./components/Loves";
import ThingsIDo from "./components/ThingsIDo";
import Made from "./components/Made";
import Obsessions from "./components/Obsessions";
import Becoming from "./components/Becoming";

const SECTION_IDS = [
  "hero",
  "about",
  "loves",
  "things",
  "made",
  "obsessions",
  "becoming",
];

function App() {
  const [booted, setBooted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isCrtMode, setIsCrtMode] = useState(false);

  // Global listener for cross-component music triggers
  useEffect(() => {
    const handleToggleMusic = () => setIsPlayingMusic((prev) => !prev);
    window.addEventListener("gargi:toggle-music", handleToggleMusic);
    return () => window.removeEventListener("gargi:toggle-music", handleToggleMusic);
  }, []);

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll spy to detect current active section
  useEffect(() => {
    if (!booted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [booted]);

  if (!booted) {
    return (
      <BootScreen onComplete={() => setBooted(true)} />
    );
  }

  return (
    <div className={`gargi-os-root ${isCrtMode ? "crt-mode" : ""}`}>
      {isCrtMode && <div className="crt-overlay" aria-hidden="true" />}
      <BackgroundMotion />
      <OSDock
        activeSection={activeSection}
        onOpenPalette={() => setIsPaletteOpen(true)}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={() => setIsPlayingMusic((prev) => !prev)}
        isCrtMode={isCrtMode}
        onToggleCrt={() => setIsCrtMode((prev) => !prev)}
      />
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onToggleMusic={() => setIsPlayingMusic((prev) => !prev)}
        isCrtMode={isCrtMode}
        onToggleCrt={() => setIsCrtMode((prev) => !prev)}
      />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onToggle={() => setIsPlayingMusic((prev) => !prev)}
      />

      <Hero />
      <About />
      <Loves />
      <ThingsIDo />
      <Made onSelectProject={(project) => setSelectedProject(project)} />
      <Obsessions />
      <Becoming />
    </div>
  );
}

export default App;