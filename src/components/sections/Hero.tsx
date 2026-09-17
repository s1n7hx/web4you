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
    <section id="hero" data-section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="grid-overlay pointer-events-none absolute inset-0 z-[1]" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pt-24 md:grid-cols-12 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 col-span-12 md:col-span-8 lg:col-span-7"
        >
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/60"
          >
            Digital Experiences / Web Development
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-balance text-[11vw] font-medium leading-[0.98] tracking-tight text-white sm:text-6xl md:text-6xl lg:text-7xl"
          >
            <span className="block">WE BUILD</span>
            <span className="gradient-text block">DIGITAL EXPERIENCES</span>
            <span className="block">THAT MOVE BUSINESS FORWARD.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-balance text-base leading-relaxed text-white/60 md:text-lg">
            web4u is a web design and development studio crafting premium websites, e-commerce
            platforms, booking systems and custom web applications for ambitious businesses.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={() => scrollTo("booking")}
              className="btn-glow group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Start a Project
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => scrollTo("work")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              Explore Our Work
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("work")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40"
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
