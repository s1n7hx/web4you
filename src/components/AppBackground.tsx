import { Suspense, lazy, useEffect, useState } from "react";
import type { SectionKey } from "../three/sceneConfig";
import { usePointer } from "../hooks/usePointer";
import { useIsMobile } from "../hooks/useIsMobile";
import CanvasErrorBoundary from "../three/CanvasErrorBoundary";
import StaticFallbackBackground from "./StaticFallbackBackground";
import { isWebGLAvailable } from "../three/webglSupport";

const SceneBackground = lazy(() => import("../three/SceneBackground"));

interface AppBackgroundProps {
  activeSection: SectionKey;
}

export default function AppBackground({ activeSection }: AppBackgroundProps) {
  const pointer = usePointer();
  const isMobile = useIsMobile();
  const [supported, setSupported] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setSupported(isWebGLAvailable());
    // Defer mounting the heavy canvas until after first paint.
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (!supported || reducedMotion) {
    return <StaticFallbackBackground />;
  }

  return (
    <CanvasErrorBoundary fallback={<StaticFallbackBackground />}>
      <Suspense fallback={<StaticFallbackBackground />}>
        {visible && <SceneBackground activeSection={activeSection} pointer={pointer} lowPower={isMobile} />}
      </Suspense>
    </CanvasErrorBoundary>
  );
}
