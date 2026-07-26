import "./styles/global.css";

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

export default function App() {
  useLandingEffects();

  return (
    <>
      <canvas id="rain"></canvas>

      <div className="atmosphere"></div>
      <div className="flash"></div>

      <Navbar />
      <Hero />
      <About />
      <Mechanics />
      <Leaderboard />
      <Shop />
      <Staff />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}