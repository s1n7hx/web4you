import type { SVGProps } from "react";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "booking", label: "Contact" },
];

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconLinkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.4 1-2.3 2.3-2.3s2.2.9 2.2 2.3V17" />
    </svg>
  );
}
function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <line x1="4.5" y1="4.5" x2="19.5" y2="19.5" />
      <line x1="19.5" y1="4.5" x2="4.5" y2="19.5" />
    </svg>
  );
}
function IconGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.62-.2.62-.43v-1.7c-2.5.54-3.03-1.07-3.03-1.07-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.37 2.1.97 2.6.74.08-.58.31-.97.57-1.2-2-.23-4.1-1-4.1-4.44 0-.98.35-1.78.92-2.4-.09-.23-.4-1.16.09-2.42 0 0 .75-.24 2.47.92a8.5 8.5 0 0 1 4.5 0c1.72-1.16 2.47-.92 2.47-.92.49 1.26.18 2.19.09 2.42.57.62.92 1.42.92 2.4 0 3.45-2.11 4.2-4.12 4.43.32.28.6.82.6 1.66v2.46c0 .23.16.51.62.43A9 9 0 0 0 12 3Z" />
    </svg>
  );
}

const SOCIALS = [
  { icon: IconInstagram, label: "Instagram" },
  { icon: IconLinkedin, label: "LinkedIn" },
  { icon: IconX, label: "X" },
  { icon: IconGithub, label: "GitHub" },
];

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="font-display block text-2xl font-semibold text-white">web4u</span>
            <span className="mt-2 block text-sm text-white/45">Design. Development. Digital Experiences.</span>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-4">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/55 transition-colors hover:border-white/30 hover:text-white"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/35 md:flex-row md:items-center">
          <span>© 2026 web4u. All rights reserved.</span>
          <span>Built with React, Three.js &amp; Tailwind CSS.</span>
        </div>
      </div>
    </footer>
  );
}
