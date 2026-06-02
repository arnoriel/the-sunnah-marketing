import {
  Smartphone,
  MessageCircleWarning,
  Globe,
  SearchX,
} from "lucide-react";
import FadeIn from "./FadeIn";

const problems = [
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Posting Consistently, Yet Getting Little Attention",
    description:
      "Many businesses spend hours creating content every week, but still struggle to reach the right audience. Likes stay low, engagement is inconsistent, and growth feels painfully slow.",
    solution:
      "We create content strategies built around audience psychology, positioning, and platform behavior so your content gets seen by people who actually matter.",
  },
  {
    icon: <MessageCircleWarning className="w-5 h-5" />,
    title: "Views Are Coming, But Leads Aren't",
    description:
      "A decent number of views doesn't always translate into inquiries or sales. Many brands attract attention but fail to guide people toward taking action.",
    solution:
      "We build content funnels and clear calls-to-action that turn attention into conversations, inquiries, and ultimately customers.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "A Website That Looks Nice But Doesn't Convert",
    description:
      "Having a website is no longer enough. If visitors don't understand your offer within seconds, they leave without taking any action.",
    solution:
      "We design websites with conversion in mind — clear messaging, trust-building elements, and user journeys that encourage visitors to become leads.",
  },
  {
    icon: <SearchX className="w-5 h-5" />,
    title: "Invisible on Google When Customers Need You",
    description:
      "Potential customers are actively searching for solutions every day, but many businesses never appear in search results and miss valuable opportunities.",
    solution:
      "Through SEO-focused structures and strategic content, we help your business become discoverable when people are already looking for what you offer.",
  },
];

export default function ProblemsSolutionsSection() {
  return (
    <section className="py-16 md:py-32 bg-[#050507] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1a6bff] blur-[180px] opacity-[0.05]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <FadeIn>
            <span className="font-dm text-xs md:text-sm text-[#00c6ff] tracking-widest uppercase">
              Problems & Solutions
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-syne font-black text-3xl md:text-5xl text-white mt-3 md:mt-4 leading-tight">
              Marketing Isn't Broken.
              <span className="gradient-text"> The Strategy Often Is.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-dm text-base md:text-lg text-white/50 max-w-3xl mx-auto mt-5">
              Most businesses don't struggle because they lack effort.
              They struggle because they're focusing on activities that
              don't move the needle. Here's where we usually see things
              go wrong — and how we help fix them.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="mobile-card border border-white/5 hover:border-[#1a6bff]/20 transition-all duration-300 p-6 md:p-7 h-full">
                <div className="w-11 h-11 bg-[#1a6bff]/10 border border-[#1a6bff]/20 flex items-center justify-center text-[#00c6ff] mb-5">
                  {item.icon}
                </div>

                <h3 className="font-syne text-xl text-white font-bold mb-3">
                  {item.title}
                </h3>

                <p className="font-dm text-white/50 leading-relaxed mb-5">
                  {item.description}
                </p>

                <div className="border-t border-white/10 pt-5">
                  <span className="font-syne text-[#00c6ff] text-sm uppercase tracking-wider">
                    Our Solution
                  </span>

                  <p className="font-dm text-white/75 leading-relaxed mt-2">
                    {item.solution}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}