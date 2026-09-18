import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Copy, ExternalLink, Mail, Loader2, Sparkles } from "lucide-react";
import Reveal from "../Reveal";
import BookingObject from "../../three/BookingObject";
import {
  type FormData,
  TARGET_EMAIL,
  sendBookingRequest,
  createMailtoLink,
  formatEmailTemplate,
} from "../../utils/bookingService";

const PROJECT_TYPES = ["Website", "Redesign", "E-Commerce", "Booking System", "Web Application", "Other"];
const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"];

const TOTAL_STEPS = 5;

const initialData: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  details: "",
  budget: "",
  date: "",
  time: "",
};

export default function Booking() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "fallback">("idle");
  const [direction, setDirection] = useState(1);
  const [copied, setCopied] = useState(false);

  const update = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }));

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const canProceed = () => {
    if (step === 1) return data.name.trim() && data.email.trim() && data.email.includes("@");
    if (step === 2) return Boolean(data.projectType);
    if (step === 3) return data.details.trim().length > 4;
    if (step === 4) return Boolean(data.budget);
    if (step === 5) return Boolean(data.date && data.time);
    return true;
  };

  const handleSubmit = async () => {
    setStatus("submitting");
    const result = await sendBookingRequest(data);
    if (result.success) {
      setStatus("done");
    } else {
      // If network is blocked by ad-blocker or CORS, fallback gracefully allows 1-click email launch
      setStatus("fallback");
    }
  };

  const handleCopy = () => {
    const text = formatEmailTemplate(data);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: -dir * 40 }),
  };

  return (
    <section id="booking" data-section className="relative py-20 sm:py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <Reveal className="mb-12 text-center sm:mb-16 md:mb-20">
          <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[11px] sm:tracking-[0.3em]">
            Start a Project
          </span>
          <h2 className="font-display mx-auto max-w-3xl text-balance break-words text-3xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Let&apos;s Build Something Great.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-sm text-white/55 sm:mt-5 sm:text-base">
            Tell us what you&apos;re looking to build. Your request is dispatched directly to our lead partner at{" "}
            <span className="text-white/80 underline decoration-white/30 underline-offset-4">{TARGET_EMAIL}</span>.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="hidden lg:col-span-4 lg:flex lg:flex-col lg:justify-between">
            <div className="card-surface relative h-[420px] overflow-hidden rounded-3xl">
              <BookingObject step={step} totalSteps={TOTAL_STEPS} />
            </div>
            <div className="card-surface mt-6 rounded-3xl p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <Sparkles size={14} /> Direct Lead Dispatch
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Every booking creates a structured executive project brief sent immediately to{" "}
                <span className="text-white/85">{TARGET_EMAIL}</span>. You will receive direct correspondence to confirm
                your discovery session.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="card-surface relative overflow-hidden rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:p-12">
              {status !== "done" && status !== "fallback" && (
                <div className="mb-10 flex items-center gap-2">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                        i < step ? "bg-accent" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait" custom={direction}>
                {status === "done" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col py-4"
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 15 }}
                        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.25)]"
                      >
                        <Check size={32} />
                      </motion.div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Dispatched to {TARGET_EMAIL}
                      </span>
                      <h3 className="font-display mt-4 text-2xl font-medium text-white md:text-3xl">
                        Request Received, {data.name.split(" ")[0] || "there"}.
                      </h3>
                      <p className="mt-2 max-w-lg text-sm text-white/65">
                        Your project brief has been delivered directly to our lead partner inbox. We will review your
                        specifications and reach out to <strong className="text-white">{data.email}</strong> to confirm your discovery call on{" "}
                        <strong className="text-white">{data.date || "your preferred date"}</strong> at{" "}
                        <strong className="text-white">{data.time || "your requested time"}</strong>.
                      </p>
                    </div>

                    {/* Executive Template Preview */}
                    <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/50">
                          <Mail size={14} className="text-accent" /> Professional Brief Sent
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleCopy}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
                          >
                            <Copy size={12} />
                            {copied ? "Copied!" : "Copy Brief"}
                          </button>
                          <a
                            href={createMailtoLink(data)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/25"
                          >
                            <ExternalLink size={12} /> Open in Email App
                          </a>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                          <span className="text-white/40 block uppercase tracking-wider text-[10px]">Client</span>
                          <span className="mt-0.5 block font-medium text-white/90">{data.name}</span>
                          <span className="text-white/50">{data.email}</span>
                          {data.company && <span className="text-white/40 block">({data.company})</span>}
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                          <span className="text-white/40 block uppercase tracking-wider text-[10px]">Project &amp; Budget</span>
                          <span className="mt-0.5 block font-medium text-accent">{data.projectType}</span>
                          <span className="text-white/60">Estimated: {data.budget}</span>
                        </div>
                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                          <span className="text-white/40 block uppercase tracking-wider text-[10px]">Target Call Schedule</span>
                          <span className="mt-0.5 block font-medium text-white/90">
                            {data.date} at {data.time}
                          </span>
                        </div>
                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                          <span className="text-white/40 block uppercase tracking-wider text-[10px]">Project Scope Brief</span>
                          <p className="mt-1 whitespace-pre-wrap text-white/70 leading-relaxed font-mono text-[11px]">
                            {data.details}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => {
                          setData(initialData);
                          setStep(1);
                          setStatus("idle");
                        }}
                        className="text-xs font-medium uppercase tracking-wider text-white/50 underline underline-offset-4 hover:text-white transition-colors"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : status === "fallback" ? (
                  <motion.div
                    key="fallback"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300">
                      <Mail size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-medium text-white">Direct Email Dispatch Ready</h3>
                    <p className="mt-2 max-w-md text-sm text-white/60">
                      Your browser security or ad-blocker restricted automated web background calls. We&apos;ve
                      pre-formatted the complete professional template ready to send directly to{" "}
                      <strong className="text-white">{TARGET_EMAIL}</strong>.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                      <a
                        href={createMailtoLink(data)}
                        className="btn-glow inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
                      >
                        <Mail size={16} /> Send via Mail App to {TARGET_EMAIL}
                      </a>
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white/80 hover:border-white/40 hover:text-white"
                      >
                        <Copy size={16} /> {copied ? "Copied to Clipboard!" : "Copy Full Template"}
                      </button>
                    </div>

                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-xs text-white/40 underline underline-offset-4 hover:text-white"
                    >
                      Back to edit details
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {step === 1 && (
                      <div className="flex flex-col gap-5">
                        <StepHeading eyebrow="Step 1" title="Who are we talking to?" />
                        <Field label="Full name">
                          <input
                            value={data.name}
                            onChange={(e) => update({ name: e.target.value })}
                            placeholder="Jordan Blake"
                            className="input"
                            autoFocus
                          />
                        </Field>
                        <Field label="Email address (for our direct response)">
                          <input
                            type="email"
                            value={data.email}
                            onChange={(e) => update({ email: e.target.value })}
                            placeholder="jordan@company.com"
                            className="input"
                          />
                        </Field>
                        <Field label="Company or brand name (optional)">
                          <input
                            value={data.company}
                            onChange={(e) => update({ company: e.target.value })}
                            placeholder="Acme Studio"
                            className="input"
                          />
                        </Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-col gap-5">
                        <StepHeading eyebrow="Step 2" title="What are you looking to build?" />
                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 sm:gap-3">
                          {PROJECT_TYPES.map((type) => (
                            <button
                              key={type}
                              onClick={() => update({ projectType: type })}
                              className={`rounded-xl border px-4 py-3.5 text-left text-sm transition-all sm:py-4 ${
                                data.projectType === type
                                  ? "border-accent/60 bg-accent/10 text-white shadow-[0_0_15px_rgba(124,108,246,0.2)]"
                                  : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="flex flex-col gap-5">
                        <StepHeading eyebrow="Step 3" title="Tell us about the project." />
                        <Field label="Project details &amp; goals">
                          <textarea
                            value={data.details}
                            onChange={(e) => update({ details: e.target.value })}
                            placeholder="Share your goals, target timeline, technical requirements, design inspirations, or links…"
                            rows={6}
                            className="input resize-none"
                            autoFocus
                          />
                        </Field>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="flex flex-col gap-5">
                        <StepHeading eyebrow="Step 4" title="What's your intended budget?" />
                        <div className="flex flex-col gap-3">
                          {BUDGETS.map((b) => (
                            <button
                              key={b}
                              onClick={() => update({ budget: b })}
                              className={`rounded-xl border px-5 py-3.5 text-left text-sm transition-all ${
                                data.budget === b
                                  ? "border-accent/60 bg-accent/10 text-white shadow-[0_0_15px_rgba(124,108,246,0.2)]"
                                  : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div className="flex flex-col gap-5">
                        <StepHeading eyebrow="Step 5" title="Preferred date &amp; time for discovery call." />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field label="Preferred date">
                            <input
                              type="date"
                              min={todayStr}
                              value={data.date}
                              onChange={(e) => update({ date: e.target.value })}
                              className="input"
                            />
                          </Field>
                          <Field label="Preferred time">
                            <input
                              type="time"
                              value={data.time}
                              onChange={(e) => update({ time: e.target.value })}
                              className="input"
                            />
                          </Field>
                        </div>

                        {/* Direct Professional Dispatch Guarantee */}
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                          <div className="flex items-center gap-2 font-medium text-white/80">
                            <Mail size={14} className="text-accent" />
                            Direct Dispatch Destination: <span className="text-accent font-semibold">{TARGET_EMAIL}</span>
                          </div>
                          <p className="mt-1.5 text-white/50 leading-relaxed">
                            Clicking &ldquo;Send Professional Request&rdquo; will format an executive project specification
                            and deliver it directly to our studio inbox, with a receipt confirmation to {data.email || "your email"}.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-10 flex items-center justify-between">
                      <button
                        onClick={back}
                        disabled={step === 1}
                        className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-0"
                      >
                        <ArrowLeft size={15} /> Back
                      </button>

                      {step < TOTAL_STEPS ? (
                        <button
                          onClick={next}
                          disabled={!canProceed()}
                          className="btn-glow inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-all enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          Continue <ArrowRight size={15} />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={!canProceed() || status === "submitting"}
                          className="btn-glow inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 size={16} className="animate-spin" /> Dispatching to {TARGET_EMAIL}…
                            </>
                          ) : (
                            <>
                              Send Professional Request <ArrowRight size={15} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-1 sm:mb-2">
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs sm:tracking-[0.25em]">{eyebrow}</span>
      <h3 className="font-display mt-1 text-xl font-medium text-white sm:mt-2 sm:text-2xl md:text-3xl">{title}</h3>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-white/40">{label}</span>
      {children}
    </label>
  );
}

