import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Shield,
  ShoppingCart,
  Server,
  BarChart3,
  Ticket,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },

  {
    title: "Players",
    icon: Users,
    path: "/admin/players",
  },

  {
    title: "Punishments",
    icon: Shield,
    path: "/admin/punishments",
  },

  {
    title: "Servers",
    icon: Server,
    path: "/admin/servers",
  },

  {
    title: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
  },

  {
    title: "Products",
    icon: ShoppingCart,
    path: "/admin/products",
  },

  {
    title: "Customers",
    icon: Users,
    path: "/admin/customers",
  },

  {
    title: "Tickets",
    icon: Ticket,
    path: "/admin/tickets",
  },

  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="sidebar-logo">

        <div className="logo-container">
          <span className="logo-main">
            {collapsed ? "BS" : "BLOODSTEAL"}
          </span>

          {!collapsed && (
            <span className="logo-sub">
              ADMIN PANEL
            </span>
          )}
        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>

      </div>

      <nav className="sidebar-nav">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/admin"}
            >
              <span className="menu-icon">
                <Icon size={20} />
              </span>

              {!collapsed && (
                <span className="menu-text">
                  {item.title}
                </span>
              )}
            </NavLink>
          );
        })}

      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <strong>BloodSteal SMP</strong>
          <small>v1.0.0</small>
        </div>
      )}

    </aside>
  );
}