import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import "./layout.css";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-layout">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main className="admin-main">

        <Header
          title="Dashboard"
          subtitle="Overview of your Minecraft Network"
          onToggleSidebar={() => setCollapsed(!collapsed)}
        />

        <div className="admin-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}