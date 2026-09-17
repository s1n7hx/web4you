import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

export default function FinalCTA() {
  return (
    <section
      id="cta"
      data-section
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden py-32 text-center"
    >
      <Reveal>
        <span className="mb-6 inline-block text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">
          Ready when you are
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display max-w-4xl text-balance text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl">
          YOUR NEXT WEBSITE <span className="gradient-text">STARTS HERE.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <button
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          className="btn-glow group mt-12 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink transition-transform hover:scale-105"
        >
          Start a Project
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </Reveal>
    </section>
  );
}
