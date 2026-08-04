import "./dashboard.css";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Ticket,
  Clock3,
  Server,
} from "lucide-react";

import RevenueChart from "./components/RevenueChart";

export default function DashboardPage() {
  const stats = [
    {
      title: "Revenue Today",
      value: "$1,245",
      change: "+18%",
      icon: <DollarSign size={24} />,
    },
    {
      title: "Orders Today",
      value: "86",
      change: "+12%",
      icon: <ShoppingCart size={24} />,
    },
    {
      title: "Players Online",
      value: "148",
      change: "+6%",
      icon: <Users size={24} />,
    },
    {
      title: "Open Tickets",
      value: "9",
      change: "-3%",
      icon: <Ticket size={24} />,
    },
    {
      title: "Pending Queue",
      value: "24",
      change: "+4%",
      icon: <Clock3 size={24} />,
    },
    {
      title: "Active Servers",
      value: "5",
      change: "100%",
      icon: <Server size={24} />,
    },
  ];

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Welcome back, Administrator.</p>
        </div>

        <button className="refresh-btn">
          Refresh
        </button>

      </div>

      <div className="dashboard-grid">

        {stats.map((stat) => (
          <div className="kpi-card" key={stat.title}>

            <div className="kpi-top">

              <div>

                <div className="kpi-title">
                  {stat.title}
                </div>

                <div className="kpi-value">
                  {stat.value}
                </div>

              </div>

              <div className="kpi-icon">
                {stat.icon}
              </div>

            </div>

            <div className="kpi-change">
              {stat.change} this week
            </div>

          </div>
        ))}

        <div className="chart-card">

          <div className="card-title">
            <h3>Revenue Overview</h3>
          </div>

          <RevenueChart />

        </div>

        <div className="chart-card">

  <div className="card-title">
    <h3>Revenue Overview</h3>
    <span>Last 7 Days</span>
  </div>

  <div className="chart-area">
    <RevenueChart />
  </div>

</div>

<div className="server-card">

  <div className="card-title">
    <h3>Server Status</h3>
  </div>

  <div className="server-list">

    <div className="server-item">
      <span>🟢 Survival</span>
      <strong>Online</strong>
    </div>

    <div className="server-item">
      <span>🟢 Lobby</span>
      <strong>Online</strong>
    </div>

    <div className="server-item">
      <span>🟡 Minigames</span>
      <strong>Restarting</strong>
    </div>

    <div className="server-item">
      <span>🟢 Proxy</span>
      <strong>Healthy</strong>
    </div>

  </div>

</div>

        <div className="table-card">

          <div className="card-title">
            <h3>Recent Orders</h3>
          </div>

          <p>No recent orders.</p>

        </div>

        <div className="table-card">

          <div className="card-title">
            <h3>Recent Players</h3>
          </div>

          <p>No recent players.</p>

        </div>

      </div>

    </div>
  );
}