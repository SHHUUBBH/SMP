import { useState } from "react";

const faqItems = [
  {
    q: "What exactly is a Bloodsteal SMP?",
    a: "Every player starts with ten hearts. Kill someone and two of their hearts become yours, permanently, up to a cap of twenty. It rewards aggression and punishes carelessness — the map gets more dangerous the better you do."
  },
  {
    q: "What happens when I run out of hearts?",
    a: "You're eliminated for the rest of the season. You can still spectate, hang out in the Discord, and jump straight back in the moment Season IV opens."
  },
  {
    q: "Is Hometown Java, Bedrock, or both?",
    a: "Both. Bedrock players connect through the same address and port, with full cross-play against Java players."
  },
  {
    q: "Can I ever get stolen hearts back?",
    a: "Only by taking them the same way they were taken from you. There's no shop item and no command that hands hearts back — that's the whole point."
  },
  {
    q: "Is raiding and griefing allowed?",
    a: "Spawn and the town square are protected. Past the border markers, your base is only as safe as you make it — traps, raids, and betrayal are all part of the game."
  },
  {
    q: "How do I report a rule-breaker?",
    a: "Open a ticket in the Discord with usernames, timestamps, and any evidence you have. The Watch reviews every report within 24 hours."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">
            Before You Jump In
          </span>

          <h2>Questions</h2>
        </div>

        <div className="faq-list reveal">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${
                open === index ? "open" : ""
              }`}
            >
              <button
                className="faq-q"
                aria-expanded={open === index}
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
              >
                <span>{item.q}</span>

                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="faq-a">
                <div className="faq-a-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}