import { useEffect, useRef, useState } from "react";
import { playClick, toggleSfx } from "../utils/soundFx";

const BASE_COMMANDS = [
  {
    id: "jump-hero",
    label: "Jump to 001 — Hero",
    category: "NAVIGATION",
    shortcut: "001",
    action: () => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "jump-about",
    label: "Jump to 002 — About",
    category: "NAVIGATION",
    shortcut: "002",
    action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "jump-loves",
    label: "Jump to 003 — Things I Love",
    category: "NAVIGATION",
    shortcut: "003",
    action: () => document.getElementById("loves")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "jump-things",
    label: "Jump to 004 — Things I Do",
    category: "NAVIGATION",
    shortcut: "004",
    action: () => document.getElementById("things")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "jump-made",
    label: "Jump to 005 — Things I've Made",
    category: "NAVIGATION",
    shortcut: "005",
    action: () => document.getElementById("made")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "jump-obsessions",
    label: "Jump to 006 — Current Status",
    category: "NAVIGATION",
    shortcut: "006",
    action: () => document.getElementById("obsessions")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "jump-becoming",
    label: "Jump to 007 — System Update",
    category: "NAVIGATION",
    shortcut: "007",
    action: () => document.getElementById("becoming")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    id: "tool-doodle",
    label: "Open Sketchbook / Doodle Pad",
    category: "CREATIVE",
    shortcut: "draw",
    action: () => {
      const btn = document.querySelector(".doodle-trigger-pill");
      btn?.click();
    },
  },
  {
    id: "egg-spiderman",
    label: "Execute: spiderman.protocol",
    category: "EASTER EGG",
    shortcut: "spidey",
    message: "🕷️ 'With great power comes great overthinking.' — Andrew Garfield Spider-Man is the greatest Spider-Man. No debate accepted.",
  },
  {
    id: "egg-sleep",
    label: "Diagnose: sleep.status",
    category: "DIAGNOSTIC",
    shortcut: "sleep",
    message: "⚠️ [SYSTEM WARNING]: Sleep module unreachable. Negotiation with brain ongoing at 03:00 AM.",
  },
  {
    id: "egg-vitals",
    label: "Inspect: gargi.telemetry",
    category: "SYSTEM",
    shortcut: "vitals",
    message: "📊 TELEMETRY: Age: 19 | Major: CSE @ VIT | Club: Film Society & Dramatics | Default State: Making things & overthinking.",
  },
  {
    id: "egg-chaos",
    label: "Trigger: chaos.mode",
    category: "EASTER EGG",
    shortcut: "chaos",
    message: "💥 [CHAOS ACTIVATED]: CSE student by day, creative brainstormer by night.",
  },
];

function CommandPalette({
  isOpen,
  onClose,
  onToggleMusic,
  isCrtMode,
  onToggleCrt,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notification, setNotification] = useState(null);
  const inputRef = useRef(null);

  const dynamicCommands = [
    ...BASE_COMMANDS,
    {
      id: "tool-crt",
      label: `Toggle Retro CRT Display (${isCrtMode ? "Turn OFF" : "Turn ON"})`,
      category: "DISPLAY",
      shortcut: "crt",
      action: () => onToggleCrt?.(),
    },
    {
      id: "tool-sfx",
      label: "Toggle Cybernetic Sound Effects (SFX)",
      category: "AUDIO",
      shortcut: "sfx",
      action: () => toggleSfx(),
    },
    {
      id: "tool-music",
      label: "Toggle Ambient Lofi Chords Engine",
      category: "AUDIO",
      shortcut: "lofi",
      action: () => onToggleMusic?.(),
    },
  ];

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setNotification(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredCommands = dynamicCommands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.shortcut.toLowerCase().includes(q)
    );
  });

  const handleSelect = (cmd) => {
    playClick();
    if (cmd.action) {
      cmd.action();
      onClose();
    } else if (cmd.message) {
      setNotification(cmd.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length)
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div
        className="palette-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Input Bar */}
        <div className="palette-input-row">
          <span className="palette-prompt">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            className="palette-input"
            placeholder="Type a command or search (e.g. '001', 'spiderman', 'sleep', 'about')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
              setNotification(null);
            }}
            onKeyDown={handleKeyDown}
          />
          <span className="palette-badge">ESC to close</span>
        </div>

        {/* Easter Egg / Notification Output Banner */}
        {notification && (
          <div className="palette-notification">
            <div className="palette-notif-title">[CLI OUTPUT]</div>
            <p>{notification}</p>
          </div>
        )}

        {/* Command List */}
        <div className="palette-results">
          {filteredCommands.length === 0 ? (
            <div className="palette-empty">No matching OS commands found for "{query}".</div>
          ) : (
            filteredCommands.map((cmd, idx) => (
              <div
                key={cmd.id}
                className={`palette-item ${idx === selectedIndex ? "selected" : ""}`}
                onClick={() => handleSelect(cmd)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="palette-item-left">
                  <span className="palette-cat">{cmd.category}</span>
                  <span className="palette-label">{cmd.label}</span>
                </div>
                <span className="palette-shortcut">{cmd.shortcut} ↵</span>
              </div>
            ))
          )}
        </div>

        {/* Palette Footer */}
        <div className="palette-footer">
          <span>Use ↑ ↓ to navigate</span>
          <span>ENTER to select</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;

