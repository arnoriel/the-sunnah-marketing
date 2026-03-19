import { useEffect, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, CALENDLY_URL } from "../data/constants";

// ── Reducer ────────────────────────────────────────────────────────────────
type NavState = { scrolled: boolean; mobileOpen: boolean };
type NavAction =
  | { type: "SET_SCROLLED"; value: boolean }
  | { type: "TOGGLE_MOBILE" }
  | { type: "CLOSE_MOBILE" };

function navReducer(state: NavState, action: NavAction): NavState {
  switch (action.type) {
    case "SET_SCROLLED":
      return { ...state, scrolled: action.value };
    case "TOGGLE_MOBILE":
      return { ...state, mobileOpen: !state.mobileOpen };
    case "CLOSE_MOBILE":
      return { ...state, mobileOpen: false };
    default:
      return state;
  }
}

export default function Navbar() {
  const [{ scrolled, mobileOpen }, dispatch] = useReducer(navReducer, {
    scrolled: false,
    mobileOpen: false,
  });

  useEffect(() => {
    const fn = () =>
      dispatch({ type: "SET_SCROLLED", value: window.scrollY > 50 });
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050507]/95 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-4 md:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-lg flex-shrink-0">
                <img
                  src="/icon.jpg"
                  alt="TSM Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-[#1a6bff] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div className="block">
              <p className="font-syne font-bold text-white text-xs md:text-sm leading-none">
                The Sunnah Marketing
              </p>
              <p className="font-dm text-[9px] md:text-[10px] text-white/40 tracking-widest uppercase mt-0.5">
                Halal Marketing Agency
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-dm text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#1a6bff] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn font-syne font-bold text-sm text-white px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(26,107,255,0.5)]"
            >
              Free Consultation
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn font-syne font-bold text-xs text-white px-4 py-2 rounded-lg"
            >
              Book Call
            </a>
            <button
              onClick={() => dispatch({ type: "TOGGLE_MOBILE" })}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#050507] flex flex-col pt-20 px-6"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => dispatch({ type: "CLOSE_MOBILE" })}
                  className="font-syne font-bold text-2xl text-white/80 hover:text-white border-b border-white/5 pb-4"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}