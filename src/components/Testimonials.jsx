import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Home Renovation Client",
    rating: 5,
    text: "UrbanForge completely transformed our home. Their attention to detail and transparency throughout the process made everything stress-free.",
  },
  {
    name: "David Chen",
    role: "Commercial Build-Out",
    rating: 5,
    text: "Professional, on-time, and quality-driven. They handled our commercial renovation flawlessly and kept us informed at every stage.",
  },
  {
    name: "Emily Rodriguez",
    role: "Kitchen Remodeling",
    rating: 4,
    text: "The craftsmanship is outstanding. Our new kitchen feels modern, functional, and beautifully designed.",
  },
  {
    name: "Michael Thompson",
    role: "Full Home Remodel",
    rating: 5,
    text: "From planning to execution, everything was smooth and professional. UrbanForge brought our vision to life.",
  },
];

// Helper to get initials
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Testimonials = () => {
  return (
    <section
      id="testimonial"
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
            What Our Clients Say
          </h2>
          <p className="text-lg leading-relaxed opacity-80">
            Genuine feedback from clients who trusted us to bring their spaces
            to life.
          </p>
        </motion.div>

        {/* Splide Slider */}
        <Splide
          options={{
            type: "loop",
            autoplay: true,
            interval: 3500,
            pauseOnHover: false,
            pauseOnFocus: false,
            arrows: false,
            pagination: true,
            perPage: 3,
            gap: "1.5rem",
            breakpoints: {
              1024: { perPage: 2 },
              640: { perPage: 1 },
            },
          }}
          className="mt-6"
        >
          {testimonials.map((item, index) => (
            <SplideSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-2xl shadow-md border border-gray-200 h-full flex flex-col relative"
              >
                {/* Initials Avatar */}
                <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xl font-bold mb-4">
                  {getInitials(item.name)}
                </div>

                {/* Stars */}
                <div className="flex mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-base opacity-80 leading-relaxed mb-6 flex-grow">
                  "{item.text}"
                </p>

                {/* Client Info */}
                <div>
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-sm opacity-60">{item.role}</p>
                </div>
              </motion.div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;
