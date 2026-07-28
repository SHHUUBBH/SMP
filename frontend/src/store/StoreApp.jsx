import { createContext, useContext, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../sections/Footer";

const products = [
  {
    id: "warden",
    name: "Warden Rank",
    price: 12.99,
    type: "Rank",
    icon: "W",
    accent: "red",
    description: "Command the frontier with a permanent Warden rank.",
    perks: [
      "Warden chat prefix",
      "4 homes",
      "Priority queue",
      "7 cosmetic keys",
    ],
  },
  {
    id: "relic",
    name: "Relic Crate",
    price: 4.99,
    type: "Crates",
    icon: "R",
    accent: "blue",
    description: "A sealed cache of rare cosmetics and server rewards.",
    perks: [
      "8 possible rewards",
      "Exclusive trail",
      "Rare tag chance",
      "Instant delivery",
    ],
  },
  {
    id: "soul",
    name: "Soulbound Bundle",
    price: 19.99,
    type: "Bundles",
    icon: "S",
    accent: "gold",
    description: "Everything you need to leave a mark on the season.",
    perks: [
      "15 cosmetic keys",
      "Custom kill message",
      "30 day booster",
      "Soulbound title",
    ],
  },
  {
    id: "ember",
    name: "Ember Keys",
    price: 7.49,
    type: "Crates",
    icon: "E",
    accent: "red",
    description: "Three Ember crate keys for the risk-takers.",
    perks: [
      "3 Ember keys",
      "Cosmetic rewards",
      "Instant delivery",
      "No expiry",
    ],
  },
  {
    id: "settler",
    name: "Settler Rank",
    price: 6.99,
    type: "Rank",
    icon: "S",
    accent: "blue",
    description: "A small upgrade for players building their first legacy.",
    perks: [
      "Settler chat prefix",
      "2 homes",
      "Player vault",
      "3 cosmetic keys",
    ],
  },
  {
    id: "name-tag",
    name: "Name Tag Token",
    price: 2.99,
    type: "Cosmetics",
    icon: "N",
    accent: "gold",
    description: "Choose a colour and make your name stand out.",
    perks: [
      "One name colour",
      "Apply anytime",
      "Permanent unlock",
      "Instant delivery",
    ],
  },
];
const orders = [
  {
    id: "AH-8472",
    date: "July 21, 2026",
    total: 19.99,
    status: "Delivered",
    items: "Soulbound Bundle",
  },
  {
    id: "AH-8138",
    date: "June 10, 2026",
    total: 12.99,
    status: "Delivered",
    items: "Warden Rank",
  },
];
const seededTickets = [
  {
    id: "1042",
    subject: "Missing Relic Crate rewards",
    category: "Purchase help",
    status: "Open",
    updated: "2 hours ago",
    messages: [
      {
        by: "You",
        text: "I opened my crate, but the rewards did not arrive.",
        time: "Today, 14:12",
      },
      {
        by: "The Watch",
        text: "We have found your purchase. A staff member is checking the delivery log.",
        time: "Today, 14:38",
      },
    ],
  },
  {
    id: "1028",
    subject: "Question about rank perks",
    category: "General",
    status: "Resolved",
    updated: "June 19",
    messages: [
      {
        by: "You",
        text: "Does Warden include extra homes?",
        time: "June 19, 10:04",
      },
      {
        by: "The Watch",
        text: "Yes. Warden includes four homes and priority queue access.",
        time: "June 19, 10:16",
      },
    ],
  },
];
const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [tickets, setTickets] = useState(seededTickets);

  const add = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...current, { ...product, qty: 1 }];
    });
  };

  const update = (id, qty) => {
    setCart((current) => {
      if (qty <= 0) return current.filter((item) => item.id !== id);
      return current.map((item) =>
        item.id === id ? { ...item, qty } : item
      );
    });
  };

  const clear = () => setCart([]);

  const createTicket = (ticket) => {
    setTickets((current) => [ticket, ...current]);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        add,
        update,
        clear,
        tickets,
        createTicket,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

const useStore = () => useContext(StoreContext);
const money = (n) => `$${n.toFixed(2)}`;
function Atmosphere() {
  return (
    <>
      <div className="store-atmosphere" />
      <div className="store-grid" />
    </>
  );
}
export function StoreLayout() {
  return (
    <>
      <Atmosphere />
      <Navbar />

      <main className="store-main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
 
function Head({ eyebrow = "Alone Hometown Store", title, copy, action }) {
  return (
    <section className="store-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <div className="store-head-row">
          <div>
            <h1>{title}</h1>
            {copy && <p>{copy}</p>}
          </div>
          {action}
        </div>
      </div>
    </section>
  );
}
function Mark({ product, large = false }) {
  return (
    <div className={`product-mark ${product.accent} ${large ? "large" : ""}`}>
      <span>{product.icon}</span>
    </div>
  );
}
function CartLink() {
  const { cart } = useStore();
  return (
    <Link className="cart-link" to="/store/cart">
      Cart <b>{cart.reduce((n, i) => n + i.qty, 0)}</b>
    </Link>
  );
}
function Card({ product }) {
  const { add } = useStore();

  return (
    <article className="product-card">
      <Link
        to={`/store/product/${product.id}`}
        className="product-image"
      >
        <Mark product={product} />
      </Link>

      <div className="product-card-copy">
        <span className="product-type">{product.type}</span>

        <h2>
          <Link to={`/store/product/${product.id}`}>
            {product.name}
          </Link>
        </h2>

        <p>{product.description}</p>

        <div className="product-card-bottom">
          <strong>{money(product.price)}</strong>

          <button
            className="btn btn-outline compact"
            onClick={() => add(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
export function StorePage() {
  const [f, setF] = useState("All"),
    filters = ["All", "Rank", "Crates", "Bundles", "Cosmetics"],
    shown = f === "All" ? products : products.filter((p) => p.type === f);
  return (
    <>
      <Head
        title="Supply the next chapter."
        copy="Choose a reward, support the server, and get back to the world you are building."
        action={<CartLink />}
      />
      <section className="store-section">
        <div className="container">
          <div className="store-toolbar">
            <div className="filter-row">
              {filters.map((x) => (
                <button
                  key={x}
                  className={f === x ? "active" : ""}
                  onClick={() => setF(x)}
                >
                  {x}
                </button>
              ))}
            </div>
            <span>{shown.length} items available</span>
          </div>
          <div className="product-grid">
            {shown.map((p) => (
              <Card key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export function ProductPage() {
  const { id } = useParams(),
    p = products.find((x) => x.id === id) || products[0],
    { add } = useStore();
  return (
    <section className="product-detail">
      <div className="container">
        <Link className="back-link" to="/store">
          ← Back to store
        </Link>
        <div className="product-detail-grid">
          <div className="product-showcase">
            <Mark product={p} large />
            <span className="showcase-glow" />
          </div>
          <div>
            <span className="product-type">{p.type}</span>
            <h1>{p.name}</h1>
            <p className="detail-lede">
              {p.description} Every purchase directly helps keep Alone Hometown
              online and evolving.
            </p>
            <strong className="detail-price">{money(p.price)}</strong>
            <button
              className="btn btn-primary detail-button"
              onClick={() => add(p)}
            >
              Add to cart
            </button>
            <div className="perk-list">
              <h2>Included with this reward</h2>
              {p.perks.map((x) => (
                <p key={x}>
                  <span>✦</span>
                  {x}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Summary() {
  const { cart } = useStore(),
    total = cart.reduce((n, i) => n + i.price * i.qty, 0);
  return (
    <aside className="summary-card">
      <h2>Order summary</h2>
      {cart.length ? (
        <>
          {cart.map((i) => (
            <div className="summary-line" key={i.id}>
              <span>
                {i.name} <i>×{i.qty}</i>
              </span>
              <b>{money(i.price * i.qty)}</b>
            </div>
          ))}
          <div className="summary-total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>
        </>
      ) : (
        <p>Your cart is waiting for a reward.</p>
      )}
    </aside>
  );
}
export function CartPage() {
  const { cart, update } = useStore();
  return (
    <>
      <Head
        eyebrow="Your inventory"
        title="Cart"
        copy="Review your rewards before checkout."
      />
      <section className="store-section">
        <div className="container cart-layout">
          <div className="cart-card">
            {cart.length ? (
              cart.map((i) => (
                <div className="cart-item" key={i.id}>
                  <Mark product={i} />
                  <div className="cart-item-copy">
                    <h2>{i.name}</h2>
                    <span>{i.type} · Instant delivery</span>
                  </div>
                  <div className="quantity">
                    <button onClick={() => update(i.id, i.qty - 1)}>−</button>
                    <b>{i.qty}</b>
                    <button onClick={() => update(i.id, i.qty + 1)}>+</button>
                  </div>
                  <strong>{money(i.price * i.qty)}</strong>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <span>✦</span>
                <h2>Your cart is empty</h2>
                <p>Find a reward that fits your next chapter.</p>
                <Link className="btn btn-primary" to="/store">
                  Browse the store
                </Link>
              </div>
            )}
          </div>
          <div>
            <Summary />
            {cart.length > 0 && (
              <Link className="btn btn-primary checkout-link" to="/store/checkout">
                Continue to checkout
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export function CheckoutPage() {
  const { cart, clear } = useStore(),
    nav = useNavigate(),
    [busy, setBusy] = useState(false);
  if (!cart.length) return <CartPage />;
  const submit = (e) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      clear();
      nav("/store/success");
    }, 650);
  };
  return (
    <>
      <Head
        eyebrow="Secure checkout"
        title="Almost there."
        copy="Your purchase will be delivered to your in-game account."
      />
      <section className="store-section">
        <div className="container checkout-layout">
          <form className="checkout-form" onSubmit={submit}>
            <section>
              <h2>Account details</h2>
              <div className="form-grid">
                <label>
                  Minecraft username
                  <input required placeholder="Your in-game name" />
                </label>
                <label>
                  Email address
                  <input type="email" required placeholder="you@example.com" />
                </label>
              </div>
            </section>
            <section>
              <h2>Payment details</h2>
              <label>
                Cardholder name
                <input required placeholder="Name on card" />
              </label>
              <label>
                Card number
                <input required placeholder="0000 0000 0000 0000" />
              </label>
              <div className="form-grid">
                <label>
                  Expiry date
                  <input required placeholder="MM / YY" />
                </label>
                <label>
                  Security code
                  <input required placeholder="CVC" />
                </label>
              </div>
            </section>
            <button className="btn btn-primary pay-button">
              {busy ? "Placing order…" : "Place order"}
            </button>
            <p className="secure-note">
              🔒 Payments are securely processed. No card details are stored.
            </p>
          </form>
          <Summary />
        </div>
      </section>
    </>
  );
}
export function SuccessPage() {
  return (
    <section className="success-page">
      <div className="container">
        <div className="success-card">
          <span className="success-icon">✓</span>
          <span className="eyebrow">Order confirmed</span>
          <h1>Your next chapter is ready.</h1>
          <p>
            Your purchase has been received and will arrive in-game shortly. A
            receipt has been sent to your email.
          </p>
          <div className="success-order">
            <span>Order reference</span>
            <b>AH-9217</b>
          </div>
          <div className="btn-row center">
            <Link className="btn btn-primary" to="/store/purchases">
              View purchases
            </Link>
            <Link className="btn btn-outline" to="/store">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
function AccountNav() {
  return (
    <nav className="account-nav">
      <NavLink end to="/store/account">
        Overview
      </NavLink>
      <NavLink to="/store/purchases">Purchases</NavLink>
      <NavLink to="/store/support">Support</NavLink>
    </nav>
  );
}
function AccountShell({ title, copy, children }) {
  return (
    <>
      <Head eyebrow="Player account" title={title} copy={copy} />
      <section className="store-section">
        <div className="container account-layout">
          <AccountNav />
          <div>{children}</div>
        </div>
      </section>
    </>
  );
}
function PurchaseList({ limit }) {
  return (
    <div className="purchase-list">
      {orders.slice(0, limit || orders.length).map((o) => (
        <div className="purchase-row" key={o.id}>
          <div>
            <b>{o.items}</b>
            <span>
              {o.id} · {o.date}
            </span>
          </div>
          <span className="status delivered">{o.status}</span>
          <strong>{money(o.total)}</strong>
        </div>
      ))}
    </div>
  );
}
export function AccountPage() {
  return (
    <AccountShell
      title="Welcome back, Raven."
      copy="Your rewards, purchases, and support requests in one place."
    >
      <div className="account-banner">
        <div className="player-avatar">R</div>
        <div>
          <span>Raven</span>
          <p>Joined Season III · play.alonehometown.net</p>
        </div>
        <Link className="btn btn-outline compact" to="/store">
          Visit store
        </Link>
      </div>
      <div className="stat-grid">
        <div>
          <span>Rewards owned</span>
          <b>12</b>
        </div>
        <div>
          <span>Orders placed</span>
          <b>2</b>
        </div>
        <div>
          <span>Open tickets</span>
          <b>1</b>
        </div>
      </div>
      <div className="panel-heading">
        <h2>Recent purchases</h2>
        <Link to="/store/purchases">View all →</Link>
      </div>
      <PurchaseList limit={1} />
    </AccountShell>
  );
}
export function PurchasesPage() {
  return (
    <AccountShell
      title="Purchase history"
      copy="Every reward you have claimed across the season."
    >
      <div className="panel-heading">
        <h2>All purchases</h2>
        <span className="muted">{orders.length} orders</span>
      </div>
      <PurchaseList />
    </AccountShell>
  );
}
export function SupportPage() {
  const { tickets } = useStore();

  return (
    <>
      <Head
        eyebrow="The Watch is here"
        title="Support"
        copy="Need a hand with a purchase or server question? Send a ticket and we will help you out."
        action={
          <Link className="btn btn-primary" to="/store/support/new">
            New ticket
          </Link>
        }
      />

      <section className="store-section">
        <div className="container support-layout">
          <div>
            <div className="panel-heading">
              <h2>Your tickets</h2>
              <span className="muted">{tickets.length} total</span>
            </div>

            <div className="ticket-list">
              {tickets.map((t) => (
                <Link
                  key={t.id}
                  to={`/store/support/${t.id}`}
                  className="ticket-row"
                >
                  <div>
                    <span className="ticket-id">
                      #{t.id} · {t.category}
                    </span>

                    <h2>{t.subject}</h2>

                    <p>Updated {t.updated}</p>
                  </div>

                  <span
                    className={`status ${
                      t.status === "Open" ? "open" : "delivered"
                    }`}
                  >
                    {t.status}
                  </span>

                  <span>→</span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="help-card">
            <span>✦</span>

            <h2>Before you open a ticket</h2>

            <p>
              Include your Minecraft username and purchase reference so we can
              resolve things faster.
            </p>

            <Link to="/store/support/new">
              Open a new ticket →
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
export function NewTicketPage() {
  const { createTicket } = useStore(),
    nav = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget),
      id = String(Math.floor(1050 + Math.random() * 900));
    createTicket({
      id,
      subject: d.get("subject"),
      category: d.get("category"),
      status: "Open",
      updated: "just now",
      messages: [{ by: "You", text: d.get("message"), time: "Just now" }],
    });
    nav(`/store/support/${id}`);
  };
  return (
    <>
      <Head
        eyebrow="Support request"
        title="Open a ticket"
        copy="Tell us what happened. The Watch usually replies within one business day."
      />
      <section className="store-section">
        <div className="container narrow">
          <form className="ticket-form" onSubmit={submit}>
            <label>
              What can we help with?
              <select name="category">
                <option>Purchase help</option>
                <option>Account issue</option>
                <option>General</option>
              </select>
            </label>
            <label>
              Subject
              <input name="subject" required placeholder="A short summary" />
            </label>
            <label>
              Minecraft username
              <input required placeholder="Your in-game name" />
            </label>
            <label>
              Message
              <textarea
                name="message"
                required
                rows="6"
                placeholder="Share as much detail as you can…"
              />
            </label>
            <button className="btn btn-primary">Send ticket</button>
          </form>
        </div>
      </section>
    </>
  );
}
export function TicketPage() {
  const { id } = useParams(),
    { tickets } = useStore(),
    t = tickets.find((x) => x.id === id) || tickets[0];
  return (
    <>
      <Head
        eyebrow={`Ticket #${t.id}`}
        title={t.subject}
        copy={`Opened under ${t.category}.`}
      />
      <section className="store-section">
        <div className="container narrow">
          <div className="ticket-header">
            <span
              className={`status ${t.status === "Open" ? "open" : "delivered"}`}
            >
              {t.status}
            </span>
            <Link to="/store/support">← All tickets</Link>
          </div>
          <div className="thread">
            {t.messages.map((m, i) => (
              <article
                className={`message ${i % 2 ? "staff" : ""}`}
                key={`${m.by}-${m.time}`}
              >
                <div className="message-meta">
                  <b>{m.by}</b>
                  <span>{m.time}</span>
                </div>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
          <form className="reply-form" onSubmit={(e) => e.preventDefault()}>
            <textarea rows="4" placeholder="Write a reply…" />
            <button className="btn btn-primary">Send reply</button>
          </form>
        </div>
      </section>
    </>
  );
}
