import { Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";
import FadeIn from "./FadeIn";
import { CALENDLY_URL } from "../data/constants";

const contactItems = [
  { icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />, label: "Email", value: "djalifsr@gmail.com" },
  { icon: <Phone className="w-4 h-4 md:w-5 md:h-5" />, label: "WhatsApp", value: "(+62) 813-3473-0675" },
  { icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" />, label: "Base", value: "Indonesia (Serving Global)" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-lg flex-shrink-0">
                <img
                  src="/icon.jpg"
                  alt="TSM Logo"
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-syne font-bold text-white text-sm">The Sunnah Marketing</p>
                <p className="font-dm text-[10px] text-white/40 tracking-widest uppercase">
                  Halal Marketing Agency
                </p>
              </div>
            </div>
            <p className="font-dm text-sm text-white/35 leading-relaxed max-w-sm mb-7 md:mb-8">
              The world's premier halal digital marketing agency. We help Muslim-owned
              businesses and halal brands grow globally with ethical, results-driven
              marketing — bi idhnillah.
            </p>
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
              {contactItems.map((item, i) => (
                <FadeIn key={item.label} delay={0.3 + i * 0.1} direction="left">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-[#1a6bff]/10 flex items-center justify-center text-[#1a6bff] flex-shrink-0 rounded-lg md:rounded-none">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-dm text-xs text-white/30 uppercase tracking-widest">{item.label}</p>
                      <p className="font-dm text-sm text-white/70 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/@dejavascales"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 rounded-lg md:rounded-none"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/thesunnahmarketing/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 rounded-lg md:rounded-none"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-syne font-bold text-white text-sm mb-5 md:mb-6 uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-3">
              {["Social Media Marketing", "Video Editing", "High Converting Website"].map((item) => (
                <li key={item}>
                  <a href="#services" className="font-dm text-sm text-white/35 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-syne font-bold text-white text-sm mb-5 md:mb-6 uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#about" },
                { label: "Why Us", href: "#why-us" },
                { label: "How We Work", href: "#process" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
                { label: "Book a Call", href: CALENDLY_URL },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-dm text-sm text-white/35 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="font-dm text-xs text-white/20">
            © {new Date().getFullYear()} The Sunnah Marketing. All rights reserved.
          </p>
          <div className="flex gap-5 md:gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" className="font-dm text-xs text-white/20 hover:text-white/50 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}