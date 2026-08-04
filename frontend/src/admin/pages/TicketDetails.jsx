import { Link, useParams } from "react-router-dom";
import InternalNotes from "../components/InternalNotes";
import TicketManagement from "../components/TicketManagement";
import ActivityTimeline from "../components/ActivityTimeline";
import Attachments from "../components/Attachments";




export default function TicketDetails() {
  const { id } = useParams();

  const ticket = {
    id,
    subject: "Rank not received",
    player: "Dhruv",
    email: "dhruv@example.com",
    username: "Dhruv",
    order: "AH-9217",
    category: "Purchase",
    priority: "High",
    status: "Open",
    assigned: "Administrator",
    created: "28 Jul 2026 • 10:24",
  };

  const messages = [
    {
      by: "Player",
      author: "Dhruv",
      time: "10:24",
      text: "I bought Warden Rank but I still haven't received it.",
    },
    {
      by: "Staff",
      author: "Administrator",
      time: "10:31",
      text: "Thanks for reporting it. I'm checking the purchase logs now.",
    },
    {
      by: "Player",
      author: "Dhruv",
      time: "10:33",
      text: "Thank you!",
    },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Ticket #{ticket.id}</h1>
          <p>{ticket.subject}</p>
        </div>

        <Link
          className="btn btn-outline"
          to="/admin/tickets"
        >
          ← Back
        </Link>
      </div>

      <div className="ticket-layout">

        <aside className="ticket-sidebar">

          <div className="panel">
            <h2>Ticket Information</h2>

            <table className="info-table">
              <tbody>

                <tr>
                  <td>Status</td>
                  <td>{ticket.status}</td>
                </tr>

                <tr>
                  <td>Priority</td>
                  <td>{ticket.priority}</td>
                </tr>

                <tr>
                  <td>Category</td>
                  <td>{ticket.category}</td>
                </tr>

                <tr>
                  <td>Assigned</td>
                  <td>{ticket.assigned}</td>
                </tr>

                <tr>
                  <td>Created</td>
                  <td>{ticket.created}</td>
                </tr>

                <tr>
                  <td>Order</td>
                  <td>{ticket.order}</td>
                </tr>

              </tbody>
            </table>

          </div>

          <div className="panel">
            <h2>Player</h2>

            <p><strong>{ticket.username}</strong></p>

            <p>{ticket.email}</p>

            <Link
              to="/admin/customers/1"
              className="btn btn-outline"
            >
              View Customer
            </Link>
          </div>
 <TicketManagement />
        </aside>

        <section className="ticket-chat">

          <div className="panel">

            <h2>Conversation</h2>

            <div className="conversation">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`message ${
                    message.by === "Staff"
                      ? "staff"
                      : "player"
                  }`}
                >
                  <div className="message-header">
                    <strong>{message.author}</strong>

                    <span>{message.time}</span>
                  </div>

                  <p>{message.text}</p>

                </div>

              ))}

            </div>

          </div>

          <div className="panel">

            <h2>Reply</h2>

            <textarea
              rows={6}
              placeholder="Write your reply..."
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <button className="btn btn-primary">
                Send Reply
              </button>

              <button className="btn btn-outline">
                Save Draft
              </button>

              <button className="btn btn-outline">
                Internal Note
              </button>

              <button className="btn btn-danger">
                Close Ticket
              </button>

            </div>

          </div>

             <InternalNotes />

<ActivityTimeline />

<Attachments />

        </section>

      </div>
    </div>
  );
}