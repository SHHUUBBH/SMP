import { Link } from "react-router-dom";

export default function Customers() {
  const customers = [
    {
      id: 1,
      username: "Dhruv",
      email: "dhruv@example.com",
      orders: 6,
      spent: "£72.94",
      rank: "Warden",
      status: "Active",
    },
    {
      id: 2,
      username: "Steve",
      email: "steve@example.com",
      orders: 2,
      spent: "£17.98",
      rank: "Settler",
      status: "Active",
    },
    {
      id: 3,
      username: "Alex",
      email: "alex@example.com",
      orders: 1,
      spent: "£4.99",
      rank: "-",
      status: "Suspended",
    },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage players and view their purchase history.</p>
        </div>
      </div>

      <div className="panel">

        <div className="table-toolbar">
          <input
            type="search"
            placeholder="Search username or email..."
          />

          <select>
            <option>All Statuses</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Lifetime Spend</th>
              <th>Rank</th>
              <th>Status</th>
              <th width="220">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td>{customer.orders}</td>
                <td>{customer.spent}</td>
                <td>{customer.rank}</td>
                <td>{customer.status}</td>

                <td>
                  <Link
                    className="btn btn-outline compact"
                    to={`/admin/customers/${customer.id}`}
                  >
                    View
                  </Link>

                  <button className="btn btn-outline compact">
                    Orders
                  </button>

                  <button className="btn btn-danger compact">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}