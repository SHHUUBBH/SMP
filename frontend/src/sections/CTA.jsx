import SpecularButton from "@/components/ui/SpecularButton";

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

            <SpecularButton
              size="md"
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
              onClick={() => { window.location.href = '#shop'; }}
            >
              Support the Server
            </SpecularButton>
          </div>
        </div>
      </div>
    </section>
  );
}