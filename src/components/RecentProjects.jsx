import React, { useState } from "react";
import { motion } from "framer-motion";

// Import 10 project images
import p1 from "../assets/project-1.png";
import p2 from "../assets/project-2.png";
import p3 from "../assets/project-3.png";
import p4 from "../assets/project-4.png";
import p5 from "../assets/project-5.png";
import p6 from "../assets/project-6.png";
import p7 from "../assets/project-7.png";
import p8 from "../assets/project-8.png";
import p9 from "../assets/project-9.png";
import p10 from "../assets/project-10.png";

const allProjects = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

const RecentProjects = () => {
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? allProjects : allProjects.slice(0, 6);

  return (
    <section
      id="portfolio"
      className="w-full py-20 bg-[var(--kp-body-bg)] text-[var(--text-dark)]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Recent Projects
          </h2>
          <p className="text-lg leading-relaxed opacity-80">
            A curated look at some of our latest work. From residential
            renovations to commercial transformations, every project showcases
            our commitment to craftsmanship, detail, and modern construction
            standards.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayed.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="w-full h-56 md:h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={img}
                alt={`Project ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-full bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentProjects;
