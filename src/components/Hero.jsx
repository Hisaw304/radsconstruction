import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";

import hero1 from "../assets/hero-1.png";
import hero2 from "../assets/hero-2.png";
import hero3 from "../assets/hero-3.png";
import hero4 from "../assets/hero-4.png";
import hero5 from "../assets/hero-5.png";

const images = [hero1, hero2, hero3, hero4, hero5];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const INTERVAL = 6000;

  useEffect(() => {
    if (prefersReducedMotion) return;

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [prefersReducedMotion]);

  const imgVariants = {
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const heading = (
    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
    >
      RADS Construction
    </motion.h1>
  );

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background images */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`RADS Construction project ${i + 1}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
            variants={imgVariants}
            initial="exit"
            animate={i === index ? "enter" : "exit"}
            transition={{ opacity: { duration: prefersReducedMotion ? 0 : 1 } }}
            style={{ transform: "translateZ(0)" }}
          />
        ))}

        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="absolute left-0 right-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 lg:py-36">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left */}
            <div className="md:col-span-7 lg:col-span-6">
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                <div className="text-sm tracking-widest uppercase text-white">
                  Built to last
                </div>

                {heading}

                <div className="text-lg md:text-xl text-white max-w-2xl mt-2">
                  <div className="font-semibold">General Contractors</div>
                  <p className="mt-4 text-white leading-relaxed">
                    RADS Construction delivers high-quality, carefully managed
                    commercial and residential builds. Whether it’s a complex
                    renovation or a fully modern new construction, we combine
                    strong project management, safe operations, and
                    craftsmanship that holds up for decades. Our teams handle
                    challenges with clarity and precision — on time, on budget,
                    and built with long-term durability in mind.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-6 py-3 text-base font-semibold shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)]/30"
                  >
                    <Phone className="w-5 h-5" />
                    Get a Quote
                  </a>

                  <a
                    href="#portfolio"
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm bg-white/10 text-white border border-white/20 hover:bg-white/12 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/10"
                  >
                    Our Projects
                  </a>
                </div>

                <div className="mt-6 text-sm text-white">
                  Licensed & insured • 120+ completed projects
                </div>
              </div>
            </div>

            {/* Right card */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-6 justify-end">
              <div className="w-full max-w-md bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white">
                <div className="flex flex-col gap-4">
                  <div className="text-sm uppercase tracking-wider text-white/80">
                    Projects & Capabilities
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-white/80">
                          Commercial build-outs
                        </div>
                        <div className="text-sm font-semibold">
                          Retail, Office, Hospitality
                        </div>
                      </div>
                      <div className="text-2xl font-bold">98</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-white/80">
                          Residential renovations
                        </div>
                        <div className="text-sm font-semibold">
                          High-end finishes
                        </div>
                      </div>
                      <div className="text-2xl font-bold">22</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-white/80">
                          Safety record
                        </div>
                        <div className="text-sm font-semibold">
                          EMR &gt; Industry
                        </div>
                      </div>
                      <div className="text-2xl font-bold">A+</div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <a
                      href="#about"
                      className="inline-block rounded-lg bg-white/10 text-white px-4 py-2 text-sm border border-white/10 hover:bg-white/20"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile dots */}
      <div className="absolute left-1/2 bottom-6 z-20 -translate-x-1/2 md:hidden flex items-center gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-8 rounded-full transition-all ${
              i === index ? "bg-[var(--accent)]" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
