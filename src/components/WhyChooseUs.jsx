import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Hammer,
  Shield,
  Clock,
  Users,
  Zap,
  TrendingUp,
  Heart,
} from "lucide-react";

const features = [
  {
    title: "Proven Craftsmanship",
    icon: Hammer,
    desc: "Every project is handled by skilled builders committed to precision, detail, and long-lasting results.",
  },
  {
    title: "Licensed & Insured",
    icon: Shield,
    desc: "We operate with full certification and insurance, giving you peace of mind from start to finish.",
  },
  {
    title: "On-Time Delivery",
    icon: Clock,
    desc: "Our scheduling discipline ensures your project moves efficiently—without unnecessary delays.",
  },
  {
    title: "Client-Centered Approach",
    icon: Users,
    desc: "We involve you at every stage, ensuring every detail aligns with your vision and expectations.",
  },
  {
    title: "Modern Building Standards",
    icon: Zap,
    desc: "High-quality materials, updated techniques, and strong engineering principles guide every build.",
  },
  {
    title: "Transparent Pricing",
    icon: TrendingUp,
    desc: "Clear estimates, honest guidance, and no surprise costs—just straightforward project planning.",
  },
  {
    title: "High Customer Satisfaction",
    icon: Heart,
    desc: "We build long-term relationships through reliability, clear communication, and dependable service.",
  },
  {
    title: "Quality Guarantee",
    icon: CheckCircle,
    desc: "Our work is backed by a service guarantee, ensuring durability and premium performance.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full py-20 bg-[var(--kp-body-bg)] text-[var(--text-dark)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Us</h2>
          <p className="text-lg leading-relaxed opacity-80">
            Choosing the right construction partner is essential. At Rads
            Construction, we bring together craftsmanship, transparency, and
            modern building standards to deliver spaces that stand the test of
            time. Here's what sets us apart.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 flex flex-col"
            >
              <item.icon className="w-10 h-10 text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                {item.desc}
              </p>

              <a
                href="#contact"
                className="mt-auto inline-block text-sm font-medium px-4 py-2 rounded-full bg-[var(--accent)] text-white hover:opacity-90 transition"
              >
                Learn More
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
