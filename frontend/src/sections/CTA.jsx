export default function CTA() {
  return (
    <section className="cta-band">
      <div className="container">
        <div className="cta-card reveal">
          <div>
            <span className="eyebrow">
              The Storm Is Waiting
            </span>

            <h2>
              One login. Ten hearts. No second chances.
            </h2>

            <p>
              Join Alone Hometown today and find out whether your name ends
              up on the Hall of the Reaping—or disappears with everyone
              else's.
            </p>
          </div>

          <div className="cta-actions">
            <button
              className="btn btn-primary copy-ip"
              data-ip="play.alonehometown.net"
            >
              Copy Server IP
            </button>

            <a
              className="btn btn-outline"
              href="#shop"
            >
              Support the Server
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}