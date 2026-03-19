import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollToTop() {
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
          aria-label="Scroll to top"
          className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 shimmer-btn flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(26,107,255,0.5)] transition-all duration-300 rounded-xl"
        >
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}