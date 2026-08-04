import "./styles/global.css";
import "./styles/store.css";

import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import useLandingEffects from "./hooks/useLandingEffects";

import Navbar from "./layout/Navbar";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Mechanics from "./sections/Mechanics";
import Leaderboard from "./sections/Leaderboard";
import Shop from "./sections/Shop";
import Staff from "./sections/Staff";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";

import LaserCursor from "./components/LaserCursor";

/* ===========================
   Admin
=========================== */

import AdminLayout from "./admin/layout/AdminLayout";

import DashboardPage from "./admin/dashboard/DashboardPage";

import Players from "./admin/pages/Players";
import PlayerDetails from "./admin/pages/PlayerDetails";

import Punishments from "./admin/pages/Punishments";

import Tickets from "./admin/pages/Tickets";
import TicketDetails from "./admin/pages/TicketDetails";

import Orders from "./admin/pages/Orders";

import Products from "./admin/pages/Products";

import Customers from "./admin/pages/Customers";
import CustomerDetails from "./admin/pages/CustomerDetails";

import Servers from "./admin/pages/Servers";

import Analytics from "./admin/pages/Analytics";

import Settings from "./admin/pages/Settings";

/* ===========================
   Store
=========================== */

import {
  StoreProvider,
  StoreLayout,
  StorePage,
  ProductPage,
  CartPage,
  CheckoutPage,
  SuccessPage,
  AccountPage,
  PurchasesPage,
  SupportPage,
  NewTicketPage,
  TicketPage,
} from "./store/StoreApp";

function LandingPage() {
  useLandingEffects();

  return (
    <>
      <canvas id="rain"></canvas>

      <div className="atmosphere"></div>
      <div className="flash"></div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Mechanics />
        <Leaderboard />
        <Shop />
        <Staff />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "blood");
  }, []);

  return (
    <BrowserRouter>
      <LaserCursor />

      <StoreProvider>
        <Routes>

          {/* ================= LANDING ================= */}

          <Route
            path="/"
            element={<LandingPage />}
          />

          {/* ================= STORE ================= */}

          <Route
            path="/store"
            element={<StoreLayout />}
          >
            <Route index element={<StorePage />} />

            <Route
              path="product/:id"
              element={<ProductPage />}
            />

            <Route
              path="cart"
              element={<CartPage />}
            />

            <Route
              path="checkout"
              element={<CheckoutPage />}
            />

            <Route
              path="success"
              element={<SuccessPage />}
            />

            <Route
              path="account"
              element={<AccountPage />}
            />

            <Route
              path="purchases"
              element={<PurchasesPage />}
            />

            <Route
              path="support"
              element={<SupportPage />}
            />

            <Route
              path="support/new"
              element={<NewTicketPage />}
            />

            <Route
              path="support/:id"
              element={<TicketPage />}
            />
          </Route>

          {/* ================= ADMIN ================= */}

          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route
              index
              element={<DashboardPage />}
            />

            {/* Players */}

            <Route
              path="players"
              element={<Players />}
            />

            <Route
              path="players/:id"
              element={<PlayerDetails />}
            />

            {/* Punishments */}

            <Route
              path="punishments"
              element={<Punishments />}
            />

            {/* Tickets */}

            <Route
              path="tickets"
              element={<Tickets />}
            />

            <Route
              path="tickets/:id"
              element={<TicketDetails />}
            />

            {/* Store */}

            <Route
              path="orders"
              element={<Orders />}
            />

            <Route
              path="products"
              element={<Products />}
            />

            {/* Customers */}

            <Route
              path="customers"
              element={<Customers />}
            />

            <Route
              path="customers/:id"
              element={<CustomerDetails />}
            />

            {/* Servers */}

            <Route
              path="servers"
              element={<Servers />}
            />

            {/* Analytics */}

            <Route
              path="analytics"
              element={<Analytics />}
            />

            {/* Settings */}

            <Route
              path="settings"
              element={<Settings />}
            />
          </Route>

          {/* ================= 404 ================= */}

          <Route
            path="*"
            element={
              <div
                style={{
                  color: "#fff",
                  padding: "50px",
                  fontSize: "24px",
                }}
              >
                404 - Page Not Found
              </div>
            }
          />

        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}