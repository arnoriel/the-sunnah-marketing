import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import YouTubeFacade from "./YouTubeFacade";
import { CALENDLY_URL, YT_VIDEO_ID } from "../data/constants";

// ─────────────────────────────────────────────────────────────────────────────
// CRITICAL PERF NOTE:
// The original code used useIsMobile() which initialised as `false` (desktop)
// then flipped to `true` on mobile → Desktop Hero rendered first → then
// immediately replaced by Mobile Hero → MASSIVE CLS (0.236).
//
// Fix: ONE unified responsive component using CSS classes only.
// No JS branching → no rerender → CLS goes to 0.
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="
        relative min-h-screen overflow-hidden bg-[#050507]
        flex flex-col items-center justify-center
        pt-24 pb-12
        md:pt-0 md:pb-0 md:mt-40
      "
    >
      {/* ── MOBILE blobs (hidden on md+) ── */}
      <div className="md:hidden absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#1a6bff] blur-[80px] opacity-10 pointer-events-none" />
      <div className="md:hidden absolute bottom-1/3 left-0 w-48 h-48 rounded-full bg-[#00c6ff] blur-[60px] opacity-[0.08] pointer-events-none" />

      {/* ── DESKTOP background (hidden on mobile) ── */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1a6bff] blur-[120px] opacity-15 hero-blob-1" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00c6ff] blur-[100px] opacity-10 hero-blob-2" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-[38%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00c6ff]/20 to-transparent" />
        <div className="absolute top-[62%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1a6bff]/15 to-transparent" />
        {/* CSS-animated particles (GPU compositor) */}
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 md:px-6 flex flex-col items-center text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-syne font-black text-[1.3rem] md:text-2xl lg:text-4xl leading-[1.2] tracking-tight mb-3 md:mb-4 max-w-3xl"
        >
          <span className="text-white">
            Give Me 3 Minutes And I'll Show You How Muslim Business Owners Are
            Finally Scaling And Growing Online Without Selling Their Soul To Do It.
          </span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-syne font-bold text-base md:text-lg lg:text-xl gradient-text mb-5 md:mb-8"
        >
          Scale Businesses The Halal Way
        </motion.p>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-sm md:max-w-3xl mb-6 md:mb-10"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#1a6bff]/40 via-[#00c6ff]/20 to-[#1a6bff]/40 rounded-2xl blur-md md:blur-lg opacity-60" />
          {/* aspect-ratio container — explicit padding-top avoids CLS */}
          <div
            className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d14]"
            style={{ aspectRatio: "16/9" }}
          >
            <YouTubeFacade
              videoId={YT_VIDEO_ID}
              title="The Sunnah Marketing VSL"
              priority
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-dm text-sm md:text-lg text-white/45 md:text-white/50 max-w-xs md:max-w-2xl mx-auto mb-7 md:mb-12 leading-relaxed"
        >
          The Sunnah Marketing is a halal focused Social Media Marketing agency
          built to help businesses grow without compromising their deen.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center gap-3 w-full max-w-xs md:flex-row md:max-w-none md:justify-center md:gap-4 mb-8 md:mb-16"
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group shimmer-btn font-syne font-bold text-white py-4 px-8 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base w-full md:w-auto hover:shadow-[0_0_50px_rgba(26,107,255,0.5)] transition-all duration-300"
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="group font-dm font-medium text-white/50 md:text-white/60 py-3.5 md:py-4 px-8 border border-white/10 hover:border-white/30 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base w-full md:w-auto hover:text-white transition-all duration-300"
          >
            <PlayCircle className="w-4 h-4" />
            See Our Services
          </a>
        </motion.div>

        {/* Stats — shown on all screen sizes, layout changes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex items-center justify-center gap-6 md:gap-12"
        >
          {[
            { val: "17+", label: "Clients" },
            { val: "3+", label: "Years" },
            { val: "100%", label: "Halal" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-syne font-black text-lg md:text-2xl gradient-text-blue">
                {item.val}
              </span>
              <span className="font-dm text-[10px] md:text-xs text-white/30 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}