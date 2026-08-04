import {
  PanelLeft,
  Search,
  Bell,
  Plus,
  Activity,
  CircleUserRound,
  ChevronDown,
} from "lucide-react";

import "./header.css";

export default function Header({ title = "Dashboard", subtitle = "Overview of your Minecraft Network", onToggleSidebar }) {
  return (
    <header className="admin-header">

      {/* LEFT */}
      <div className="header-left">

        <button
          className="header-toggle"
          onClick={onToggleSidebar}
        >
          <PanelLeft size={20} />
        </button>

        <div className="header-title">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

      </div>

      {/* CENTER */}
      <div className="header-center">

        <div className="header-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search players, orders, tickets..."
          />

          <span className="search-shortcut">
            Ctrl + K
          </span>

        </div>

      </div>

      {/* RIGHT */}
      <div className="header-right">

        <button className="header-icon notification-btn">

          <Bell size={20} />

          <span className="notification-badge">
            3
          </span>

        </button>

        <button className="header-icon">

          <Plus size={20} />

        </button>

        <div className="server-status">

          <Activity
            size={16}
            className="server-status-icon"
          />

          <span>All Servers Online</span>

        </div>

        <button className="profile-button">

          <CircleUserRound size={34} />

          <div className="profile-info">

            <strong>Dhruv</strong>

            <small>Owner</small>

          </div>

          <ChevronDown size={18} />

        </button>

      </div>

    </header>
  );
}