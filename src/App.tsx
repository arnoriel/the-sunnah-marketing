import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoWeAreSection    from "./components/WhoWeAreSection";
import WhyUsSection       from "./components/WhyUsSection";
import ServicesSection    from "./components/ServicesSection";
import ProcessSection     from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection         from "./components/FAQSection";
import CTABanner          from "./components/CTABanner";
import Footer             from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="noise-bg">
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <WhoWeAreSection />
        <div className="section-divider" />
        <WhyUsSection />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <ProcessSection />
        <div className="section-divider" />
        <TestimonialsSection />
        <div className="section-divider" />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}