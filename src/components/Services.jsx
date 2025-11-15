import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Import images so bundlers resolve assets
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
    copy: "Our Residential Remodeling Services are built around thoughtful renovation that preserves structure while transforming spaces for modern living. We manage complex phased renovations — from structural reworks and full kitchen overhauls to luxury bathroom finishes and whole-house updates. Every project begins with a collaborative planning process where we assess the existing conditions, propose pragmatic engineering solutions, and stage work to minimize disruption. Safety, cleanliness, and communication are core to our approach; we provide clear schedules, on-site supervision, and detailed finish selections so owners know exactly what to expect. Whether you’re updating for resale or creating a forever home, we bring senior-level craftsmanship and a waterproof, long-lasting build mentality to every surface.",
  },

  {
    id: "newhome",
    title: "New Home Construction",
    img: newHome,
    alt: "New home under construction",
    copy: "From lot planning to final walk-through, our New Home Construction service delivers high-performance homes tailored to your vision. We partner early with architects to refine constructability, control cost, and optimize the build program. Our teams focus on robust foundations, tight building envelopes, and disciplined MEP coordination to reduce callbacks and increase long-term durability. Through transparent budgeting and milestone-driven schedules, we give homeowners confidence during each phase — permitting, framing, systems rough-in, finishes, and commissioning. Expect modern material thinking, energy-conscious assemblies, and fine attention to millwork and trim; this is where design intent meets build excellence.",
  },

  {
    id: "commercial",
    title: "Commercial Remodeling Services",
    img: commercial,
    alt: "Commercial interior remodeling",
    copy: "UrbanForge supports commercial owners and tenants with remodeling solutions that minimize downtime and maximize ROI. We specialize in retail fit-outs, office modernizations, restaurant conversions, and hospitality refurbishments that require fast, precise execution. Our project managers coordinate phased turnovers, building services, and specialty trades so your business can remain open or return to operation quickly after construction. We emphasize durable finishes, smart systems, and compliance-first delivery—permitting, inspections, and ADA/OSHA coordination are handled in-house. The result is a refined, operational-ready space that aligns with brand standards and occupant comfort.",
  },

  {
    id: "deck",
    title: "Custom Deck Construction",
    img: deck,
    alt: "Custom deck and outdoor living space",
    copy: "Outdoor living is an extension of the home and deserves the same careful craft. Our Custom Deck Construction service integrates structural integrity with aesthetic design — durable framing, code-compliant connections, hidden fasteners, and finishes that resist weathering and wear. We consult on layout, lighting, railing systems, and composite or natural decking options to balance maintenance and longevity. For multi-level or cantilevered decks, our team coordinates structural reinforcements and waterproof transitions so the interior stays dry and the exterior performs for decades. The focus is on seamless indoor/outdoor transitions and spaces that invite gatherings and quiet afternoons alike.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section id="services" className="w-full bg-transparent py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start text-center md:text-left mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-dark)]">
            Services we offer
          </h2>
          <p className="mt-3 max-w-3xl text-[var(--text-dark)]/90 leading-relaxed">
            UrbanForge provides a comprehensive set of construction services
            tailored to commercial and residential needs. We combine technical
            depth, permit expertise, and a craft-first mentality to deliver
            projects on time and built to last. Below are four core services
            where our teams add the greatest value — each section includes
            detail, typical scope, and the outcomes you should expect when
            partnering with us.
          </p>
        </motion.div>

        {/* Services list */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-12"
        >
          {services.map((s, idx) => (
            <motion.article
              key={s.id}
              variants={item}
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-5/12 lg:w-4/12 flex-shrink-0">
                <img
                  src={s.img}
                  alt={s.alt}
                  className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-2xl shadow-lg border border-white/10"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-7/12 lg:w-8/12">
                <h3 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)]">
                  {s.title}
                </h3>
                <div className="mt-4 text-[var(--text-dark)]/90 text-base leading-relaxed">
                  <p className="mb-4">{s.copy}</p>
                  {/* Add a second paragraph to be long and informative */}
                  <p>
                    Each engagement starts with a discovery period where we map
                    the scope, understand long-term use, and identify
                    site-specific risks. We then provide phased schedules,
                    procurement plans for long-lead items, and a single point of
                    contact who manages deliveries, inspections, and punch
                    lists. Our objective is to reduce surprises and create a
                    clear, documented path from permit to occupancy.
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)]/30"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
