import { tickets } from "../data/tickets";
import TicketCard from "../components/TicketCard";

export default function Tickets() {
  return (
    <>
      <div className="page-header">
        <h1>Support Tickets</h1>

        <input
          placeholder="Search tickets..."
        />
      </div>

      <div className="ticket-list">
        {tickets.map(ticket => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
          />
        ))}
      </div>
    </>
  );
}