"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { STATS } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

export default function StatsSection() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  // initialInView: true → di headless/Cypress (IntersectionObserver tidak fire)
  // elemen tetap terlihat & counter tetap menampilkan nilai akhir, bukan 0.
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-16 bg-dark-800/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => {
            const finalValue = `${stat.value.toLocaleString("en-US")}${stat.suffix}`;
            return (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="font-heading font-black text-4xl md:text-5xl mb-2 gradient-text-blue">
                  {inView && !prefersReducedMotion ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  ) : (
                    <span>{finalValue}</span>
                  )}
                </div>
                <p className="text-white/60 text-sm font-medium">{t(stat.label)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
