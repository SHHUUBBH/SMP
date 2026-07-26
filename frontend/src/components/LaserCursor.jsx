import { useEffect, useRef, useState } from "react";

const SEGMENT_COUNT = 14;

const INTERACTIVE_SELECTOR =
  'a,button,summary,select,[role="button"],[role="link"],[role="tab"],[data-cursor="hover"]';

const TEXT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]),textarea,[contenteditable="true"]';

const lerp = (from, to, amount) => from + (to - from) * amount;
const media = (query) => (typeof window === "undefined" ? null : window.matchMedia(query));

function useLaserEnabled() {
  const [enabled, setEnabled] = useState(() => {
    const fine = media("(pointer: fine)");
    const calm = media("(prefers-reduced-motion: reduce)");
    return Boolean(fine?.matches && !calm?.matches);
  });

  useEffect(() => {
    const fine = media("(pointer: fine)");
    const calm = media("(prefers-reduced-motion: reduce)");
    if (!fine || !calm) return undefined;

    const sync = () => setEnabled(fine.matches && !calm.matches);
    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);

    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  return enabled;
}

export default function LaserCursor() {
  const enabled = useLaserEnabled();
  const layerRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const segmentRefs = useRef([]);

  useEffect(() => {
    if (!enabled) return undefined;

    const layer = layerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const segments = segmentRefs.current.filter(Boolean);
    if (!layer || !dot || !ring || !segments.length) return undefined;

    document.body.classList.add("laser-on");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const chain = Array.from({ length: SEGMENT_COUNT + 1 }, () => ({ ...pointer }));
    const reticle = { ...pointer };

    let heat = 0;
    let hover = 0;
    let press = 0;
    let hovering = false;
    let pressing = false;
    let visible = false;
    let placed = false;
    let stale = false;
    let lastTarget = null;
    let frame = 0;

    const setVisible = (next) => {
      if (next === visible) return;
      visible = next;
      layer.classList.toggle("is-active", next);
    };

    const applyTarget = (target) => {
      if (target === lastTarget) return;
      lastTarget = target;
      const element = target instanceof Element ? target : null;
      const overText = Boolean(element?.closest(TEXT_SELECTOR));
      hovering = !overText && Boolean(element?.closest(INTERACTIVE_SELECTOR));
      layer.classList.toggle("is-text", overText);
    };

    const move = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!placed) {
        placed = true;
        chain.forEach((node) => {
          node.x = pointer.x;
          node.y = pointer.y;
        });
        reticle.x = pointer.x;
        reticle.y = pointer.y;
      }

      setVisible(true);
      applyTarget(event.target);
    };

    const hide = () => setVisible(false);
    const down = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pressing = true;
    };
    const up = () => {
      pressing = false;
    };
    const blur = () => {
      pressing = false;
      setVisible(false);
    };
    const scrolled = () => {
      stale = true;
    };
    const visibility = () => {
      if (document.hidden) blur();
    };

    const render = () => {
      frame = requestAnimationFrame(render);

      if (stale) {
        stale = false;
        if (visible) applyTarget(document.elementFromPoint(pointer.x, pointer.y));
      }

      const head = chain[0];
      const fromX = head.x;
      const fromY = head.y;
      head.x = lerp(head.x, pointer.x, 0.55);
      head.y = lerp(head.y, pointer.y, 0.55);

      const speed = Math.hypot(head.x - fromX, head.y - fromY);
      heat = lerp(heat, Math.min(speed / 22, 1), 0.18);
      hover = lerp(hover, hovering ? 1 : 0, 0.16);
      press = lerp(press, pressing ? 1 : 0, 0.28);

      for (let i = 1; i < chain.length; i += 1) {
        const node = chain[i];
        const lead = chain[i - 1];
        const follow = 0.32 + (1 - i / chain.length) * 0.16;
        node.x = lerp(node.x, lead.x, follow);
        node.y = lerp(node.y, lead.y, follow);
      }

      for (let i = 0; i < segments.length; i += 1) {
        const start = chain[i];
        const end = chain[i + 1];
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;
        const length = Math.max(Math.hypot(deltaX, deltaY), 0.001);
        const taper = 1 - i / segments.length;
        const segment = segments[i];

        segment.style.transform = `translate3d(${start.x}px,${start.y}px,0) rotate(${Math.atan2(deltaY, deltaX)}rad) scaleX(${length})`;
        segment.style.opacity = `${Math.min(1, taper * taper * (0.2 + heat * 1.25))}`;
      }

      dot.style.transform = `translate3d(${head.x}px,${head.y}px,0) scale(${1 + heat * 0.3 + hover * 0.45 - press * 0.4})`;

      reticle.x = lerp(reticle.x, head.x, 0.2);
      reticle.y = lerp(reticle.y, head.y, 0.2);
      ring.style.transform = `translate3d(${reticle.x}px,${reticle.y}px,0) rotate(${hover * 45}deg) scale(${0.5 + hover * 0.5 - press * 0.12})`;
      ring.style.opacity = `${hover}`;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });
    window.addEventListener("blur", blur);
    window.addEventListener("scroll", scrolled, { passive: true, capture: true });
    document.addEventListener("visibilitychange", visibility);
    document.documentElement.addEventListener("pointerleave", hide);
    document.documentElement.addEventListener("pointerenter", move);

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("blur", blur);
      window.removeEventListener("scroll", scrolled, { capture: true });
      document.removeEventListener("visibilitychange", visibility);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.removeEventListener("pointerenter", move);
      document.body.classList.remove("laser-on");
      layer.classList.remove("is-active", "is-text");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="laser-layer" ref={layerRef} aria-hidden="true">
      {Array.from({ length: SEGMENT_COUNT }, (_, index) => {
        const taper = 1 - index / SEGMENT_COUNT;
        const thickness = 0.8 + taper * 2.2;
        return (
          <span
            key={index}
            ref={(node) => {
              segmentRefs.current[index] = node;
            }}
            className="laser-seg"
            style={{ height: `${thickness}px`, marginTop: `${-thickness / 2}px` }}
          />
        );
      })}
      <span className="laser-ring" ref={ringRef} />
      <span className="laser-dot" ref={dotRef} />
    </div>
  );
}
