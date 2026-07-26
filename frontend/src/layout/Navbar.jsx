import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen]);

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText("play.alonehometown.net");

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="nav" id="siteNav">
      <div className="container">
        <a href="#top" className="brand" aria-label="Alone Hometown — home">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 20.3C12 20.3 3.9 15.7 2.4 10.5 1.6 7.7 3.4 4.9 6.2 4.9c1.9 0 3.5 1.1 4.2 2.6.7-1.5 2.3-2.6 4.2-2.6 2.8 0 4.6 2.8 3.8 5.6-1.5 5.2-9.8 9.8-9.8 9.8Z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>

          <span className="brand-text">
            <b>ALONE HOMETOWN</b>
            <span>BLOODSTEAL SMP</span>
          </span>
        </a>

        <nav
          className="nav-links"
          id="navLinks"
          aria-label="Primary"
        >
          <a href="#top">Home</a>
          <a href="#about">The Bleed</a>
          <a href="#leaderboard">Rankings</a>
          <a href="#shop">Shop</a>
          <a href="#staff">The Watch</a>
          <a href="#faq">FAQ</a>

          <a
            href="#"
            className="nav-cta-item btn btn-outline"
          >
            Join Discord
          </a>

          <button
            className="nav-cta-item btn btn-primary"
            type="button"
            data-copy-ip
            onClick={copyIP}
          >
            <span className="copy-label">
              {copied ? "Copied!" : "Copy Server IP"}
            </span>
          </button>
        </nav>

        <div className="nav-actions">
          <a
            href="#"
            className="btn btn-outline"
          >
            Join Discord
          </a>

          <button
            className="btn btn-primary"
            type="button"
            data-copy-ip
            onClick={copyIP}
          >
            <span className="copy-label">
              {copied ? "Copied!" : "Copy IP"}
            </span>
          </button>
        </div>

        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="navLinks"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}