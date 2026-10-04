import { useEffect, useState } from "react";

const loadingItems = [
  "personality",
  "curiosity",
  "chaos",
  "creativity",
  "ambition",
  "sleep",
];

function BootScreen({ onComplete }) {
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoaded((previous) => {
        if (previous >= loadingItems.length) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete();
          }, 700);

          return previous;
        }

        return previous + 1;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="boot-screen">
      <div className="boot-content">
        <div className="boot-title">
          INITIALIZING GARGI.OS
        </div>

        <div className="boot-items">
          {loadingItems.map((item, index) => (
            <div className="boot-item" key={item}>
              <span>{item}</span>

              <span
                className={
                  index < loaded
                    ? item === "sleep"
                      ? "boot-error"
                      : "boot-success"
                    : "boot-pending"
                }
              >
                {index < loaded
                  ? item === "sleep"
                    ? "ERROR"
                    : "✓"
                  : "..."}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BootScreen;