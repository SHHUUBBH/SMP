export default function Orders() {
  const orders = [
    {
      id: "AH-9217",
      player: "Dhruv",
      product: "Soulbound Bundle",
      total: "£19.99",
      status: "Completed",
      date: "28 Jul 2026",
    },
    {
      id: "AH-9216",
      player: "Steve",
      product: "Warden Rank",
      total: "£12.99",
      status: "Pending",
      date: "28 Jul 2026",
    },
    {
      id: "AH-9215",
      player: "Alex",
      product: "Relic Crate",
      total: "£4.99",
      status: "Refunded",
      date: "27 Jul 2026",
    },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage all purchases made through your store.</p>
        </div>

        <button className="btn btn-primary">
          Export Orders
        </button>
      </div>

      <div className="panel">
        <div className="table-toolbar">
          <input
            type="search"
            placeholder="Search orders..."
          />

          <select>
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Refunded</option>
          </select>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Player</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.player}</td>
                <td>{order.product}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}