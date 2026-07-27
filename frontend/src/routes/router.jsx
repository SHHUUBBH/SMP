import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Store from "../pages/Store";
import Tickets from "../pages/Tickets";
import Profile from "../pages/Profile";
import Rules from "../pages/Rules";
import Staff from "../pages/Staff";
import Vote from "../pages/Vote";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/tickets",
    element: <Tickets />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/rules",
    element: <Rules />,
  },
  {
    path: "/staff",
    element: <Staff />,
  },
  {
    path: "/vote",
    element: <Vote />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);