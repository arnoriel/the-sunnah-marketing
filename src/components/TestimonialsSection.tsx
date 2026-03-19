import { Star } from "lucide-react";
import FadeIn from "./FadeIn";
import VideoCard from "./VideoCard";
import { TESTIMONIALS } from "../data/constants";

const photoItems = [
  { src: "/assets/abdullahghaffar1.jpg", label: "Followers Growth on Abdullah Ghaffar" },
  { src: "/assets/abdullahghaffar2.jpg", label: "Reel Insight Growth on Abdullah Ghaffar" },
  { src: "/assets/abdullahghaffar4.jpg", label: "Train with Gaffar Before" },
  { src: "/assets/abdullahghaffar3.jpg", label: "Train with Gaffar After" },
];

export default function TestimonialsSection() {
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

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden">
          <div className="mobile-media-scroll">
            <div className="mobile-media-card">
              <VideoCard
                src="/assets/abdullahghaffar5.mp4"
                poster="/assets/thumbnail.png"
                label="Client Video Testimonial"
              />
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
                  width={360}
                  height={640}
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
            <VideoCard
              src="/assets/abdullahghaffar5.mp4"
              poster="/assets/thumbnail.png"
              label="Client Video Testimonial"
            />
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
                  width={360}
                  height={640}
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
            <span className="text-white font-medium">Abdullah Ghaffar</span> went from{" "}
            <span className="text-[#1a6bff] font-medium">50k → 80k followers</span>{" "}
            on Instagram.
          </p>
        </FadeIn>

        {/* Text testimonials */}
        <div className="mx-5 md:mx-6">
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