import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";

const PROJECTS = [
  {
    name: "Aurora Studio",
    category: "Brand Website",
    description: "A cinematic portfolio site for a creative studio with fluid page transitions.",
    tone: "from-violet-500/25 via-indigo-500/10 to-transparent",
    accent: "#7c6cf6",
  },
  {
    name: "Nordwell Living",
    category: "E-Commerce",
    description: "A conversion-focused storefront for a furniture brand with immersive product views.",
    tone: "from-cyan-400/20 via-sky-500/10 to-transparent",
    accent: "#3fd7ff",
  },
  {
    name: "Solace Clinic",
    category: "Booking Platform",
    description: "An appointment and scheduling experience built for a wellness practice.",
    tone: "from-orange-400/20 via-rose-400/10 to-transparent",
    accent: "#ff7a5c",
  },
  {
    name: "Ledger Works",
    category: "Web Application",
    description: "A custom operations dashboard replacing a fleet of spreadsheets with one system.",
    tone: "from-emerald-400/20 via-teal-500/10 to-transparent",
    accent: "#34e2b4",
  },
];

export default function Work() {
  return (
    <section id="work" data-section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">
                Portfolio
              </span>
              <h2 className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
                Selected Work
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              A sample of the kind of premium digital products we design and build — ready to be
              replaced with your own case studies.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <TiltCard className="group card-surface relative overflow-hidden rounded-3xl p-2">
                <div className="relative overflow-hidden rounded-2xl">
                  {/* Mockup viewport */}
                  <div
                    className={`relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${project.tone} p-5 md:h-80`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    </div>
                    <div className="grid grid-cols-3 gap-3 opacity-90">
                      <div className="col-span-2 h-24 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm md:h-32" />
                      <div className="h-24 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm md:h-32" />
                      <div className="col-span-3 h-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                    </div>
                    <div
                      className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl transition-transform duration-500 group-hover:scale-125"
                      style={{ background: project.accent }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-medium text-white">{project.name}</h3>
                      <span className="text-xs uppercase tracking-[0.2em] text-white/40">{project.category}</span>
                    </div>
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-white/40 group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/55">{project.description}</p>
                  <button className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white">
                    View Project <ArrowUpRight size={14} />
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
