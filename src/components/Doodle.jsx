// GARGI.OS — Real Hand-Drawn Doodle Components

export function FloatingDoodle({
  src,
  alt = "hand-drawn doodle",
  className = "",
  style = {},
  mouseX = 0,
  mouseY = 0,
  speed = 15,
  rotate = 0,
  opacity = 0.85,
  width = "auto",
  maxWidth = "100%",
  blendMode = "normal",
}) {
  const transform = `translate(${mouseX * speed}px, ${mouseY * speed}px) rotate(${rotate}deg)`;

  return (
    <div
      className={`floating-doodle-container ${className}`}
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 2,
        opacity,
        mixBlendMode: blendMode,
        transform,
        transition: "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)",
        ...style,
      }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        style={{
          width,
          maxWidth,
          height: "auto",
          display: "block",
          filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
        }}
      />
    </div>
  );
}

export function DoodleAnnotation({
  src,
  alt = "sketchbook annotation",
  className = "",
  style = {},
  rotate = 0,
  opacity = 0.9,
  width = "auto",
  maxWidth = "100%",
}) {
  return (
    <div
      className={`doodle-annotation ${className}`}
      style={{
        position: "relative",
        pointerEvents: "none",
        display: "inline-block",
        opacity,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        style={{
          width,
          maxWidth,
          height: "auto",
          display: "block",
          filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))",
        }}
      />
    </div>
  );
}

export default FloatingDoodle;

