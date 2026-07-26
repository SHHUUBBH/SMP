export default function Shop() {
  return (
    <section className="section shop" id="shop">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Support the Town</span>

          <h2>Choose your rank.</h2>

          <p>
            Ranks fund the server and unlock cosmetics — never power.
            Hearts are earned in the rain, not bought.
          </p>
        </div>

        <div className="shop-grid">

          {/* PLAN 1 */}
          <div className="plan reveal">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M15 9l-2 6-6 2 2-6 6-2Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Lorem</h3>

            <div className="price">Free</div>

            <div className="price-note">
              Default rank
            </div>

            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Lorem ipsum dolor sit
              </li>

              <li>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Consectetur adipiscing elit
              </li>

              <li>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sed do eiusmod tempor
              </li>

              <li>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Ut labore et dolore
              </li>
            </ul>

            <a href="#" className="btn btn-outline">
              Choose Lorem
            </a>
          </div>

          {/* PLAN 2 */}
          <div className="plan reveal">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M15.5 4.5A8 8 0 1019.5 15 6.5 6.5 0 0115.5 4.5Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Ipsum Dolor</h3>

            <div className="price">
              $6.99 <sup>one-time</sup>
            </div>

            <div className="price-note">
              Cosmetic rank
            </div>

            <ul>
              <li>✓ Everything in Lorem</li>
              <li>✓ Magna aliqua enim ad</li>
              <li>✓ Minim veniam quis</li>
              <li>✓ Nostrud exercitation</li>
            </ul>

            <a href="#" className="btn btn-outline">
              Choose Ipsum Dolor
            </a>
          </div>

          {/* PLAN 3 */}
          <div className="plan featured reveal">
            <span className="tag">Most Chosen</span>

            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 4c5 0 9 4 9 9a5 5 0 01-5 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M5 20L15.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3>Sit Amet</h3>

            <div className="price">
              $14.99 <sup>one-time</sup>
            </div>

            <div className="price-note">
              Cosmetic rank
            </div>

            <ul>
              <li>✓ Everything in Ipsum Dolor</li>
              <li>✓ Ullamco laboris nisi</li>
              <li>✓ Aliquip ex ea commodo</li>
              <li>✓ Consequat duis aute irure</li>
              <li>✓ In reprehenderit voluptate</li>
            </ul>

            <a href="#" className="btn btn-primary">
              Choose Sit Amet
            </a>
          </div>

          {/* PLAN 4 */}
          <div className="plan reveal">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 17h16l-1.3-7-3.7 3-3-5.5-3 5.5-3.7-3L4 17Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Consectetur</h3>

            <div className="price">
              $24.99 <sup>one-time</sup>
            </div>

            <div className="price-note">
              Cosmetic rank
            </div>

            <ul>
              <li>✓ Everything in Sit Amet</li>
              <li>✓ Velit esse cillum dolore</li>
              <li>✓ Eu fugiat nulla pariatur</li>
              <li>✓ Excepteur sint occaecat</li>
              <li>✓ Non proident sunt culpa</li>
            </ul>

            <a href="#" className="btn btn-outline">
              Choose Consectetur
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}