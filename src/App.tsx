import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Menu, X, ArrowRight, ChevronDown, Star, Youtube, Instagram,
  Users, Mail, Phone,
  MapPin, Layers,
  PlayCircle, ChevronRight,
  Video, CheckCircle2, Clock, BarChart3, ShieldCheck, Play,
  CalendarCheck,
} from "lucide-react";

// ── TYPES ──────────────────────────────────────────────────────────────────
interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface FAQ {
  q: string;
  a: string;
}

// ── MOBILE DETECTION ───────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

// ── DATA ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const SERVICES: Service[] = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Social Media Marketing",
    desc: "We handle your content strategy, creation, and posting so you can focus on running your business. From short-form reels to carousel posts — all halal-compliant and built to grow your audience and convert followers into paying clients.",
    tags: ["Instagram", "YouTube", "TikTok", "LinkedIn"],
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Video Editing",
    desc: "Professional video editing tailored for Muslim creators and halal brands. We cut, colour-grade, and optimise your videos for maximum impact — whether it's a YouTube video, a product promo, or a long-form educational series.",
    tags: ["YouTube", "Reels", "Product Videos", "Da'wah Content"],
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "High Converting Website",
    desc: "We design and build clean, fast, mobile-first websites and landing pages that turn visitors into leads and leads into clients. Every site is built with Islamic design principles in mind — professional, modest, and trustworthy.",
    tags: ["Landing Pages", "UI/UX Design", "Conversion Funnels", "Web Dev"],
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Abdullah Omar",
    role: "Content Creator",
    text: "I work with him and Wallahi I genuinely rate him a 10/10 video editor to work with",
  },
  {
    name: "Abdullah Ghaffar",
    role: "Instagram Creator — 80k Followers",
    text: "Eid Mubarak to the best editor, may Allah accept, Ameen.",
  },
  {
    name: "Mahmoud Hassan",
    role: "Muslim Business Owner",
    text: "Akhi, Idk what to say anymore lol, Ur too good Alhamdulillah",
  },
];

const FAQS: FAQ[] = [
  {
    q: "Do you work with non-Muslim businesses?",
    a: "Yes, as long as the business operates within Halal guidelines (no alcohol, gambling, adult content, etc.). We're happy to work with ethical businesses of any background who want to serve or reach Muslim audiences.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most clients see increased engagement within 2–4 weeks. Qualified leads typically start coming in by week 6–8. Full momentum is usually reached by 90 days with consistent execution.",
  },
  {
    q: "What if I don't like the content?",
    a: "We offer revisions for all content we produce. Your approval is required before anything goes live — we won't publish a single post, video, or page without your sign-off.",
  },
  {
    q: "How do payments work?",
    a: "We require upfront payment for every package to ensure mutual commitment. We also offer payment plans for qualifying clients — reach out and we'll find a structure that works for you.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery Call",
    duration: "15 mins",
    desc: "We understand your business, goals, and ideal clients. No fluff — just a focused conversation to see if we're a great fit.",
  },
  {
    step: "02",
    title: "Strategy Session",
    duration: "30 mins",
    desc: "We map out your custom marketing plan — channels, content angles, offer positioning, and a clear roadmap tailored to your halal business.",
  },
  {
    step: "03",
    title: "Onboarding",
    duration: "Day 1–3",
    desc: "You approve the strategy, grant us access, and we hit the ground running. No long delays — we move fast and with intention.",
  },
  {
    step: "04",
    title: "Execution",
    duration: "Week 1–4",
    desc: "We create, schedule, and manage your marketing across agreed platforms. You focus on your business while we handle the growth engine.",
  },
  {
    step: "05",
    title: "Weekly Reports",
    duration: "Ongoing",
    desc: "Every week you get a clear, transparent report showing your growth, what's working, and what we're optimising next.",
  },
];

