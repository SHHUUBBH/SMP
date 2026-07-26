import "./styles/global.css";
import "./styles/store.css";

import useLandingEffects from "./hooks/useLandingEffects";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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
import { StoreProvider, StoreLayout, StorePage, ProductPage, CartPage, CheckoutPage, SuccessPage, AccountPage, PurchasesPage, SupportPage, NewTicketPage, TicketPage } from "./store/StoreApp";

function LandingPage() {
  useLandingEffects();
  return <><canvas id="rain"></canvas><div className="atmosphere"></div><div className="flash"></div><Navbar /><main><Hero /><About /><Mechanics /><Leaderboard /><Shop /><Staff /><FAQ /><CTA /></main><Footer /></>;
}

export default function App() {
  return <BrowserRouter><LaserCursor /><AnimatedApp /></BrowserRouter>;
}

function AnimatedApp() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <StoreProvider><AnimatePresence mode="wait" initial={false}><motion.div
      key={location.pathname}
      className="route-transition"
      initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
      transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
    ><Routes location={location}>
      <Route path="/" element={<LandingPage />} />
      <Route element={<StoreLayout />}>
        <Route path="/store" element={<StorePage />} /><Route path="/store/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="/checkout/success" element={<SuccessPage />} />
        <Route path="/account" element={<AccountPage />} /><Route path="/account/purchases" element={<PurchasesPage />} />
        <Route path="/support" element={<SupportPage />} /><Route path="/support/new" element={<NewTicketPage />} /><Route path="/support/ticket/:id" element={<TicketPage />} />
      </Route>
    </Routes></motion.div></AnimatePresence></StoreProvider>
  );
}
