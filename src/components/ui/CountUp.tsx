"use client";

import { useEffect, useState } from "react";

// ponytail: replaces react-countup dep — same API subset, ~15 lines
export default function CountUp({
  end,
  start = 0,
  duration = 2.5,
  separator = "",
  suffix = "",
}: {
  end: number;
  start?: number;
  duration?: number;
  separator?: string;
  suffix?: string;
}) {
  const [val, setVal] = useState(start);

  useEffect(() => {
    const ms = duration * 1000;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(start + (end - start) * eased);
      setVal(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, start, duration]);

  const formatted = separator
    ? val.toLocaleString("en-US")
    : String(val);

  return <>{formatted}{suffix}</>;
}
