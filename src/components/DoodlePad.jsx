import { useEffect, useRef, useState } from "react";

function DoodlePad({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#7c8f55");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 520;
    canvas.height = 360;

    // Fill off-white paper tone
    ctx.fillStyle = "#151712";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw faint sketchbook grid lines
    ctx.strokeStyle = "rgba(124, 143, 85, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const { x, y } = getCanvasCoords(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCanvasCoords(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#151712";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  if (!isOpen) return null;

  return (
    <div className="doodle-backdrop" onClick={onClose}>
      <div
        className="doodle-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="doodle-header">
          <div className="doodle-title-group">
            <span className="doodle-icon">✎</span>
            <strong>GARGI'S SCRAPBOOK // DOODLE PAD</strong>
          </div>
          <button className="doodle-close" onClick={onClose} title="Close pad (ESC)">
            ESC ✕
          </button>
        </div>

        <div className="doodle-canvas-wrapper">
          <canvas
            ref={canvasRef}
            className="doodle-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        <div className="doodle-toolbar">
          <div className="doodle-tools-left">
            <span className="tool-label">INK:</span>
            <button
              className={`color-dot ${color === "#7c8f55" ? "active" : ""}`}
              style={{ background: "#7c8f55" }}
              onClick={() => setColor("#7c8f55")}
              title="Olive Green"
            />
            <button
              className={`color-dot ${color === "#f2f0e8" ? "active" : ""}`}
              style={{ background: "#f2f0e8" }}
              onClick={() => setColor("#f2f0e8")}
              title="Graphite Off-White"
            />
            <button
              className={`color-dot ${color === "#b23a3a" ? "active" : ""}`}
              style={{ background: "#b23a3a" }}
              onClick={() => setColor("#b23a3a")}
              title="Crimson"
            />

            <span className="tool-label" style={{ marginLeft: "12px" }}>SIZE:</span>
            <button
              className={`size-btn ${strokeWidth === 2 ? "active" : ""}`}
              onClick={() => setStrokeWidth(2)}
            >
              FINE
            </button>
            <button
              className={`size-btn ${strokeWidth === 5 ? "active" : ""}`}
              onClick={() => setStrokeWidth(5)}
            >
              BOLD
            </button>
          </div>

          <div className="doodle-tools-right">
            <button className="doodle-btn" onClick={handleClear} disabled={!hasDrawn}>
              CLEAR ↺
            </button>
            <button className="doodle-btn primary" onClick={onClose}>
              DONE ✦
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoodlePad;

