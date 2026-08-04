import { Link } from "react-router-dom";

export default function TicketCard({ ticket }) {
  return (
    <Link
      className="ticket-card"
      to={`/admin/tickets/${ticket.id}`}
    >
      <div>
        <strong>#{ticket.id}</strong>

        <h3>{ticket.subject}</h3>

        <p>{ticket.player}</p>
      </div>

      <div>
        <span>{ticket.status}</span>
        <small>{ticket.updated}</small>
      </div>
    </Link>
  );
}