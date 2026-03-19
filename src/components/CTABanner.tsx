import { ArrowRight, CalendarCheck } from "lucide-react";
import FadeIn from "./FadeIn";
import { CALENDLY_URL } from "../data/constants";

const steps = [
  {
    num: "1",
    label: "Book Your Free Discovery Call",
    sub: "No commitment — just clarity on your next move",
    href: CALENDLY_URL,
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

export default function CTABanner() {
  return (
    <section className="py-16 md:py-32 bg-[#050507] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a6bff]/10 via-transparent to-[#00c6ff]/5" />
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
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group shimmer-btn font-syne font-bold text-white px-8 md:px-10 py-4 md:py-5 rounded-xl inline-flex items-center justify-center gap-2 hover:shadow-[0_0_60px_rgba(26,107,255,0.4)] transition-all duration-300 text-base md:text-lg"
          >
            Book Free Discovery Call
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}