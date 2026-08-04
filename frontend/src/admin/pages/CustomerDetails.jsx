import { Link, useParams } from "react-router-dom";

export default function CustomerDetails() {
  const { id } = useParams();

  const customer = {
    id,
    username: "Dhruv",
    email: "dhruv@example.com",
    uuid: "550e8400-e29b-41d4-a716-446655440000",
    rank: "Warden",
    joined: "12 Jun 2026",
    lastSeen: "5 minutes ago",
    orders: 6,
    spent: "£72.94",
    tickets: 3,
  };

  const recentOrders = [
    {
      id: "AH-9217",
      item: "Soulbound Bundle",
      total: "£19.99",
      status: "Completed",
    },
    {
      id: "AH-9180",
      item: "Warden Rank",
      total: "£12.99",
      status: "Completed",
    },
    {
      id: "AH-9102",
      item: "Relic Crate",
      total: "£4.99",
      status: "Refunded",
    },
  ];

  const supportTickets = [
    {
      id: 1054,
      subject: "Rank not received",
      status: "Open",
    },
    {
      id: 1048,
      subject: "Payment issue",
      status: "Closed",
    },
    {
      id: 1022,
      subject: "General question",
      status: "Closed",
    },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>{customer.username}</h1>
          <p>Customer Profile</p>
        </div>

        <Link
          className="btn btn-outline"
          to="/admin/customers"
        >
          ← Back
        </Link>
      </div>

      <div className="customer-grid">

        <div className="panel">
          <h2>Player Information</h2>

          <table className="info-table">
            <tbody>
              <tr>
                <td>Username</td>
                <td>{customer.username}</td>
              </tr>

              <tr>
                <td>Email</td>
                <td>{customer.email}</td>
              </tr>

              <tr>
                <td>UUID</td>
                <td>{customer.uuid}</td>
              </tr>

              <tr>
                <td>Current Rank</td>
                <td>{customer.rank}</td>
              </tr>

              <tr>
                <td>Joined</td>
                <td>{customer.joined}</td>
              </tr>

              <tr>
                <td>Last Seen</td>
                <td>{customer.lastSeen}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel">
          <h2>Statistics</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <span>Lifetime Spend</span>
              <h3>{customer.spent}</h3>
            </div>

            <div className="stat-card">
              <span>Orders</span>
              <h3>{customer.orders}</h3>
            </div>

            <div className="stat-card">
              <span>Tickets</span>
              <h3>{customer.tickets}</h3>
            </div>

            <div className="stat-card">
              <span>Rank</span>
              <h3>{customer.rank}</h3>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>Recent Orders</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Product</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.item}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <h2>Support Tickets</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {supportTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <Link to={`/admin/tickets/${ticket.id}`}>
                      #{ticket.id}
                    </Link>
                  </td>

                  <td>{ticket.subject}</td>

                  <td>{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <h2>Quick Actions</h2>

          <div className="action-grid">
            <button className="btn btn-primary">
              Grant Rank
            </button>

            <button className="btn btn-outline">
              Remove Rank
            </button>

            <button className="btn btn-outline">
              Refund Order
            </button>

            <button className="btn btn-outline">
              Create Ticket
            </button>

            <button className="btn btn-danger">
              Suspend Customer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}