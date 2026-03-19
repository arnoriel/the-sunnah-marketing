import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { SERVICES } from "../data/constants";

export default function ServicesSection() {
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

        {/* Mobile: stacked */}
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