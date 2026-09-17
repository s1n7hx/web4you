import { useMemo } from "react";
import AppBackground from "./components/AppBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import Services from "./components/sections/Services";
import Process from "./components/sections/Process";
import About from "./components/sections/About";
import Capabilities from "./components/sections/Capabilities";
import Booking from "./components/sections/Booking";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/Footer";
import { useActiveSection } from "./hooks/useActiveSection";
import type { SectionKey } from "./three/sceneConfig";

const SECTION_IDS: SectionKey[] = [
  "hero",
  "work",
  "services",
  "process",
  "about",
  "capabilities",
  "booking",
  "cta",
];

export default function App() {
  const active = useActiveSection(SECTION_IDS) as SectionKey;
  const activeSection = useMemo(() => active || "hero", [active]);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-ink text-white">
      <AppBackground activeSection={activeSection} />
      <div className="noise-overlay" />

      <Navbar activeSection={activeSection} />

      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Hero />
        <Work />
        <Services />
        <Process />
        <About />
        <Capabilities />
        <Booking />
        <FinalCTA />
      </main>

      <div className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Footer />
      </div>
    </div>
  );
}
