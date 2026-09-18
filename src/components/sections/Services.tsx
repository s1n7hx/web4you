import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  LayoutTemplate,
  Code2,
  ShoppingBag,
  CalendarClock,
  LayoutDashboard,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Reveal from "../Reveal";
import ServicesObject from "../../three/ServicesObject";

const SERVICES = [
  {
    icon: LayoutTemplate,
    name: "Website Design",
    description: "Strategy, UX and premium visual design that reflects your brand at its best.",
    tag: "Design & UX",
  },
  {
    icon: Code2,
    name: "Website Development",
    description: "Fast, responsive, modern websites engineered for performance and scale.",
    tag: "Full-Stack Dev",
  },
  {
    icon: ShoppingBag,
    name: "E-Commerce",
    description: "Online stores and conversion-focused shopping experiences that sell.",
    tag: "Stores & Sales",
  },
  {
    icon: CalendarClock,
    name: "Booking Systems",
    description: "Appointments, reservations and scheduling experiences that just work.",
    tag: "Scheduling & Cal",
  },
  {
    icon: LayoutDashboard,
    name: "Custom Web Applications",
    description: "Business-specific interactive platforms built around your workflow.",
    tag: "Custom Apps",
  },
  {
    icon: Wrench,
    name: "Maintenance & Growth",
    description: "Continuous improvements, monitoring and optimization after launch.",
    tag: "Support & SEO",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const nextService = () => {
    setActive((prev) => (prev + 1) % SERVICES.length);
  };

  const prevService = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActive((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  return (
    <section id="services" data-section className="relative py-20 sm:py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[11px] sm:tracking-[0.3em]">
                Capability
              </span>
              <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
                What We Build
              </h2>
            </div>
            <p className="text-sm text-white/50 max-w-xs">
              Explore our core capabilities. Click any service card or tap the 3D model to cycle through each domain.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              {SERVICES.map((service, i) => {
                const Icon = service.icon;
                const isActive = active === i;
                return (
                  <Reveal key={service.name} delay={i * 0.06}>
                    <motion.button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
                      style={{ transformPerspective: 800 }}
                      className={`card-surface group relative flex h-full w-full flex-col items-start gap-3.5 rounded-2xl p-5 text-left transition-all sm:gap-4 sm:p-6 ${
                        isActive
                          ? "border-accent/60 bg-accent/10 shadow-[0_0_25px_rgba(124,108,246,0.15)] ring-1 ring-accent/30"
                          : "hover:border-white/20"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                            isActive
                              ? "border-accent/60 bg-accent/20 text-white"
                              : "border-white/10 text-white/60 group-hover:border-white/25 group-hover:text-white"
                          }`}
                        >
                          <Icon size={20} />
                        </span>
                        <span className="text-[10px] font-mono text-white/30 tracking-wider">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-medium text-white">{service.name}</h3>
                      <p className="text-sm leading-relaxed text-white/50">{service.description}</p>
                    </motion.button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1} className="sticky top-28 h-full">
              <div
                onClick={nextService}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    nextService();
                  }
                }}
                aria-label="Interactive 3D animation - click to cycle to next capability"
                className="card-surface group relative flex h-[440px] cursor-pointer select-none flex-col justify-between overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_35px_rgba(124,108,246,0.2)] md:h-[500px]"
              >
                {/* 3D Visual Background */}
                <div className="pointer-events-none absolute inset-0">
                  <ServicesObject active={active} />
                </div>

                {/* Top Overlay Bar with Interactive Controls */}
                <div className="relative z-10 flex items-center justify-between p-6">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur-md transition-colors group-hover:border-accent/40 group-hover:text-white">
                    <Sparkles size={12} className="text-accent animate-pulse" />
                    <span>Click animation to cycle</span>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={prevService}
                      aria-label="Previous capability"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextService();
                      }}
                      aria-label="Next capability"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Bottom Content with Progress Indicators */}
                <div className="relative z-10 mt-auto flex flex-col gap-3 bg-gradient-to-t from-ink via-ink/80 to-transparent p-6 sm:p-8 backdrop-blur-[2px]">
                  {/* Step Indicators */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {SERVICES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`Jump to ${SERVICES[i].name}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          active === i
                            ? "w-8 bg-accent shadow-[0_0_10px_rgba(124,108,246,0.6)]"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.25em] text-accent/80 font-mono">
                          0{active + 1} / 06 · {SERVICES[active].tag}
                        </span>
                      </div>
                      <h4 className="font-display text-2xl font-medium text-white sm:text-3xl">
                        {SERVICES[active].name}
                      </h4>
                      <p className="max-w-sm text-sm text-white/65 leading-relaxed">
                        {SERVICES[active].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollTo("booking");
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 transition-colors hover:text-accent group/btn"
                    >
                      <span>Discuss this service</span>
                      <ArrowUpRight size={13} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                    <span className="text-[11px] text-white/40 font-mono">
                      Tap anywhere to next ➔
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
