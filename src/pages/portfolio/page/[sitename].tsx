import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SITE_MAP: Record<string, { url: string; name: string }> = {
  ironclad: { url: "https://iron-clad-two.vercel.app/", name: "Iron Clad" },
  outdoorjob: { url: "https://outdoor-job.vercel.app/", name: "Outdoor Job" },
  verdura: { url: "https://verdura-gardening.vercel.app/", name: "Verdura Gardening" },
  propertydeveloper: { url: "https://property-developer-two.vercel.app/", name: "Property Developer" },
};

export default function PortfolioPage() {
  const { sitename } = useParams<{ sitename: string }>();
  const [loaded, setLoaded] = useState(false);

  const site = sitename ? SITE_MAP[sitename] : null;

  useEffect(() => {
    setLoaded(false);
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, [sitename]);

  if (!site) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#050507" }}>
        <p className="font-syne font-black text-white text-2xl mb-4">Portfolio not found</p>
        <a href="/#portfolios" className="font-dm text-[#00c6ff] underline text-sm">
          ← Back to Portfolios
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ background: "#050507", minHeight: "100vh" }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/5 sticky top-0 z-50"
        style={{ background: "rgba(5,5,7,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      >
        <a
          href="/#portfolios"
          className="flex items-center gap-2 font-dm text-white/60 hover:text-white transition-colors duration-200 text-sm group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Portfolios
        </a>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00c6ff] animate-pulse" />
          <span className="font-syne font-bold text-white text-sm md:text-base">{site.name}</span>
        </div>

        {/* <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-dm text-[#1a6bff] hover:text-[#00c6ff] transition-colors duration-200 text-xs md:text-sm"
        >
          Open site
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a> */}
      </div>

      {/* Iframe area */}
      <div className="flex-1 relative" style={{ minHeight: "calc(100vh - 53px)" }}>
        {!loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4" style={{ background: "#050507" }}>
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-[#1a6bff]/20 border-t-[#1a6bff]" style={{ animation: "spin 0.9s linear infinite" }} />
            </div>
            <p className="font-dm text-white/40 text-sm">Loading {site.name}…</p>
          </div>
        )}

        <motion.div
          className="w-full h-full"
          style={{ minHeight: "calc(100vh - 53px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <iframe
            src={site.url}
            title={site.name}
            className="w-full border-0"
            style={{ minHeight: "calc(100vh - 53px)", height: "100%" }}
            onLoad={() => setLoaded(true)}
            allow="fullscreen"
          />
        </motion.div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
