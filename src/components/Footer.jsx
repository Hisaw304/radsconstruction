import React from "react";
import {
  Mail,
  Phone,
  Home,
  Users,
  Layers,
  Briefcase,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-bg)] text-[var(--text-dark)] mt-20 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/logo.png"
              alt="Rads Construction logo"
              className="h-12 w-12 object-contain"
            />
            <div>
              <div className="font-bold text-lg">Rads</div>
              <div className="text-sm">Construction</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            We deliver commercial and residential construction across the United
            States. Quality, safety and reliability — our priorities.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#home"
                className="hover:underline flex items-center gap-2"
              >
                <Home className="w-4 h-4" /> Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:underline flex items-center gap-2"
              >
                <Users className="w-4 h-4" /> About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:underline flex items-center gap-2"
              >
                <Layers className="w-4 h-4" /> Services
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="hover:underline flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" /> Portfolio
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4" />{" "}
            <a href="mailto:info@radsconstruction.com" className="underline">
              info@radsconstruction.com
            </a>
          </div>

          <div>
            <div className="font-semibold ">Address</div>
            <div className="flex items-center gap-2 mb-3 ">
              8510 Fredericksburg Rd,
              <br />
              San Antonio, Texas 78229
            </div>
          </div>
          <div className="mt-6">
            <h5 className="font-semibold mb-2">Follow Us</h5>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-full nav-hover icon-shadow"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded-full nav-hover icon-shadow"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full nav-hover icon-shadow"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-full nav-hover icon-shadow"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/30 py-4 text-center text-sm">
        © {new Date().getFullYear()} UrbanForge General Contractors — All rights
        reserved.
      </div>
    </footer>
  );
}
