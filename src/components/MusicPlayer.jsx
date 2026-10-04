import { useEffect, useRef } from "react";

// Soothing, warm lofi chord frequencies (Hz) [Fmaj7 - Em7 - Dm7 - Cmaj7]
const CHORDS = [
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [164.81, 196.0, 246.94, 329.63], // Em7
  [146.83, 174.61, 220.0, 261.63], // Dm7
  [130.81, 164.81, 196.0, 246.94], // Cmaj7
];

function MusicPlayer({ isPlaying, onToggle }) {
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const currentChordIdx = useRef(0);

  useEffect(() => {
    if (isPlaying) {
      // Initialize Audio Context on user gesture
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Master output gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime); // gentle ambient volume
      masterGain.connect(ctx.destination);

      // Warm analog lowpass filter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(480, ctx.currentTime);
      filter.connect(masterGain);

      const playChord = () => {
        const chord = CHORDS[currentChordIdx.current];
        currentChordIdx.current = (currentChordIdx.current + 1) % CHORDS.length;

        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle lofi pitch flutter / detune
          osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime);

          // Soft attack & long decay
          const now = ctx.currentTime;
          noteGain.gain.setValueAtTime(0.001, now);
          noteGain.gain.exponentialRampToValueAtTime(0.045, now + 0.6);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

          osc.connect(noteGain);
          noteGain.connect(filter);

          osc.start(now);
          osc.stop(now + 4.0);
        });
      };

      playChord();
      intervalRef.current = setInterval(playChord, 3800);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div
      className={`floating-music-widget ${isPlaying ? "active" : ""}`}
      onClick={onToggle}
      title={isPlaying ? "Pause Lofi Radio" : "Play Lofi Radio"}
      role="button"
      tabIndex={0}
    >
      <div className="music-widget-left">
        <div className="vinyl-disc">
          <div className="vinyl-inner" />
        </div>
        <div className="music-info">
          <span className="music-tag">GARGI.RADIO // ON AIR</span>
          <span className="music-title">Spider-Man / Peter's Lofi Theme</span>
        </div>
      </div>

      <div className="music-widget-right">
        <div className="equalizer-bars">
          <span className="eq-bar bar-1" />
          <span className="eq-bar bar-2" />
          <span className="eq-bar bar-3" />
          <span className="eq-bar bar-4" />
        </div>
        <button className="music-toggle-icon">
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;

