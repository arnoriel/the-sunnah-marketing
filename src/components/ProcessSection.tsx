import { Clock, BarChart3, Users } from "lucide-react";
import FadeIn from "./FadeIn";
import { PROCESS } from "../data/constants";

export default function ProcessSection() {
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