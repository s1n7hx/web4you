import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";

export default function Work() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="work" data-section className="relative py-20 sm:py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <Reveal>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[11px] sm:tracking-[0.3em]">
                Portfolio
              </span>
              <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
                Selected Work
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Live client websites and bespoke digital experiences crafted by our studio.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured Live Project: Artisans Kart */}
          <Reveal delay={0.05} className="md:col-span-2 lg:col-span-1">
            <a
              href="https://artisanskart.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full focus:outline-none"
            >
              <TiltCard className="card-surface relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 p-2.5 transition-all duration-300 hover:border-accent/40 sm:rounded-3xl sm:p-3">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  {/* Mockup viewport */}
                  <div className="relative flex h-52 flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/25 via-orange-500/10 to-transparent p-4 sm:h-60 sm:rounded-2xl sm:p-5">
                    {/* Browser-style bar */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      </div>
                      <div className="flex max-w-[200px] truncate items-center gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] text-white/70 backdrop-blur-md sm:text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="truncate">artisanskart.vercel.app</span>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
                        Live
                      </span>
                    </div>

                    {/* Content preview blocks */}
                    <div className="grid grid-cols-3 gap-2.5 opacity-90 sm:gap-3">
                      <div className="col-span-2 flex h-20 flex-col justify-between rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur-sm sm:h-24">
                        <span className="text-[10px] font-medium text-amber-200/80 uppercase tracking-wider">Handcrafted Goods</span>
                        <div className="h-2 w-2/3 rounded-full bg-white/20" />
                      </div>
                      <div className="col-span-1 flex h-20 items-center justify-center rounded-xl border border-white/15 bg-amber-500/10 backdrop-blur-sm sm:h-24">
                        <span className="text-xl">🏺</span>
                      </div>
                      <div className="col-span-3 flex h-8 items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 backdrop-blur-sm sm:h-9">
                        <div className="h-2 w-1/3 rounded-full bg-white/30" />
                        <div className="h-4 w-12 rounded-full bg-amber-400/30" />
                      </div>
                    </div>

                    <div
                      className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-35 blur-3xl transition-transform duration-500 group-hover:scale-125"
                      style={{ background: "#f59e0b" }}
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white group-hover:text-amber-300 transition-colors sm:text-2xl">
                          Artisans Kart
                        </h3>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs">
                          E-Commerce &amp; Artisan Marketplace
                        </span>
                      </div>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-amber-400 group-hover:text-amber-300 sm:h-10 sm:w-10">
                        <ExternalLink size={15} />
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-white/60 sm:text-sm">
                      An artisan marketplace platform connecting local craftsmen with digital consumers, engineered with a responsive product showcase and seamless shopping experience.
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs font-mono text-white/40">artisanskart.vercel.app</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 group-hover:underline">
                      Visit Site <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </TiltCard>
            </a>
          </Reveal>

          {/* Future Work Space 1 */}
          <Reveal delay={0.12}>
            <div
              onClick={() => scrollTo("booking")}
              className="group block h-full cursor-pointer focus:outline-none"
            >
              <TiltCard className="card-surface relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-white/20 p-2.5 transition-all duration-300 hover:border-accent-2/50 sm:rounded-3xl sm:p-3">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  <div className="relative flex h-52 flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/10 via-white/[0.02] to-transparent p-5 sm:h-60 sm:rounded-2xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-accent-2 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <Sparkles size={24} />
                    </div>
                    <span className="mt-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-accent-2">
                      Space 01 · Coming Soon
                    </span>
                    <span className="mt-2 text-xs text-white/40">In Development</span>

                    <div
                      className="absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-20 blur-3xl transition-transform duration-500 group-hover:scale-125"
                      style={{ background: "#3fd7ff" }}
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-medium text-white transition-colors group-hover:text-accent-2 sm:text-2xl">
                          Future Project
                        </h3>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs">
                          Reserved Space
                        </span>
                      </div>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all group-hover:border-accent-2/60 group-hover:text-accent-2 sm:h-10 sm:w-10">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-white/50 sm:text-sm">
                      Upcoming digital experience currently in development. Reserved for our next bespoke web launch.
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-white/40">Reserved</span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-2 group-hover:underline"
                    >
                      Book a Project <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          </Reveal>

          {/* Future Work Space 2 */}
          <Reveal delay={0.18}>
            <div
              onClick={() => scrollTo("booking")}
              className="group block h-full cursor-pointer focus:outline-none"
            >
              <TiltCard className="card-surface relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-white/20 p-2.5 transition-all duration-300 hover:border-accent/50 sm:rounded-3xl sm:p-3">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  <div className="relative flex h-52 flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500/10 via-white/[0.02] to-transparent p-5 sm:h-60 sm:rounded-2xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-accent backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <Sparkles size={24} />
                    </div>
                    <span className="mt-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-accent">
                      Space 02 · Available
                    </span>
                    <span className="mt-2 text-xs text-white/40">Your Brand Here</span>

                    <div
                      className="absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-20 blur-3xl transition-transform duration-500 group-hover:scale-125"
                      style={{ background: "#7c6cf6" }}
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-medium text-white transition-colors group-hover:text-accent sm:text-2xl">
                          Your Project Here
                        </h3>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs">
                          Open Slot
                        </span>
                      </div>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all group-hover:border-accent/60 group-hover:text-accent sm:h-10 sm:w-10">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-white/50 sm:text-sm">
                      Ready to build your next web application, e-commerce storefront, or brand site? Claim this spot.
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-white/40">Accepting Projects</span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent group-hover:underline"
                    >
                      Start Project <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

