export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-mark" aria-hidden="true">
        <div className="fill"></div>

        <svg viewBox="0 0 480 480">
          <path d="M240 452C240 452 62 344 24 220 4 148 46 76 118 76c52 0 94 31 110 68 16-37 58-68 110-68 72 0 114 72 94 144-38 124-216 232-216 232Z" />
        </svg>
      </div>

      <div className="container">
        <div className="hero-badges">
          <span className="badge-pill">
            Season III · The Long Rain
          </span>

          <span className="badge-pill storm">
            Live Storm: Heavy Rain
          </span>
        </div>

        <h1>
          <span className="line-hollow">Alone</span>
          <span className="line-solid">Hometown</span>
        </h1>

        <p className="tagline-sub">
          Bloodsteal SMP
        </p>

        <p className="lede">
          Every kill takes two hearts. Every heart makes you harder to end.
          Alone Hometown is a rain-drowned survival world where trust runs
          out long before the storm does.
        </p>

        <div className="hero-stats">
          <div className="stat">
            <b data-target="142">0</b>
            <span>Players Online</span>
          </div>

          <div className="stat">
            <b data-target="8412">0</b>
            <span>Hearts Taken</span>
          </div>

          <div className="stat">
            <b data-target="63">0</b>
            <span>Days Into Season</span>
          </div>
        </div>

        <div className="btn-row">
          <button
            className="btn-copy"
            type="button"
            data-copy-ip
          >
            <span className="part label copy-label">
              Copy Server IP
            </span>

            <span className="part ip">
              play.alonehometown.net
            </span>
          </button>

          <a
            href="#"
            className="btn btn-outline"
          >
            Join the Discord →
          </a>
        </div>
      </div>

      <div
        className="scroll-cue"
        aria-hidden="true"
      >
        <span>Scroll</span>

        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}