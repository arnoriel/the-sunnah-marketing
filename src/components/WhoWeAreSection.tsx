import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { WHO_WE_ARE_STATS, CALENDLY_URL } from "../data/constants";

export default function WhoWeAreSection() {
  return (
    <section id="about" className="py-16 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#1a6bff] blur-[120px] md:blur-[180px] opacity-5" />
        <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-[#00c6ff] blur-[100px] md:blur-[150px] opacity-[0.04]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left */}
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
                href={CALENDLY_URL}
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
            {WHO_WE_ARE_STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={0.15 + i * 0.1}>
                <div className="mobile-card p-5 md:p-6 h-full flex flex-col gap-2 md:gap-3 border border-white/5 hover:border-[#1a6bff]/30 transition-all duration-300 group rounded-xl md:rounded-none">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-[#1a6bff]/10 border border-[#1a6bff]/20 flex items-center justify-center text-[#1a6bff] group-hover:bg-[#1a6bff]/20 transition-colors rounded-lg md:rounded-none">
                    {stat.icon}
                  </div>
                  <p className="font-syne font-black text-3xl md:text-4xl gradient-text-blue">
                    {stat.number}
                  </p>
                  <p className="font-dm text-xs md:text-sm text-white/40 leading-snug">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}