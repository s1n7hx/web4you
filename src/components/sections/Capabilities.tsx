import { motion } from "framer-motion";
import Reveal from "../Reveal";

const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "Tailwind CSS",
  "Node.js",
  "REST & GraphQL APIs",
  "Headless CMS",
  "E-Commerce Platforms",
  "Booking Integrations",
  "Cal.com",
  "Stripe",
];

export default function Capabilities() {
  return (
    <section id="capabilities" data-section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">
            Toolkit
          </span>
          <h2 className="font-display mb-14 text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
            Capabilities &amp; Technology
          </h2>
        </Reveal>

        <div className="flex flex-wrap gap-3">
          {STACK.map((tech, i) => (
            <Reveal key={tech} delay={i * 0.02} y={12}>
              <motion.div
                whileHover={{
                  y: -6,
                  rotateX: 10,
                  boxShadow: "0 20px 40px -20px rgba(124,108,246,0.45)",
                }}
                style={{ transformPerspective: 600 }}
                className="card-surface cursor-default rounded-full px-5 py-2.5 text-sm text-white/75 transition-colors hover:border-white/30 hover:text-white"
              >
                {tech}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
