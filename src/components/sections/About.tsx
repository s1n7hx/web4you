import Reveal from "../Reveal";

export default function About() {
  return (
    <section id="about" data-section className="relative flex min-h-[80vh] items-center py-20 sm:py-32 md:py-44">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        {/* Soft ambient readability scrim */}
        <div
          className="pointer-events-none absolute -inset-x-8 -inset-y-12 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(5,5,6,0.85)_0%,rgba(5,5,6,0.6)_50%,transparent_85%)] blur-2xl"
          aria-hidden="true"
        />
        <Reveal>
          <span className="mb-6 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[11px] sm:tracking-[0.3em]">
            About the Studio
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display max-w-4xl text-balance break-words text-2xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl">
            WE DON&apos;T JUST BUILD WEBSITES. <span className="text-white/40">WE BUILD DIGITAL EXPERIENCES.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <p className="max-w-md text-balance text-lg leading-relaxed text-white/60">
              web4u pairs strategic thinking with meticulous craft. Every project starts with a
              clear understanding of your business, then moves through design and engineering
              with the same level of care — from the first pixel to production.
            </p>
            <p className="max-w-md text-balance text-lg leading-relaxed text-white/60">
              We specialize in premium websites, e-commerce platforms, booking systems and custom
              web applications — built to feel effortless for your customers and easy for you to
              manage long after launch.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
