import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  LayoutTemplate,
  Code2,
  ShoppingBag,
  CalendarClock,
  LayoutDashboard,
  Wrench,
} from "lucide-react";
import Reveal from "../Reveal";
import ServicesObject from "../../three/ServicesObject";

const SERVICES = [
  {
    icon: LayoutTemplate,
    name: "Website Design",
    description: "Strategy, UX and premium visual design that reflects your brand at its best.",
  },
  {
    icon: Code2,
    name: "Website Development",
    description: "Fast, responsive, modern websites engineered for performance and scale.",
  },
  {
    icon: ShoppingBag,
    name: "E-Commerce",
    description: "Online stores and conversion-focused shopping experiences that sell.",
  },
  {
    icon: CalendarClock,
    name: "Booking Systems",
    description: "Appointments, reservations and scheduling experiences that just work.",
  },
  {
    icon: LayoutDashboard,
    name: "Custom Web Applications",
    description: "Business-specific interactive platforms built around your workflow.",
  },
  {
    icon: Wrench,
    name: "Maintenance & Growth",
    description: "Continuous improvements, monitoring and optimization after launch.",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" data-section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">
            Capability
          </span>
          <h2 className="font-display mb-16 text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            What We Build
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      className={`card-surface group relative flex h-full w-full flex-col items-start gap-4 rounded-2xl p-6 text-left transition-colors ${
                        isActive ? "border-white/30 bg-white/[0.07]" : ""
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                          isActive ? "border-accent/60 bg-accent/15 text-white" : "border-white/10 text-white/60"
                        }`}
                      >
                        <Icon size={20} />
                      </span>
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
              <div className="card-surface relative flex h-[420px] flex-col overflow-hidden rounded-3xl md:h-[480px]">
                <div className="absolute inset-0">
                  <ServicesObject active={active} />
                </div>
                <div className="relative mt-auto flex flex-col gap-2 bg-gradient-to-t from-ink/90 to-transparent p-8">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/40">
                    0{active + 1} / 06
                  </span>
                  <h4 className="font-display text-2xl font-medium text-white">{SERVICES[active].name}</h4>
                  <p className="max-w-sm text-sm text-white/55">{SERVICES[active].description}</p>
                  <button className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white">
                    Discuss this service <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
