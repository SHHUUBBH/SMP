import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SpecularButton from "@/components/ui/SpecularButton";

const landingLinks = [
  ["The Bleed", "#about"],
  ["Rankings", "#leaderboard"],
  ["The Watch", "#staff"],
  ["FAQ", "#faq"],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { pathname } = useLocation();

  const inStore = pathname.startsWith("/store");

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText("play.alonehometown.net");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className={`nav ${inStore ? "nav-store" : ""}`} id="siteNav">
      <div className="container">
        <Link to="/" className="brand" aria-label="Alone Hometown home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 20.3S3.9 15.7 2.4 10.5C1.6 7.7 3.4 4.9 6.2 4.9c1.9 0 3.5 1.1 4.2 2.6.7-1.5 2.3-2.6 4.2-2.6 2.8 0 4.6 2.8 3.8 5.6-1.5 5.2-9.8 9.8-9.8 9.8Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>

          <span className="brand-text">
            <b>ALONE HOMETOWN</b>
            <span>BLOODSTEAL SMP</span>
          </span>
        </Link>

        <nav className="nav-links" id="navLinks" aria-label="Primary">
          <NavLink end to="/">
            Home
          </NavLink>

          {inStore ? (
            <>
              <NavLink to="/store">Store</NavLink>
              <NavLink to="/store/support">Support</NavLink>
              <NavLink to="/store/account">Account</NavLink>
            </>
          ) : (
            <>
              {landingLinks.slice(0, 2).map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}

              <NavLink to="/store">Store</NavLink>

              {landingLinks.slice(2).map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </>
          )}

          <Link
            className="nav-mobile-store btn btn-outline"
            to={inStore ? "/store/cart" : "/store"}
          >
            {inStore ? "View Cart" : "Open Store"}
          </Link>
        </nav>

        <div className="nav-actions">
          {inStore ? (
            <Link className="nav-cart" to="/store/cart">
              <span aria-hidden="true">⌑</span> Cart
            </Link>
          ) : (
            <SpecularButton
              size="sm"
              radius={999}
              tint="#ffffff"
              tintOpacity={0}
              blur={0}
              textColor="#f5f5f5"
              lineColor="#ff0040"
              baseColor="#003960"
              intensity={1}
              shineSize={16}
              shineFade={40}
              thickness={1.3}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
            >
              Join Discord
            </SpecularButton>
          )}

          <button
            className="btn btn-primary"
            type="button"
            onClick={copyIP}
          >
            <span className="copy-label">
              {copied ? "Copied!" : "Copy IP"}
            </span>
          </button>
        </div>

        <button
          className="nav-toggle"
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