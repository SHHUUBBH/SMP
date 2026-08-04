export default function Dashboard() {
  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your Blood Steal SMP store.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Today's Sales</span>
          <h2>£248.97</h2>
        </div>

        <div className="stat-card">
          <span>Orders</span>
          <h2>31</h2>
        </div>

        <div className="stat-card">
          <span>Open Tickets</span>
          <h2>7</h2>
        </div>

        <div className="stat-card">
          <span>Players</span>
          <h2>183</h2>
        </div>
      </div>

      <div className="dashboard-panels">
        <div className="panel">
          <h2>Recent Orders</h2>

          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Player</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#AH9217</td>
                <td>Dhruv</td>
                <td>£19.99</td>
              </tr>

              <tr>
                <td>#AH9216</td>
                <td>Steve</td>
                <td>£12.99</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel">
          <h2>Recent Tickets</h2>

          <ul>
            <li>#1054 — Rank not received</li>
            <li>#1053 — Payment pending</li>
            <li>#1052 — Refund request</li>
          </ul>
        </div>
      </div>
    </div>
  );
}