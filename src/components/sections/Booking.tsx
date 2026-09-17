import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import Reveal from "../Reveal";
import BookingObject from "../../three/BookingObject";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  details: string;
  budget: string;
  date: string;
  time: string;
}

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

/**
 * Submits the booking request.
 *
 * This is the single integration point for the booking flow — swap the body
 * of this function to connect to a real scheduling / notification backend:
 *  - Cal.com API (https://cal.com/docs/api-reference)
 *  - Calendly API (https://developer.calendly.com/)
 *  - Google Calendar API (create event + invite)
 *  - A custom backend endpoint (e.g. POST /api/bookings)
 *  - Transactional email (Resend / Postmark / SendGrid) for notifications
 */
async function submitBooking(data: FormData): Promise<void> {
  void data;
  // Example shape for a future fetch call:
  // await fetch("/api/bookings", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

export default function Booking() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [direction, setDirection] = useState(1);

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
    if (step === 1) return data.name.trim() && data.email.trim();
    if (step === 2) return Boolean(data.projectType);
    if (step === 3) return data.details.trim().length > 4;
    if (step === 4) return Boolean(data.budget);
    if (step === 5) return Boolean(data.date && data.time);
    return true;
  };

  const handleSubmit = async () => {
    setStatus("submitting");
    await submitBooking(data);
    setStatus("done");
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: -dir * 40 }),
  };

  return (
    <section id="booking" data-section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mb-16 text-center md:mb-20">
          <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">
            Start a Project
          </span>
          <h2 className="font-display mx-auto max-w-3xl text-balance text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Let&apos;s Build Something Great.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-balance text-white/55">
            Tell us what you&apos;re looking to build.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="hidden lg:col-span-4 lg:flex lg:flex-col lg:justify-between">
            <div className="card-surface relative h-[420px] overflow-hidden rounded-3xl">
              <BookingObject step={step} totalSteps={TOTAL_STEPS} />
            </div>
            <div className="card-surface mt-6 rounded-3xl p-6">
              <p className="text-sm leading-relaxed text-white/55">
                Prefer to talk first? Once submitted, our team reviews every request and follows up
                to schedule a short discovery call at a time that works for you.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="card-surface relative overflow-hidden rounded-3xl p-8 md:p-12">
              {status !== "done" && (
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent"
                    >
                      <Check size={30} />
                    </motion.div>
                    <h3 className="font-display text-2xl font-medium text-white md:text-3xl">
                      Request received, {data.name.split(" ")[0] || "there"}.
                    </h3>
                    <p className="mt-3 max-w-sm text-white/55">
                      We&apos;ll review your project and reach out at {data.email} to confirm a call
                      around {data.date || "your preferred date"}.
                    </p>
                    <button
                      onClick={() => {
                        setData(initialData);
                        setStep(1);
                        setStatus("idle");
                      }}
                      className="mt-8 text-sm font-medium text-white/60 underline underline-offset-4 hover:text-white"
                    >
                      Submit another request
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
                          />
                        </Field>
                        <Field label="Email address">
                          <input
                            type="email"
                            value={data.email}
                            onChange={(e) => update({ email: e.target.value })}
                            placeholder="jordan@company.com"
                            className="input"
                          />
                        </Field>
                        <Field label="Company (optional)">
                          <input
                            value={data.company}
                            onChange={(e) => update({ company: e.target.value })}
                            placeholder="Company name"
                            className="input"
                          />
                        </Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-col gap-5">
                        <StepHeading eyebrow="Step 2" title="What are you looking to build?" />
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {PROJECT_TYPES.map((type) => (
                            <button
                              key={type}
                              onClick={() => update({ projectType: type })}
                              className={`rounded-xl border px-4 py-4 text-left text-sm transition-all ${
                                data.projectType === type
                                  ? "border-accent/60 bg-accent/10 text-white"
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
                        <Field label="Project details">
                          <textarea
                            value={data.details}
                            onChange={(e) => update({ details: e.target.value })}
                            placeholder="Share goals, timeline, references, or anything else useful…"
                            rows={6}
                            className="input resize-none"
                          />
                        </Field>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="flex flex-col gap-5">
                        <StepHeading eyebrow="Step 4" title="What's the budget range?" />
                        <div className="flex flex-col gap-3">
                          {BUDGETS.map((b) => (
                            <button
                              key={b}
                              onClick={() => update({ budget: b })}
                              className={`rounded-xl border px-5 py-3.5 text-left text-sm transition-all ${
                                data.budget === b
                                  ? "border-accent/60 bg-accent/10 text-white"
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
                        <StepHeading eyebrow="Step 5" title="Preferred date &amp; time for a call." />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field label="Preferred date">
                            <input
                              type="date"
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
                        <p className="text-xs text-white/40">
                          This can later sync automatically with Cal.com, Calendly or Google Calendar.
                        </p>
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
                          className="btn-glow inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-all enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 size={15} className="animate-spin" /> Sending…
                            </>
                          ) : (
                            <>Request Project Call <ArrowRight size={15} /></>
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
    <div className="mb-2">
      <span className="text-xs uppercase tracking-[0.25em] text-white/40">{eyebrow}</span>
      <h3 className="font-display mt-2 text-2xl font-medium text-white md:text-3xl">{title}</h3>
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
