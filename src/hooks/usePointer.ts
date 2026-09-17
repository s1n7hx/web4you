import { useEffect, useRef } from "react";

/**
 * Tracks normalized pointer position in range [-1, 1] for parallax use in R3F.
 * Returns a ref (mutable) to avoid re-renders on every mouse move.
 */
export function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  return pointer;
}
