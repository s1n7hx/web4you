import { useState, useEffect } from "react";
import { X, ExternalLink, Calendar, Loader2, Settings2, Check, ArrowRight, AlertCircle } from "lucide-react";
import { getCalComUrl, getStoredCalLink, setStoredCalLink, normalizeCalHandle } from "../utils/calcom";

interface CalModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName?: string;
  clientEmail?: string;
  projectSummary?: string;
}

export default function CalModal({
  isOpen,
  onClose,
  clientName = "",
  clientEmail = "",
  projectSummary = "",
}: CalModalProps) {
  const [handle, setHandle] = useState<string>(() => getStoredCalLink());
  const [inputVal, setInputVal] = useState<string>(() => getStoredCalLink());
  const [isEditing, setIsEditing] = useState<boolean>(() => !getStoredCalLink());
  const [loading, setLoading] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredCalLink();
      setHandle(stored);
      setInputVal(stored);
      setIsEditing(!stored);
      setLoading(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = normalizeCalHandle(inputVal);
    setStoredCalLink(clean);
    setHandle(clean);
    setIsEditing(false);
    setLoading(true);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const directUrl = handle ? getCalComUrl(handle, clientName, clientEmail, projectSummary) : "";
  const embedUrl = directUrl ? new URL(directUrl) : null;
  if (embedUrl) {
    embedUrl.searchParams.set("embed", "true");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-ink shadow-2xl shadow-black/80">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-6 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Calendar size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white sm:text-base">Schedule Discovery Call</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
                  Cal.com
                </span>
                {handle && !isEditing && (
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-mono text-accent">
                    cal.com/{handle}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-white/50">Studio Admin Live Calendar · 30 min Video Session</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {handle && (
              <button
                type="button"
                onClick={() => setIsEditing((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
                title="Change Cal.com handle"
              >
                <Settings2 size={13} />
                <span className="hidden sm:inline">{isEditing ? "View Calendar" : "Change Link"}</span>
              </button>
            )}

            {directUrl && !isEditing && (
              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
                title="Open full page on Cal.com"
              >
                <ExternalLink size={13} />
                <span className="hidden sm:inline">Open Tab</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close scheduling modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="relative flex-1 w-full bg-[#050506] overflow-y-auto">
          {isEditing || !handle ? (
            <div className="flex min-h-full flex-col items-center justify-center p-6 text-center">
              <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/15 text-accent">
                  <Calendar size={24} />
                </div>
                <h4 className="font-display text-lg font-medium text-white sm:text-xl">
                  Connect Your Cal.com Link
                </h4>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  Enter your Cal.com username or event URL from your dashboard so clients can view your live schedule and book directly.
                </p>

                <form onSubmit={handleSaveLink} className="mt-6 flex flex-col gap-3">
                  <div className="relative flex items-center">
                    <span className="pointer-events-none absolute left-3.5 text-xs text-white/40 font-mono">
                      cal.com/
                    </span>
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="username or username/event"
                      className="input pl-[72px] font-mono text-xs sm:text-sm text-white"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                    <button
                      type="submit"
                      disabled={!inputVal.trim()}
                      className="btn-glow flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-40"
                    >
                      {savedFeedback ? (
                        <>
                          <Check size={14} className="text-emerald-600" /> Saved!
                        </>
                      ) : (
                        <>
                          Connect Calendar <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                    {handle && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-white/60 hover:text-white hover:border-white/20"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40 block mb-1">
                    Examples:
                  </span>
                  <p className="text-[11px] text-white/50 font-mono">
                    • <code className="text-white/80">s1n7h</code> (user profile)<br />
                    • <code className="text-white/80">s1n7h/30min</code> (specific event link)<br />
                    • Or paste the full URL from your <strong className="text-white/70">Cal.com | Links</strong> tab
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full">
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#050506] text-white/60 z-10">
                  <Loader2 size={24} className="animate-spin text-accent" />
                  <span className="text-xs uppercase tracking-widest text-white/40">Loading Cal.com Live Slots…</span>
                </div>
              )}
              {embedUrl && (
                <iframe
                  src={embedUrl.toString()}
                  title="Cal.com Booking Scheduler"
                  className="h-full w-full border-none"
                  onLoad={() => setLoading(false)}
                  allow="camera; microphone; autoplay; clipboard-write"
                />
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Note with Troubleshooting */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 bg-white/[0.02] px-5 py-2.5 text-center sm:text-left text-[11px] text-white/40 gap-2">
          <span>Instant Google Meet or video link generated automatically upon slot selection.</span>
          {handle && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline decoration-accent/40"
            >
              <AlertCircle size={12} /> Page showing 404 or unavailable? Change handle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

