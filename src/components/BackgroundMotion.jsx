import { useEffect, useRef } from "react";

// Symbols that represent Gargi's world (creative + code + scrapbook)
const GLYPHS = ["✦", "✧", "+", "·", "</>", "◖", "01", "↯", "✎", "◌"];

function BackgroundMotion() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smoothing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Create floating interactive scrapbook & tech particles
    const particleCount = Math.min(38, Math.floor((width * height) / 28000));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const isSymbol = Math.random() > 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: Math.random() * width,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.35 - Math.random() * 0.55, // float gently upwards
        size: isSymbol ? 11 + Math.random() * 8 : 1.5 + Math.random() * 2.5,
        glyph: isSymbol ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
        opacity: 0.15 + Math.random() * 0.4,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
        color:
          Math.random() > 0.3
            ? "124, 143, 85" // olive green
            : Math.random() > 0.4
            ? "242, 240, 232" // warm off-white
            : "178, 58, 58", // muted crimson
        wobbleSpeed: 0.01 + Math.random() * 0.015,
        wobbleDistance: 20 + Math.random() * 40,
        age: Math.random() * 1000,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Interactive Cursor Ambient Halo
      if (mouse.active) {
        const haloGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          280
        );
        haloGrad.addColorStop(0, "rgba(124, 143, 85, 0.07)");
        haloGrad.addColorStop(0.5, "rgba(124, 143, 85, 0.025)");
        haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = haloGrad;
        ctx.fillRect(
          mouse.x - 280,
          mouse.y - 280,
          560,
          560
        );
      }

      // 2. Render & update floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.age += 1;

        // Upward drift + horizontal wobble
        p.y += p.vy;
        p.x = p.originX + Math.sin(time * 0.8 + p.pulseOffset) * p.wobbleDistance;

        // Mouse avoidance/repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        // Wrap around top and bottom
        if (p.y < -30) {
          p.y = height + 20;
          p.originX = Math.random() * width;
          p.x = p.originX;
        }

        // Breathing opacity
        const currentOpacity =
          p.opacity * (0.65 + 0.35 * Math.sin(p.age * p.pulseSpeed + p.pulseOffset));

        if (p.glyph) {
          ctx.font = `600 ${p.size}px monospace, Helvetica, Arial`;
          ctx.fillStyle = `rgba(${p.color}, ${currentOpacity})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${currentOpacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="background-motion-canvas"
      aria-hidden="true"
    />
  );
}

export default BackgroundMotion;

