import { ShieldCheck, CheckCircle2 } from "lucide-react";
import FadeIn from "./FadeIn";
import { WHY_US_POINTS } from "../data/constants";

export default function WhyUsSection() {
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
            {WHY_US_POINTS.map((point, i) => (
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