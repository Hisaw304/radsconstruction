// Updated Services component with improved mobile responsiveness, fixed layout, and deep structural corrections

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import residential from "../assets/service-residential.jpg";
import newHome from "../assets/hero-3.png";
import commercial from "../assets/service-commercial.jpg";
import deck from "../assets/hero-4.png";

const services = [
  {
    id: "residential",
    title: "Residential Remodeling Services",
    img: residential,
    alt: "Residential remodeling project",
    copy: "Our Residential Remodeling Services are built around thoughtful renovation that preserves structure while transforming spaces for modern living. We manage complex phased renovations — from structural reworks and full kitchen overhauls to luxury bathroom finishes and whole-house updates. Every project begins with a collaborative planning process where we assess the existing conditions, propose pragmatic engineering solutions, and stage work to minimize disruption.",
  },
  {
    id: "newhome",
    title: "New Home Construction",
    img: newHome,
    alt: "New home under construction",
    copy: "From lot planning to final walk-through, our New Home Construction service delivers high-performance homes tailored to your vision. Early collaboration with architects allows us to refine constructability, control cost, and shape a disciplined build program.",
  },
  {
    id: "commercial",
    title: "Commercial Remodeling Services",
    img: commercial,
    alt: "Commercial interior remodeling",
    copy: "UrbanForge supports commercial owners and tenants with remodeling solutions that minimize downtime and maximize ROI. We specialize in retail fit-outs, office modernizations, restaurant conversions, and hospitality refurbishments.",
  },
  {
    id: "deck",
    title: "Custom Deck Construction",
    img: deck,
    alt: "Custom deck and outdoor living space",
    copy: "Outdoor living deserves the same careful craft as interior construction. Our Custom Deck Construction integrates structural integrity with aesthetic design and long-term durability.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section id="services" className="w-full py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-dark)]">
            Services We Offer
          </h2>
          <p className="mt-3 max-w-3xl text-[var(--text-dark)]/90 mx-auto md:mx-0 leading-relaxed">
            UrbanForge provides a comprehensive set of construction services
            tailored to commercial and residential needs.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-16 md:gap-20"
        >
          {services.map((s, idx) => (
            <motion.article
              key={s.id}
              variants={item}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-5/12 lg:w-4/12">
                <img
                  src={s.img}
                  alt={s.alt}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-2xl shadow-xl border border-white/20"
                />
              </div>

              <div className="w-full md:w-7/12 lg:w-8/12">
                <h3 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-4">
                  {s.title}
                </h3>
                <p className="text-[var(--text-dark)]/90 leading-relaxed mb-4">
                  {s.copy}
                </p>
                <p className="text-[var(--text-dark)]/80 leading-relaxed">
                  Each engagement starts with a discovery period — scope
                  mapping, identifying risks, and defining long-term use. We
                  create phased schedules, procurement plans, and assign a
                  single-point project lead.
                </p>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
