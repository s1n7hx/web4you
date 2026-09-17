import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      data-section
      className="relative flex min-h-[100svh] flex-col justify-between overflow-x-hidden pt-24 pb-10 sm:pt-32 sm:pb-16"
    >
      <div className="grid-overlay pointer-events-none absolute inset-0 z-[1]" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 col-span-12 md:col-span-8 lg:col-span-7"
          >
            <motion.div variants={item} className="mb-5 sm:mb-6">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
                Digital Experiences / Web Development
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display break-words text-[1.9rem] font-medium leading-[1.08] tracking-tight text-white sm:text-5xl sm:leading-[0.98] md:text-6xl lg:text-7xl"
            >
              <span className="block">WE BUILD</span>
              <span className="gradient-text block">DIGITAL EXPERIENCES</span>
              <span className="block">THAT MOVE BUSINESS FORWARD.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl break-words text-sm leading-relaxed text-white/65 sm:mt-7 sm:text-base md:text-lg"
            >
              web4u is a web design and development studio crafting premium websites, e-commerce
              platforms, booking systems and custom web applications for ambitious businesses.
            </motion.p>

            <motion.div variants={item} className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <button
                onClick={() => scrollTo("booking")}
                className="btn-glow group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                Start a Project
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => scrollTo("work")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white active:bg-white/5 sm:w-auto"
              >
                Explore Our Work
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollTo("work")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-6 hidden flex-col items-center justify-center gap-2 text-white/40 transition-colors hover:text-white/70 md:absolute md:bottom-7 md:left-1/2 md:mt-0 md:flex md:-translate-x-1/2"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}
