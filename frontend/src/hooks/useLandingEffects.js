import { useEffect } from "react";

export default function useLandingEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- Rain canvas ---------- */

    const canvas = document.getElementById("rain");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let w;
    let h;
    let drops = [];

    const DROP_COUNT = 90;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function makeDrop() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        len: 14 + Math.random() * 22,
        speed: 5 + Math.random() * 7,
        drift: 0.6 + Math.random() * 0.4,
        opacity: 0.08 + Math.random() * 0.25,
      };
    }

    function initDrops() {
      drops = [];
      for (let i = 0; i < DROP_COUNT; i++) {
        drops.push(makeDrop());
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.drift * 11, d.y + d.len);
        ctx.strokeStyle = `rgba(180,205,255,${d.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        d.y += d.speed;
        d.x -= d.drift;

        if (d.y > h + d.len) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }

        if (d.x < -20) {
          d.x = w + 20;
        }
      }
    }

    let animationId;

    function loop() {
      drawFrame();
      animationId = requestAnimationFrame(loop);
    }

    resize();
    initDrops();

    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      loop();
    }

    /* ---------- Lightning ---------- */

    let flashTimer;

    const flash = document.getElementById("flash");

    function scheduleFlash() {
      const delay = 9000 + Math.random() * 14000;

      flashTimer = setTimeout(() => {
        if (flash) {
          flash.classList.remove("strike");
          void flash.offsetWidth;
          flash.classList.add("strike");
        }

        scheduleFlash();
      }, delay);
    }

    if (!reduceMotion && flash) {
      scheduleFlash();
    }

    /* ---------- Nav Scroll ---------- */

    const nav = document.getElementById("siteNav");

    function onScroll() {
      if (!nav) return;

      if (window.scrollY > 40) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    /* ---------- Copy IP ---------- */

    const SERVER_IP = "play.alonehometown.net";

    function copyIp(btn) {
      const label =
        btn.querySelector(".copy-label") || btn;

      const original = label.textContent;

      function done(success) {
        label.textContent = success
          ? "Copied!"
          : "Select & copy IP";

        btn.classList.remove("copied");
        void btn.offsetWidth;
        btn.classList.add("copied");

        setTimeout(() => {
          label.textContent = original;
        }, 2200);
      }

      function fallbackCopy() {
        try {
          const ta = document.createElement("textarea");

          ta.value = SERVER_IP;
          ta.style.position = "fixed";
          ta.style.opacity = "0";

          document.body.appendChild(ta);

          ta.select();

          document.execCommand("copy");

          document.body.removeChild(ta);

          done(true);
        } catch {
          done(false);
        }
      }

      if (
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        navigator.clipboard
          .writeText(SERVER_IP)
          .then(() => done(true))
          .catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    }

    const copyBtns =
      document.querySelectorAll("[data-copy-ip]");

    copyBtns.forEach((btn) => {
      btn.addEventListener("click", () => copyIp(btn));
    });

    /* ---------- Counter ---------- */

    function countUp(el, target, duration) {
      if (reduceMotion) {
        el.textContent = target.toLocaleString();
        return;
      }

      const start = performance.now();

      function tick(now) {
        const p = Math.min(
          1,
          (now - start) / duration
        );

        const eased = 1 - Math.pow(1 - p, 3);

        el.textContent = Math.round(
          target * eased
        ).toLocaleString();

        if (p < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    }

    document
      .querySelectorAll("[data-target]")
      .forEach((el) => {
        countUp(
          el,
          parseInt(el.dataset.target, 10),
          1400
        );
      });

    /* ---------- Reveal ---------- */

    const revealEls =
      document.querySelectorAll(".reveal");

    let observer;

    if (
      "IntersectionObserver" in window &&
      !reduceMotion
    ) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "is-visible"
              );
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
        }
      );

      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) =>
        el.classList.add("is-visible")
      );
    }

    /* ---------- Hero Parallax ---------- */

    const heroMark =
      document.querySelector(".hero-mark");

    function heroMove(e) {
      const x =
        (e.clientX / window.innerWidth - 0.5) * 14;

      const y =
        (e.clientY / window.innerHeight - 0.5) * 14;

      heroMark.style.transform = `translate(${x}px, calc(-50% + ${y}px))`;
    }

    if (
      heroMark &&
      window.matchMedia("(pointer:fine)").matches &&
      !reduceMotion
    ) {
      window.addEventListener(
        "mousemove",
        heroMove
      );
    }

    /* ---------- Cleanup ---------- */

    return () => {
      cancelAnimationFrame(animationId);

      clearTimeout(flashTimer);

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "mousemove",
        heroMove
      );

      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
}
