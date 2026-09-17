import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../Reveal";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    text: "We learn your business, audience and goals to define what success looks like.",
  },
  {
    n: "02",
    title: "Strategize",
    text: "We map information architecture, user flows and a technical plan for the build.",
  },
  {
    n: "03",
    title: "Design",
    text: "We craft high-fidelity visual designs and interactions true to your brand.",
  },
  {
    n: "04",
    title: "Develop",
    text: "We engineer a fast, responsive, production-grade site or application.",
  },
  {
    n: "05",
    title: "Launch",
    text: "We test, refine and ship — with a smooth, well-planned go-live.",
  },
  {
    n: "06",
    title: "Grow",
    text: "We monitor, iterate and continuously improve performance after launch.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.4"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" data-section className="relative py-20 sm:py-32 md:py-44">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 md:px-10">
        <Reveal>
          <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[11px] sm:tracking-[0.3em]">
            Method
          </span>
          <h2 className="font-display mb-14 text-3xl font-medium tracking-tight text-white sm:mb-20 sm:text-5xl md:text-6xl">
            From Idea To Launch
          </h2>
        </Reveal>

        <div ref={ref} className="relative pl-7 sm:pl-10 md:pl-14">
          <div className="absolute left-[6px] top-2 h-[calc(100%-1rem)] w-px bg-white/10 sm:left-[8px]" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[6px] top-2 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent sm:left-[8px]"
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05} y={20}>
                <div className="relative">
                  <span className="absolute -left-[22px] top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent-2 bg-ink sm:-left-[32px] sm:h-3.5 sm:w-3.5 md:-left-[48px]" />
                  <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:gap-8">
                    <span className="font-display text-xs font-medium text-white/35 sm:text-sm">{step.n}</span>
                    <div>
                      <h3 className="font-display text-xl font-medium text-white sm:text-2xl md:text-3xl">{step.title}</h3>
                      <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-white/55 sm:text-sm md:text-base">{step.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
