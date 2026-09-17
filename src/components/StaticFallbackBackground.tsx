export default function StaticFallbackBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="absolute -top-1/3 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #7c6cf6, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 h-[60vh] w-[60vh] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #3fd7ff, transparent 70%)" }}
      />
      <div className="grid-overlay absolute inset-0" />
    </div>
  );
}
