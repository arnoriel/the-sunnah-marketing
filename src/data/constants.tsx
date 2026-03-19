import {
  Users, Video, Layers, Clock, BarChart3, ShieldCheck,
} from "lucide-react";

export interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export const SERVICES: Service[] = [
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

export const TESTIMONIALS: Testimonial[] = [
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

export const FAQS: FAQ[] = [
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

export const PROCESS = [
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

export const WHO_WE_ARE_STATS = [
  { number: "17+", label: "Muslim Clients Served", icon: <Users className="w-5 h-5" /> },
  { number: "3+", label: "Years of Experience", icon: <Clock className="w-5 h-5" /> },
  { number: "90", label: "Days to Full Momentum", icon: <BarChart3 className="w-5 h-5" /> },
  { number: "100%", label: "Halal Compliant Work", icon: <ShieldCheck className="w-5 h-5" /> },
];

export const WHY_US_POINTS = [
  "No inappropriate imagery or awrah exposure",
  "No gambling / alcohol / haram niches",
  "Ethical targeting that respects Islamic values",
  "Proven frameworks that convert views into paying clients",
];

export const CALENDLY_URL = "https://calendly.com/djalifsr/thesunnahmarketing";
export const YT_VIDEO_ID = "FOup6vHkTyY";
export const YT_THUMBNAIL = `https://i.ytimg.com/vi/${YT_VIDEO_ID}/hqdefault.jpg`;