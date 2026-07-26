import { useEffect, useRef, useState } from "react";

export default function LaserCursor() {
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const previous = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || reducedMotion) return undefined;

    const move = (event) => {
      const next = { x: event.clientX, y: event.clientY };
      const deltaX = next.x - previous.current.x;
      const deltaY = next.y - previous.current.y;

      if (deltaX || deltaY) {
        setAngle(Math.atan2(deltaY, deltaX) * (180 / Math.PI));
      }

      previous.current = next;
      setPosition(next);
      setActive(true);
    };
    const leave = () => setActive(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      {["one", "two", "three", "four"].map((step) => (
        <span
          key={step}
          className={`laser-trail laser-trail-${step} ${active ? "is-active" : ""}`}
          style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${angle}deg)` }}
          aria-hidden="true"
        />
      ))}
      <div
        className={`laser-cursor ${active ? "is-active" : ""} ${pressed ? "is-pressed" : ""}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        aria-hidden="true"
      >
        <span className="laser-beam" />
        <span className="laser-core" />
      </div>
    </>
  );
}
