import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "booking", label: "Contact" },
];

export default function Navbar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5 md:px-10">
          <button
            onClick={() => scrollTo("hero")}
            className="font-display text-lg font-semibold tracking-tight text-white"
          >
            web4u
          </button>

          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm tracking-wide transition-colors ${
                  activeSection === link.id ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("booking")}
            className="btn-glow hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10 md:inline-flex"
          >
            Book a Project <ArrowUpRight size={15} />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-ink/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
              <span className="font-display text-lg font-semibold text-white">web4u</span>
              <button onClick={() => setOpen(false)} className="text-white" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-start justify-center gap-1.5 px-6 py-6 sm:px-8">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollTo(link.id)}
                  className="font-display py-2.5 text-3xl font-medium text-white/85 hover:text-white sm:text-4xl"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * LINKS.length, duration: 0.5 }}
                onClick={() => scrollTo("booking")}
                className="btn-glow mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-medium text-white sm:mt-8"
              >
                Book a Project <ArrowUpRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