// ── YOUTUBE FACADE ─────────────────────────────────────────────────────────
// PERF: Mengganti iframe langsung dengan thumbnail + play button.
// YouTube iframe membawa ~500KB JS. Dengan facade, JS itu tidak di-load
// sampai user benar-benar klik → LCP jauh lebih cepat.
function YouTubeFacade({ videoId, title }: { videoId: string; title: string }) {
  const [activated, setActivated] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (activated) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
      />
    );
  }

  return (
    <button
      onClick={() => setActivated(true)}
      className="absolute inset-0 w-full h-full group cursor-pointer"
      aria-label={`Play ${title}`}
    >
      {/* Thumbnail — preloaded via <link rel="preload"> di index.html */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1a6bff]/90 border-2 border-white/40 flex items-center justify-center shadow-[0_0_40px_rgba(26,107,255,0.6)] group-hover:scale-110 transition-transform duration-300">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-3 left-3 right-3">
        <p className="font-dm text-xs text-white/70 bg-black/50 backdrop-blur-sm px-2 py-1 rounded inline-block">
          ▶ Watch — Scale The Halal Way
        </p>
      </div>
    </button>
  );
}

// ── FADE IN WRAPPER ────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const dirs = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
    none: { y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050507]/95 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-4 md:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-lg flex-shrink-0">
                <img
                  src="/icon.jpg"
                  alt="TSM Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-[#1a6bff] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div className="block">
              <p className="font-syne font-bold text-white text-xs md:text-sm leading-none">
                The Sunnah Marketing
              </p>
              <p className="font-dm text-[9px] md:text-[10px] text-white/40 tracking-widest uppercase mt-0.5">
                Halal Marketing Agency
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-dm text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#1a6bff] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://calendly.com/djalifsr/thesunnahmarketing"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn font-syne font-bold text-sm text-white px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(26,107,255,0.5)]"
            >
              Free Consultation
            </a>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="https://calendly.com/djalifsr/thesunnahmarketing"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn font-syne font-bold text-xs text-white px-4 py-2 rounded-lg"
            >
              Book Call
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#050507] flex flex-col pt-20 px-6"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-syne font-bold text-2xl text-white/80 hover:text-white border-b border-white/5 pb-4"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  const isMobile = useIsMobile();

  // ── Mobile Hero ──
  if (isMobile) {
    return (
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050507] pt-24 pb-12">
        {/* Static CSS blobs — no JS cost */}
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#1a6bff] blur-[80px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-48 h-48 rounded-full bg-[#00c6ff] blur-[60px] opacity-[0.08] pointer-events-none" />

        <div className="relative z-10 px-5 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-syne font-black text-[1.3rem] leading-[1.2] tracking-tight mb-3"
          >
            <span className="text-white">
              Give Me 3 Minutes And I'll Show You How Muslim Business Owners Are Finally Scaling And Growing Online Without Selling Their Soul To Do It.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-syne font-bold text-base gradient-text mb-5"
          >
            Scale Businesses The Halal Way
          </motion.p>

          {/* PERF: YouTubeFacade — tidak load YouTube JS sampai diklik */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative w-full max-w-sm mb-6"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#1a6bff]/40 via-[#00c6ff]/20 to-[#1a6bff]/40 rounded-2xl blur-md opacity-60" />
            <div
              className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d14]"
              style={{ aspectRatio: "16/9" }}
            >
              <YouTubeFacade videoId="FOup6vHkTyY" title="The Sunnah Marketing VSL" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-dm text-sm text-white/45 max-w-xs mx-auto mb-7 leading-relaxed"
          >
            A halal-focused Social Media Marketing agency built to help businesses
            grow without compromising their deen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col items-center gap-3 w-full max-w-xs"
          >
            <a
              href="https://calendly.com/djalifsr/thesunnahmarketing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full shimmer-btn font-syne font-bold text-white py-4 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="w-full font-dm font-medium text-white/50 py-3.5 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <PlayCircle className="w-4 h-4" />
              See Our Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            {[
              { val: "17+", label: "Clients" },
              { val: "3+", label: "Years" },
              { val: "100%", label: "Halal" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="font-syne font-black text-lg gradient-text-blue">{item.val}</span>
                <span className="font-dm text-[10px] text-white/30 uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Desktop Hero ──
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050507] mt-40">
      <div className="absolute inset-0">
        {/*
          PERF: Blobs sekarang pakai CSS class .hero-blob-1 & .hero-blob-2 (index.css).
          Animasi pulse berjalan di GPU compositor — identik visual, nol TBT.
        */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1a6bff] blur-[120px] opacity-15 hero-blob-1" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00c6ff] blur-[100px] opacity-10 hero-blob-2" />

        {/* Grid lines — static */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-[38%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00c6ff]/20 to-transparent" />
        <div className="absolute top-[62%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1a6bff]/15 to-transparent" />

        {/*
          PERF: 8 particles pakai CSS class .hero-particle (index.css).
          Posisi & timing tiap partikel diatur via :nth-child selector di CSS.
          Berjalan di GPU compositor — identik visual, nol TBT.
        */}
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
      </div>

      {/* PERF: Dihapus useScroll parallax — menyebabkan layout thrashing */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-syne font-black text-2xl md:text-3xl lg:text-4xl leading-[1.15] tracking-tight mb-4 max-w-3xl mx-auto"
        >
          <span className="block text-white">
            Give Me 3 Minutes And I'll Show You How Muslim Business Owners Are Finally Scaling And Growing Online Without Selling Their Soul To Do It.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-syne font-bold text-lg md:text-xl gradient-text mb-8"
        >
          Scale Businesses The Halal Way
        </motion.p>

        {/* PERF: YouTubeFacade — ~500KB YouTube JS tidak dimuat sampai diklik */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto mb-10"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#1a6bff]/40 via-[#00c6ff]/20 to-[#1a6bff]/40 rounded-2xl blur-lg opacity-60" />
          <div
            className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d14]"
            style={{ aspectRatio: "16/9" }}
          >
            <YouTubeFacade videoId="FOup6vHkTyY" title="The Sunnah Marketing VSL" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-dm text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The Sunnah Marketing is a halal focused Social Media Marketing agency
          built to help businesses grow without compromising their deen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="https://calendly.com/djalifsr/thesunnahmarketing"
            target="_blank"
            rel="noopener noreferrer"
            className="group shimmer-btn font-syne font-bold text-white px-8 py-4 rounded-xl flex items-center gap-2 hover:shadow-[0_0_50px_rgba(26,107,255,0.5)] transition-all duration-300"
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="group font-dm font-medium text-white/60 hover:text-white px-8 py-4 border border-white/10 hover:border-white/30 rounded-xl flex items-center gap-2 transition-all duration-300"
          >
            <PlayCircle className="w-4 h-4" />
            See Our Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── WHO WE ARE ─────────────────────────────────────────────────────────────
function WhoWeAreSection() {
  return (
    <section id="about" className="py-16 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#1a6bff] blur-[120px] md:blur-[180px] opacity-5" />
        <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-[#00c6ff] blur-[100px] md:blur-[150px] opacity-4" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — Text */}
          <div>
            <FadeIn>
              <span className="font-dm text-xs md:text-sm text-[#00c6ff] tracking-widest uppercase">
                Who We Are
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-syne font-black text-3xl md:text-5xl text-white mt-3 md:mt-4 leading-tight mb-4 md:mb-5">
                Built on <span className="gradient-text">Deen &amp; Results</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-dm text-base md:text-lg text-white/60 leading-relaxed mb-5 md:mb-6">
                The Sunnah Marketing is a halal focused Social Media Marketing agency
                built to help businesses grow without compromising their deen.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="font-dm text-sm md:text-base text-white/45 leading-relaxed mb-4 md:mb-6">
                Formerly known as{" "}
                <span className="text-[#00c6ff]/80 font-medium">Sunnahedits</span>, we
                evolved from video editing into a full-service marketing agency after
                seeing that content alone isn't enough.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="font-dm text-sm md:text-base text-white/45 leading-relaxed mb-8 md:mb-10">
                Strategy, positioning, and systems are what create real results. We
                work with halal businesses worldwide to build trust-driven content,
                ethical growth systems, and marketing that brings leads and sales the
                right way —{" "}
                <em className="text-white/60 not-italic">bi idhnillah.</em>
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <a
                href="https://calendly.com/djalifsr/thesunnahmarketing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 shimmer-btn font-syne font-bold text-white px-6 md:px-7 py-3 md:py-3.5 rounded-xl hover:shadow-[0_0_40px_rgba(26,107,255,0.4)] transition-all duration-300 text-sm md:text-base"
              >
                Work With Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </FadeIn>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {[
              { number: "17+", label: "Muslim Clients Served", icon: <Users className="w-5 h-5" /> },
              { number: "3+", label: "Years of Experience", icon: <Clock className="w-5 h-5" /> },
              { number: "90", label: "Days to Full Momentum", icon: <BarChart3 className="w-5 h-5" /> },
              { number: "100%", label: "Halal Compliant Work", icon: <ShieldCheck className="w-5 h-5" /> },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={0.15 + i * 0.1}>
                <div className="mobile-card p-5 md:p-6 h-full flex flex-col gap-2 md:gap-3 border border-white/5 hover:border-[#1a6bff]/30 transition-all duration-300 group rounded-xl md:rounded-none">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-[#1a6bff]/10 border border-[#1a6bff]/20 flex items-center justify-center text-[#1a6bff] group-hover:bg-[#1a6bff]/20 transition-colors rounded-lg md:rounded-none">
                    {stat.icon}
                  </div>
                  <p className="font-syne font-black text-3xl md:text-4xl gradient-text-blue">
                    {stat.number}
                  </p>
                  <p className="font-dm text-xs md:text-sm text-white/40 leading-snug">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── WHY US ─────────────────────────────────────────────────────────────────
function WhyUsSection() {
  const points = [
    "No inappropriate imagery or awrah exposure",
    "No gambling / alcohol / haram niches",
    "Ethical targeting that respects Islamic values",
    "Proven frameworks that convert views into paying clients",
  ];

  return (
    <section id="why-us" className="py-16 md:py-32 bg-[#050507] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full bg-[#1a6bff] blur-[150px] md:blur-[200px] opacity-[0.04]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <FadeIn>
            <span className="font-dm text-xs md:text-sm text-[#00c6ff] tracking-widest uppercase">
              Why Choose Us
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-syne font-black text-3xl md:text-5xl text-white mt-3 md:mt-4 leading-tight">
              100% Halal. <span className="gradient-text">100% Results.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-dm text-base md:text-lg text-white/40 max-w-2xl mx-auto mt-4 md:mt-6">
              Unlike other agencies, we don't just avoid haram — we design strategies
              specifically for Muslim businesses.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Checklist */}
          <div className="space-y-3 md:space-y-5">
            {points.map((point, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="left">
                <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 mobile-card border border-white/5 hover:border-[#1a6bff]/20 transition-all duration-300 group rounded-xl md:rounded-none">
                  <div className="w-8 h-8 bg-[#1a6bff]/10 border border-[#1a6bff]/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#1a6bff]/20 transition-colors rounded-lg md:rounded-none">
                    <CheckCircle2 className="w-4 h-4 text-[#1a6bff]" />
                  </div>
                  <p className="font-dm text-sm md:text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                    {point}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Statement card */}
          <FadeIn delay={0.3} direction="right">
            <div className="relative mt-4 md:mt-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#1a6bff]/30 to-[#00c6ff]/10 rounded-2xl blur-xl opacity-40" />
              <div className="relative mobile-card border border-[#1a6bff]/20 p-7 md:p-10 rounded-2xl">
                <div className="w-11 h-11 md:w-12 md:h-12 bg-[#1a6bff]/10 border border-[#1a6bff]/30 flex items-center justify-center text-[#1a6bff] mb-6 md:mb-8 rounded-lg md:rounded-none">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="font-syne font-black text-xl md:text-2xl text-white mb-4 md:mb-5 leading-tight">
                  We don't compromise your deen for a few extra likes.
                </h3>
                <p className="font-dm text-sm md:text-base text-white/50 leading-relaxed mb-6 md:mb-8">
                  We build marketing systems that honour Allah (SWT) while growing
                  your business. Every piece of content, every ad, every strategy —
                  filtered through an Islamic lens before it reaches your audience.
                </p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-5 md:pt-6">
                  <div className="w-8 h-8 overflow-hidden rounded-lg flex-shrink-0">
                    <img
                      src="/icon.jpg"
                      alt="TSM"
                      width={32}
                      height={32}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-syne font-bold text-white text-sm">The Sunnah Marketing</p>
                    <p className="font-dm text-xs text-white/30">Halal Marketing Agency</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES ───────────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-32 bg-[#050507] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#1a6bff] blur-[100px] md:blur-[150px] opacity-5" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <FadeIn>
            <span className="font-dm text-xs md:text-sm text-[#00c6ff] tracking-widest uppercase">
              Our Services
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-syne font-black text-3xl md:text-5xl text-white mt-3 md:mt-4 leading-tight mb-4 md:mb-5">
              <span className="gradient-text">What We Offer</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-dm text-sm md:text-lg text-white/40 max-w-xl mx-auto">
              Every service we offer is built around one goal: growing your business
              while staying true to your values.
            </p>
          </FadeIn>
        </div>

        {/* Mobile: stacked cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.08}>
              <div className="mobile-card p-6 rounded-2xl border border-white/8 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#1a6bff]/10 border border-[#1a6bff]/20 rounded-xl flex items-center justify-center text-[#1a6bff]">
                    {service.icon}
                  </div>
                  <h3 className="font-syne font-bold text-base text-white">{service.title}</h3>
                </div>
                <p className="font-dm text-sm text-white/40 leading-relaxed mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="font-dm text-xs text-[#00c6ff]/70 border border-[#00c6ff]/20 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.08} className="bg-[#050507]">
              <div className="card-glass-hover p-8 h-full group cursor-pointer border border-transparent hover:border-[#1a6bff]/20 transition-all duration-300">
                <div className="w-12 h-12 bg-[#1a6bff]/10 border border-[#1a6bff]/20 flex items-center justify-center text-[#1a6bff] mb-6 group-hover:bg-[#1a6bff]/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-syne font-bold text-xl text-white mb-3">{service.title}</h3>
                <p className="font-dm text-sm text-white/40 leading-relaxed mb-5">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="font-dm text-xs text-[#00c6ff]/70 border border-[#00c6ff]/20 px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-1 text-[#1a6bff] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-dm text-sm">Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ────────────────────────────────────────────────────────────────
function ProcessSection() {
  return (
    <section id="process" className="py-16 md:py-32 bg-[#0a0a0f] relative">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center mb-12 md:mb-20">
          <FadeIn>
            <span className="font-dm text-xs md:text-sm text-[#00c6ff] tracking-widest uppercase">
              How We Work
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-syne font-black text-3xl md:text-5xl text-white mt-3 md:mt-4 leading-tight">
              Our Proven <span className="gradient-text">5-Step Process</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-dm text-sm md:text-base text-white/40 max-w-xl mx-auto mt-4 md:mt-5">
              Trusted by 17+ Muslim clients — from discovery to results in 30–90 days.
            </p>
          </FadeIn>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex flex-col gap-0 md:hidden relative">
          <div className="absolute left-[1.4rem] top-8 bottom-8 w-px bg-gradient-to-b from-[#1a6bff]/40 via-[#1a6bff]/20 to-transparent" />
          {PROCESS.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.1}>
              <div className="flex gap-4 pb-8 relative">
                <div className="flex-shrink-0 w-11 h-11 bg-[#0a0a0f] border-2 border-[#1a6bff]/40 font-syne font-black text-[#1a6bff] text-xs flex items-center justify-center rounded-full z-10">
                  {step.step}
                </div>
                <div className="pt-1 pb-2">
                  <p className="font-dm text-xs text-[#00c6ff]/60 tracking-widest uppercase mb-1">
                    {step.duration}
                  </p>
                  <h3 className="font-syne font-bold text-base text-white mb-1">{step.title}</h3>
                  <p className="font-dm text-sm text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Desktop: horizontal */}
        <div className="relative hidden md:block">
          <div className="absolute top-[2.25rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#1a6bff]/30 to-transparent" />
          <div className="grid grid-cols-5 gap-8">
            {PROCESS.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="relative group flex flex-col gap-4 items-center text-center">
                  <div className="w-[4.5rem] h-[4.5rem] bg-[#0a0a0f] border-2 border-[#1a6bff]/40 font-syne font-black text-[#1a6bff] text-sm flex items-center justify-center rounded-full group-hover:border-[#1a6bff] group-hover:bg-[#1a6bff]/10 transition-all duration-300 glow-blue">
                    {step.step}
                  </div>
                  <div>
                    <p className="font-dm text-xs text-[#00c6ff]/60 tracking-widest uppercase mb-1">
                      {step.duration}
                    </p>
                    <h3 className="font-syne font-bold text-lg text-white mb-2">{step.title}</h3>
                    <p className="font-dm text-sm text-white/40 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 text-center">
            {[
              { icon: <Clock className="w-4 h-4 text-[#00c6ff]" />, text: <>See results in <span className="text-white font-medium">30–60 days</span></> },
              { icon: <BarChart3 className="w-4 h-4 text-[#00c6ff]" />, text: <>Full momentum by <span className="text-white font-medium">90 days</span></> },
              { icon: <Users className="w-4 h-4 text-[#00c6ff]" />, text: <>Trusted by <span className="text-white font-medium">17+ Muslim clients</span></> },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 border border-[#1a6bff]/20 bg-[#1a6bff]/5 px-4 md:px-6 py-2.5 md:py-3 rounded-full w-full sm:w-auto justify-center">
                {item.icon}
                <span className="font-dm text-xs md:text-sm text-white/60">{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────
function VideoCard({
  src,
  label,
  poster,
  className = "",
}: {
  src: string;
  label: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activated, setActivated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleActivate = useCallback(() => {
    if (!activated) {
      setActivated(true);
      // Beri waktu browser mount video, baru play
      setTimeout(() => {
        videoRef.current?.play();
        setIsPlaying(true);
      }, 50);
      return;
    }
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, [activated]);

  return (
    <div
      className={`relative overflow-hidden border border-white/8 group cursor-pointer hover:border-[#1a6bff]/40 transition-all duration-300 ${className}`}
      style={{ aspectRatio: "9/16" }}
      onClick={handleActivate}
    >
      <div className="absolute inset-0 bg-[#0d0d18]" />

      {/* Video — hanya di-mount setelah diklik */}
      {activated && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          playsInline
          preload="auto"
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Poster / thumbnail — tampil sebelum diklik atau saat pause */}
      {poster && !isPlaying && (
        <img
          src={poster}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Play / Pause overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        style={{ background: isPlaying ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.45)" }}
      >
        <motion.div
          whileTap={{ scale: 0.93 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1a6bff]/80 border-2 border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(26,107,255,0.5)]"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white ml-0.5" />
          )}
        </motion.div>
      </div>

      {/* Label hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-dm text-xs text-white/70">{label}</p>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const photoItems = [
    { src: "/assets/abdullahghaffar1.jpg", label: "Followers Growth on Abdullah Ghaffar" },
    { src: "/assets/abdullahghaffar2.jpg", label: "Reel Insight Growth on Abdullah Ghaffar" },
    { src: "/assets/abdullahghaffar4.jpg", label: "Train with Gaffar Before" },
    { src: "/assets/abdullahghaffar3.jpg", label: "Train with Gaffar After" },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-32 bg-[#050507] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[300px] md:h-[400px] rounded-full bg-[#1a6bff] blur-[100px] md:blur-[150px] opacity-5" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-20 px-5 md:px-6">
          <FadeIn>
            <span className="font-dm text-xs md:text-sm text-[#00c6ff] tracking-widest uppercase">
              Client Love
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-syne font-black text-3xl md:text-5xl text-white mt-3 md:mt-4 leading-tight">
              What Our Clients <span className="gradient-text">Say About Us</span>
            </h2>
          </FadeIn>
        </div>

        {/* Mobile: horizontal scroll snap */}
        <div className="md:hidden">
          <div className="mobile-media-scroll">
            <div className="mobile-media-card">
              <VideoCard src="/assets/abdullahghaffar5.mp4" poster="/assets/thumbnail.png" label="Client Video Testimonial" />
            </div>
            {photoItems.map((item, i) => (
              <div
                key={i}
                className="mobile-media-card relative overflow-hidden border border-white/8"
                style={{ aspectRatio: "9/16" }}
              >
                <div className="absolute inset-0 bg-[#13131f]" />
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="font-dm text-xs text-white/60">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 px-5">
            <div className="h-px flex-1 bg-white/5" />
            <p className="font-dm text-xs text-white/20 tracking-widest uppercase">swipe to explore</p>
            <div className="h-px flex-1 bg-white/5" />
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-5 gap-3 mb-5 px-6">
          <FadeIn delay={0}>
            <VideoCard src="/assets/abdullahghaffar5.mp4" poster="/assets/thumbnail.png" label="Client Video Testimonial" />
          </FadeIn>
          {photoItems.map((item, i) => (
            <FadeIn key={i} delay={(i + 1) * 0.07}>
              <div
                className="relative overflow-hidden border border-white/8 group hover:border-[#1a6bff]/40 transition-all duration-300 w-full"
                style={{ aspectRatio: "9/16" }}
              >
                <div className="absolute inset-0 bg-[#13131f]" />
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[#1a6bff]/0 group-hover:bg-[#1a6bff]/5 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-dm text-xs text-white/70">{item.label}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15}>
          <p className="font-dm text-sm md:text-base text-white/40 max-w-xl mx-auto mt-5 mb-12 md:mb-20 px-5 md:px-6 text-center">
            Our client{" "}
            <span className="text-white font-medium">Abdullah Ghaffar</span> went
            from{" "}
            <span className="text-[#1a6bff] font-medium">50k → 80k followers</span>{" "}
            on Instagram.
          </p>
        </FadeIn>

        {/* Text testimonials */}
        <div className="mx-5 md:mx-6">
          {/* Mobile: stacked */}
          <div className="flex flex-col gap-3 md:hidden">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.07}>
                <div className="mobile-card p-5 rounded-2xl border border-white/8">
                  <div className="flex items-center gap-1 mb-2.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-[#1a6bff] text-[#1a6bff]" />
                    ))}
                  </div>
                  <p className="font-dm text-sm text-white/60 leading-relaxed mb-3">"{t.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#1a6bff]/20 border border-[#1a6bff]/30 flex items-center justify-center">
                      <span className="font-syne font-bold text-[#1a6bff] text-xs">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-syne font-bold text-white text-xs">{t.name}</p>
                      <p className="font-dm text-xs text-white/30">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-3 gap-px bg-white/5">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.07}>
                <div className="bg-[#050507] p-6 h-full">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-[#1a6bff] text-[#1a6bff]" />
                    ))}
                  </div>
                  <p className="font-dm text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">"{t.text}"</p>
                  <p className="font-syne font-bold text-white text-sm">{t.name}</p>
                  <p className="font-dm text-xs text-white/30">{t.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-32 bg-[#0a0a0f] relative">
      <div className="max-w-4xl mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-20">
          <FadeIn>
            <span className="font-dm text-xs md:text-sm text-[#00c6ff] tracking-widest uppercase">
              Got Questions?
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-syne font-black text-3xl md:text-5xl text-white mt-3 md:mt-4 leading-tight">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-2 md:gap-0 md:space-y-px md:bg-white/5">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="mobile-card md:bg-[#0a0a0f] rounded-xl md:rounded-none border border-white/8 md:border-0 overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-7 text-left hover:bg-[#050507]/50 md:hover:bg-[#050507] transition-colors group"
                >
                  <span className="font-syne font-bold text-base md:text-lg text-white/80 group-hover:text-white pr-3">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronRight
                      className={`w-5 h-5 transition-colors ${
                        open === i ? "text-[#1a6bff]" : "text-white/30"
                      }`}
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-dm text-sm md:text-base text-white/40 leading-relaxed px-5 md:px-7 pb-5 md:pb-7">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA BANNER ─────────────────────────────────────────────────────────────
function CTABanner() {
  const steps = [
    {
      num: "1",
      label: "Book Your Free Discovery Call",
      sub: "No commitment — just clarity on your next move",
      href: "https://calendly.com/djalifsr/thesunnahmarketing",
      cta: "Book Now →",
    },
    {
      num: "2",
      label: "Choose Your Package",
      sub: "We'll send you the onboarding form straight away",
      href: null,
      cta: null,
    },
    {
      num: "3",
      label: "Start Getting Results",
      sub: "Within 7 days of signing — we move fast",
      href: null,
      cta: null,
    },
  ];

  return (
    <section className="py-16 md:py-32 bg-[#050507] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a6bff]/10 via-transparent to-[#00c6ff]/5" />
        {/*
          PERF: Rotating rings sekarang pakai CSS class .cta-ring-1 & .cta-ring-2
          (didefinisikan di index.css dengan @keyframes ring-cw / ring-ccw).
          Berjalan di GPU compositor thread — visual identik, nol TBT.
        */}
        <div className="hidden md:block">
          <div className="cta-ring-1 absolute -right-64 -top-64 w-[600px] h-[600px] border border-[#1a6bff]/5 rounded-full" />
          <div className="cta-ring-2 absolute -left-32 -bottom-32 w-[400px] h-[400px] border border-[#00c6ff]/5 rounded-full" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-6 text-center relative z-10">
        <FadeIn>
          <div className="inline-flex items-center gap-2 border border-[#1a6bff]/30 bg-[#1a6bff]/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-6 md:mb-8">
            <CalendarCheck className="w-3.5 h-3.5 text-[#00c6ff]" />
            <span className="font-dm text-xs md:text-sm text-white/70">
              Limited spots available this quarter
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-syne font-black text-3xl md:text-6xl text-white mt-4 leading-tight mb-5 md:mb-8">
            Ready to Scale Your
            <br />
            <span className="gradient-text">Business the Halal Way?</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-dm text-base md:text-xl text-white/40 max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed">
            Book a free 30-minute discovery call. No commitments. Just a clear
            roadmap for growing your business the halal way.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-14">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.1}>
              <div className="mobile-card border border-white/8 p-5 md:p-7 text-left rounded-xl md:rounded-none hover:border-[#1a6bff]/30 transition-all duration-300 group h-full">
                <span className="font-syne font-black text-4xl md:text-5xl text-[#1a6bff]/20 group-hover:text-[#1a6bff]/30 transition-colors leading-none">
                  {step.num}
                </span>
                <h4 className="font-syne font-bold text-white text-sm md:text-base mt-2 md:mt-3 mb-1.5 md:mb-2 leading-snug">
                  {step.label}
                </h4>
                <p className="font-dm text-sm text-white/35 leading-relaxed">{step.sub}</p>
                {step.href && (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 md:mt-4 font-dm text-sm text-[#1a6bff] hover:text-[#00c6ff] transition-colors"
                  >
                    {step.cta}
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/djalifsr/thesunnahmarketing"
              target="_blank"
              rel="noopener noreferrer"
              className="group shimmer-btn font-syne font-bold text-white px-8 md:px-10 py-4 md:py-5 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_60px_rgba(26,107,255,0.4)] transition-all duration-300 text-base md:text-lg"
            >
              Book Free Discovery Call
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
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
              {[
                { icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />, label: "Email", value: "djalifsr@gmail.com" },
                { icon: <Phone className="w-4 h-4 md:w-5 md:h-5" />, label: "WhatsApp", value: "(+62) 813-3473-0675" },
                { icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" />, label: "Base", value: "Indonesia (Serving Global)" },
              ].map((item, i) => (
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
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 rounded-lg md:rounded-none"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/thesunnahmarketing/"
                target="_blank"
                rel="noopener noreferrer"
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
                  <a
                    href="#services"
                    className="font-dm text-sm text-white/35 hover:text-white transition-colors"
                  >
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
                { label: "Book a Call", href: "https://calendly.com/djalifsr/thesunnahmarketing" },
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
              <a
                key={item}
                href="#"
                className="font-dm text-xs text-white/20 hover:text-white/50 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── SCROLL TO TOP ──────────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 shimmer-btn flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(26,107,255,0.5)] transition-all duration-300 rounded-xl"
        >
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── APP ROOT ───────────────────────────────────────────────────────────────
// PERF: CursorSpotlight dihapus — mousemove handler setiap frame = TBT naik.
export default function App() {
  return (
    <div className="noise-bg">
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <WhoWeAreSection />
        <div className="section-divider" />
        <WhyUsSection />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <ProcessSection />
        <div className="section-divider" />
        <TestimonialsSection />
        <div className="section-divider" />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}