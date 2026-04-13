import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

interface PortfolioItem {
  name: string;
  sitename: string;
  url: string;
  description: string;
  tag: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    name: "Iron Clad",
    sitename: "ironclad",
    url: "https://iron-clad-two.vercel.app/",
    description: "Bold brand identity meets industrial-strength web presence.",
    tag: "Branding & Web",
  },
  {
    name: "Outdoor Job",
    sitename: "outdoorjob",
    url: "https://outdoor-job.vercel.app/",
    description: "Clean, conversion-focused design for the trades & outdoor industry.",
    tag: "Landing Page",
  },
  {
    name: "Verdura Gardening",
    sitename: "verdura",
    url: "https://verdura-gardening.vercel.app/",
    description: "Organic aesthetics and lush visuals for a gardening service brand.",
    tag: "Service Website",
  },
  {
    name: "Property Developer",
    sitename: "propertydeveloper",
    url: "https://property-developer-two.vercel.app/",
    description: "Premium real estate presence that commands trust and drives leads.",
    tag: "Real Estate",
  },
];

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const portfolioHref = `/portfolio/page/${item.sitename}`;

  return (
    <FadeIn delay={0.1 + index * 0.1}>
      <div
        className="group relative overflow-hidden rounded-2xl border border-white/5 hover:border-[#1a6bff]/30 transition-all duration-500"
        style={{ background: "rgba(255,255,255,0.02)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Preview iframe wrapper */}
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: "62%", background: "#0a0a0f" }}>
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ pointerEvents: "none" }}
          >
            <iframe
              src={item.url}
              title={item.name}
              className="absolute top-0 left-0 w-full h-full border-0 select-none"
              style={{ pointerEvents: "none" }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent pointer-events-none z-10" />

          {/* Tag */}
          <div className="absolute top-3 left-0 right-0 z-20 flex justify-center">
            <span className="font-dm text-[10px] md:text-xs text-[#00c6ff] tracking-widest uppercase bg-[#00c6ff]/10 border border-[#00c6ff]/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
              {item.tag}
            </span>
          </div>

          {/* Hover overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0 z-30 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "radial-gradient(ellipse at center, rgba(26,107,255,0.25) 0%, rgba(5,5,7,0.85) 100%)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <motion.a
                  href={portfolioHref}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="shimmer-btn font-syne font-bold text-white px-6 py-3 rounded-xl text-sm flex items-center gap-2 hover:shadow-[0_0_40px_rgba(26,107,255,0.5)] transition-shadow duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Take a Look
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card footer */}
        <div className="px-5 py-4 md:px-6 md:py-5 flex items-center justify-between">
          <div>
            <h3 className="font-syne font-black text-sm md:text-base text-white group-hover:text-[#00c6ff] transition-colors duration-300">
              {item.name}
            </h3>
            <p className="font-dm text-xs md:text-sm text-white/40 mt-0.5 leading-snug max-w-[220px]">
              {item.description}
            </p>
          </div>
          <a
            href={portfolioHref}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 group-hover:border-[#1a6bff]/50 flex items-center justify-center text-white/30 group-hover:text-[#1a6bff] transition-all duration-300 ml-3"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

export default function PortfoliosSection() {
  return (
    <section
      id="portfolios"
      className="py-16 md:py-32 relative overflow-hidden"
      style={{ background: "#070709" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#1a6bff] blur-[130px] md:blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-0 left-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-[#00c6ff] blur-[100px] md:blur-[160px] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <FadeIn>
            <span className="font-dm text-xs md:text-sm text-[#00c6ff] tracking-widest uppercase">
              Portfolios
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-syne font-black text-3xl md:text-5xl text-white mt-3 md:mt-4 leading-tight">
              Our <span className="gradient-text">Finished Websites</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-dm text-base md:text-lg text-white/40 max-w-2xl mx-auto mt-4 md:mt-6 leading-relaxed">
              Every website we build is a statement — crafted with precision, rooted in
              purpose, and designed to convert. Here's a glimpse of what we've delivered
              for our clients.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <PortfolioCard key={item.sitename} item={item} index={i} />
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p className="font-dm text-xs md:text-sm text-white/25 text-center mt-10 md:mt-14 tracking-wide">
            More coming soon — every client deserves a website they're proud of.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
