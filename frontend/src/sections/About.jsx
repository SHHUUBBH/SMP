export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">
            The Rules of the Night
          </span>

          <h2>
            This isn't survival. It's predation.
          </h2>

          <p>
            Alone Hometown strips away the safety net. Everyone spawns with
            ten hearts. Every kill pulls two of theirs into you —
            permanently, until someone takes them back.
          </p>
        </div>

        <div className="rules-grid">

          <div className="rule-card reveal">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M11.5 19.6C11.5 19.6 4 15.3 2.6 10.4c-.8-2.7 1-5.4 3.7-5.4 1.8 0 3.3 1 4 2.5.7-1.4 2.2-2.5 4-2.5.7 0 1.4.15 2 .45"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.3 2.7l-5 5m5-5h-4.3m4.3 0v4.3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Steal on the Kill</h3>

            <p>
              Land the final blow and two hearts cross over to you, no
              questions asked. The strongest hearts in Hometown all used
              to belong to someone else.
            </p>
          </div>

          <div className="rule-card reveal">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 20.3C12 20.3 3.9 15.7 2.4 10.5 1.6 7.7 3.4 4.9 6.2 4.9c1.9 0 3.5 1.1 4.2 2.6.7-1.5 2.3-2.6 4.2-2.6 2.8 0 4.6 2.8 3.8 5.6-1.5 5.2-9.8 9.8-9.8 9.8Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.8 5.5l-2 4.5 2.6 3-2.6 3 1.6 4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Bleed Out</h3>

            <p>
              Lose your last heart and the storm takes you with it —
              you're benched from Hometown until the season resets and the
              rain starts over.
            </p>
          </div>

          <div className="rule-card reveal">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M11 12H3.5M3.5 12l3.2-3.2M3.5 12l3.2 3.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 12h7.5M20.5 12l-3.2-3.2M20.5 12l-3.2 3.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>No Alliance Survives the Night</h3>

            <p>
              Grouping up is allowed. Trusting each other is not advised.
              The biggest hearts in the standings usually belong to
              whoever struck last.
            </p>
          </div>

          <div className="rule-card reveal">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.8 17a3.3 3.3 0 01-.5-6.56A4.8 4.8 0 0115.8 8.4a3.4 3.4 0 01-.4 8.6H6.8Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.7 12l-2.3 3.6h1.9l-1 3.2 3.3-4.2h-1.9l1.3-2.6Z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>

            <h3>Storm Surges</h3>

            <p>
              Random storms roll across the map, lighting up nearby
              coordinates and doubling the hearts at stake for as long as
              they last.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}