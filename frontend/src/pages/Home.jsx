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
}import "./styles/global.css";
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