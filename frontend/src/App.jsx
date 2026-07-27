import "./styles/global.css";
import "./styles/store.css";

import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/store/*"
          element={
            <StoreProvider>
              <StoreLayout>
                <Routes>
                  <Route index element={<StorePage />} />
                  <Route path="product/:slug" element={<ProductPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="success" element={<SuccessPage />} />
                  <Route path="account" element={<AccountPage />} />
                  <Route path="purchases" element={<PurchasesPage />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route path="support/new" element={<NewTicketPage />} />
                  <Route path="support/:ticketId" element={<TicketPage />} />
                </Routes>
              </StoreLayout>
            </StoreProvider>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "blood");
  }, []);

  return (
    <BrowserRouter>
      <LaserCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
