import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/about-img.png"; // adjust file name

const About = () => {
  return (
    <section
      id="about"
      className="w-full py-20 bg-[var(--kp-body-bg)] text-[var(--text-dark)]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About UrbanForge
          </h2>
          <p className="text-lg leading-relaxed opacity-80">
            At UrbanForge, we believe that great construction is more than
            craftsmanship—it's vision, trust, and long–term commitment. For over
            a decade, we’ve helped homeowners and businesses transform ordinary
            spaces into modern, lasting environments built with precision and a
            deep respect for structural integrity.
          </p>
        </motion.div>

        {/* Content + Image */}
        <div className="mt-14 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-base md:text-lg leading-relaxed opacity-80 mb-6">
              From residential remodeling to full–scale commercial renovation,
              we take a meticulous approach to every project. Our team blends
              modern design principles with durable building practices—ensuring
              that every structure isn’t just visually striking, but built to
              perform for decades.
            </p>

            <p className="text-base md:text-lg leading-relaxed opacity-80 mb-6">
              We work closely with clients at every stage—planning, material
              selection, budgeting, and final execution. Transparency and
              communication are foundational to how we operate, enabling us to
              deliver results that exceed expectations without sacrificing
              timelines or quality.
            </p>

            <p className="text-base md:text-lg leading-relaxed opacity-80">
              Whether you're imagining a refreshed living space, a ground–up
              build, or a modern commercial upgrade, UrbanForge brings clarity,
              craftsmanship, and innovation to every idea.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <img
              src={aboutImg}
              alt="About UrbanForge"
              className="w-full rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
