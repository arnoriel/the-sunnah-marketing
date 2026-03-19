import { useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { FAQS } from "../data/constants";

// ── Reducer ────────────────────────────────────────────────────────────────
type FAQState = { openIndex: number | null };
type FAQAction = { type: "TOGGLE"; index: number };

function faqReducer(state: FAQState, action: FAQAction): FAQState {
  return {
    openIndex: state.openIndex === action.index ? null : action.index,
  };
}

export default function FAQSection() {
  const [{ openIndex }, dispatch] = useReducer(faqReducer, { openIndex: 0 });

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
                  onClick={() => dispatch({ type: "TOGGLE", index: i })}
                  className="w-full flex items-center justify-between p-5 md:p-7 text-left hover:bg-[#050507]/50 md:hover:bg-[#050507] transition-colors group"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-syne font-bold text-base md:text-lg text-white/80 group-hover:text-white pr-3">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronRight
                      className={`w-5 h-5 transition-colors ${
                        openIndex === i ? "text-[#1a6bff]" : "text-white/30"
                      }`}
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
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