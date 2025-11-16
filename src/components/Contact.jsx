// Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

/**
 * Contact component
 * - Frontend form posts to /api/contact (serverless function)
 * - Includes: name, email, phone, budget (radio), service (select), message
 * - Honeypot field to reduce spam
 * - Contact info card to the right (md+)
 * - Uses Tailwind classes (assumes Tailwind present)
 */

const SERVICES = [
  "Residential Remodeling Services",
  "New Home Construction",
  "Commercial Remodeling Services",
  "Custom Deck Construction",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "$5k - $10k",
    service: SERVICES[0],
    message: "",
    hp: "", // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (form.hp) return "Spam detected"; // honeypot filled
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      return "Please enter a valid email.";
    if (!form.message.trim())
      return "Please include a short message about the project.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setResult({ success: false, message: err });

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send message");

      setResult({
        success: true,
        message: "Message sent — we’ll respond within 1–2 business days.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        budget: "$5k - $10k",
        service: SERVICES[0],
        message: "",
        hp: "",
      });
    } catch (err) {
      console.error(err);
      setResult({
        success: false,
        message: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-16 bg-[var(--kp-body-bg)] text-[var(--text-dark)]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
          >
            <h3 className="text-2xl font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-[var(--text-dark)]/80 mb-6">
              Tell us about your project and budget. We’ll reach back to
              schedule a no-pressure consultation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot (hidden) */}
              <label className="hidden" htmlFor="company">
                Company
              </label>
              <input
                id="company"
                name="hp"
                value={form.hp}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                placeholder="Company"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Email</span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@company.com"
                    className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Phone</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">
                    Service Needed
                  </span>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Budget radios */}
              <fieldset>
                <legend className="text-sm font-medium mb-2">
                  Estimated Project Budget
                </legend>
                <div className="flex flex-col sm:flex-row gap-3">
                  {["$5k - $10k", "$10k - $20k", "$25k - $40k", "$40k+"].map(
                    (b) => (
                      <label
                        key={b}
                        className="inline-flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={b}
                          checked={form.budget === b}
                          onChange={handleChange}
                          className="form-radio h-4 w-4 text-[var(--accent)]"
                        />
                        <span className="text-sm">{b}</span>
                      </label>
                    )
                  )}
                </div>
              </fieldset>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about timeline, site, goals, and anything else we should know."
                  className="min-h-[140px] rounded-lg border border-gray-200 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
                  required
                />
              </label>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] text-white px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {result && (
                  <div
                    className={`text-sm ${
                      result.success ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {result.message}
                  </div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Contact Info Card */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">
                Contact Information
              </h4>

              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10">
                  <Mail className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <a
                    href="mailto:contact@urbanforge.com"
                    className="text-sm text-[var(--text-dark)]/90"
                  >
                    info@radsconstruction.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10">
                  <MapPin className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-sm font-medium">Address</div>
                  <div className="text-sm text-[var(--text-dark)]/90">
                    123 UrbanForge Way
                    <br />
                    Metropolis, ST 12345
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10">
                  <Clock className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-sm font-medium">Opening Hours</div>
                  <div className="text-sm text-[var(--text-dark)]/90">
                    Mon–Fri: 8:00am – 6:00pm
                    <br />
                    Sat: 9:00am – 2:00pm
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
