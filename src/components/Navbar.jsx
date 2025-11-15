// =========================
// Navbar.jsx (regenerated, improved spacing + social icons)
// =========================
import React, { useState } from "react";
import {
  Menu,
  X,
  Mail,
  Phone,
  Home,
  FileText,
  Layers,
  Users,
  Briefcase,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home", Icon: Home },
    { name: "About", href: "#about", Icon: Users },
    { name: "Services", href: "#services", Icon: Layers },
    { name: "Testimonial", href: "#testimonial", Icon: FileText },
    { name: "Portfolio", href: "#portfolio", Icon: Briefcase },
    { name: "Service Area", href: "#service-area", Icon: Home },
  ];

  return (
    <header className="w-full sticky top-0 z-50 font-sans">
      {/* Top contact + social bar */}

      <div className="bg-[var(--text-dark)] border-b border-white/30">
        <div
          className="
      max-w-7xl mx-auto px-4 md:px-6
      block md:flex
      md:flex-row
      items-center md:items-center
      justify-center md:justify-between
      text-[var(--primary-bg)]
      text-sm
      gap-2 md:gap-0
      h-auto md:h-10
      text-center md:text-left
    "
        >
          {/* LEFT: email */}
          <div className="flex items-center gap-2 justify-center md:justify-start truncate">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <a
              href="mailto:info@radsconstruction.com"
              className="underline truncate"
            >
              info@radsconstruction.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-[var(--primary-bg)] text-[var(--text-dark)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left: logo */}
            <div className="flex items-center gap-4">
              <a href="#home" className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="UrbanForge logo"
                  className="h-12 w-12 object-contain"
                />
                <div className="leading-tight">
                  <div className="font-extrabold text-lg tracking-tight">
                    UrbanForge
                  </div>
                  <div className="text-xs">General Contractors</div>
                </div>
              </a>
            </div>

            {/* Center: nav links (desktop) */}
            <div className="hidden lg:flex items-center space-x-6">
              {links.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg nav-hover hover:shadow-sm text-[var(--text-dark)]"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{name}</span>
                </a>
              ))}
            </div>

            {/* Right: CTA + mobile menu button */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 rounded-lg shadow nav-hover"
              >
                <Mail className="w-4 h-4" />
                Get a Quote
              </a>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md focus:outline-none"
                aria-label="Toggle menu"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu: full width panel with grouped items for clarity */}
        {open && (
          <div className="md:hidden border-t">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-[var(--primary-bg)]">
              {/* Primary links */}
              <div className="grid grid-cols-1 gap-2">
                {links.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/40 nav-hover"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{name}</span>
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t pt-3"></div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
