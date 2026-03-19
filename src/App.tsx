import { lazy, Suspense } from "react";

// ── Above-the-fold: loaded eagerly ─────────────────────────────────────────
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollToTop from "./components/ScrollToTop";

// ── Below-the-fold: code-split via React.lazy ─────────────────────────────
// Each section becomes its own JS chunk — browser only fetches them after
// the critical above-fold content has painted, improving FCP & LCP.
const WhoWeAreSection    = lazy(() => import("./components/WhoWeAreSection"));
const WhyUsSection       = lazy(() => import("./components/WhyUsSection"));
const ServicesSection    = lazy(() => import("./components/ServicesSection"));
const ProcessSection     = lazy(() => import("./components/ProcessSection"));
const TestimonialsSection = lazy(() => import("./components/TestimonialsSection"));
const FAQSection         = lazy(() => import("./components/FAQSection"));
const CTABanner          = lazy(() => import("./components/CTABanner"));
const Footer             = lazy(() => import("./components/Footer"));

// Minimal fallback — invisible spacer keeps scroll stable
function SectionFallback() {
  return <div className="min-h-[200px]" aria-hidden="true" />;
}

export default function App() {
  return (
    <div className="noise-bg">
      {/* ── Critical shell: rendered immediately ── */}
      <Navbar />
      <main>
        <Hero />

        {/* ── Lazy sections wrapped in Suspense ── */}
        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <WhoWeAreSection />
        </Suspense>

        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <WhyUsSection />
        </Suspense>

        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>

        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <ProcessSection />
        </Suspense>

        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>

        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <FAQSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <CTABanner />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <ScrollToTop />
    </div>
  );
}