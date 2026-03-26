import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FaqSection } from "@/components/faq-section"
import { VideoSection } from "@/components/video-section"
import { ProgramSection } from "@/components/program-section"
import { WhoSection } from "@/components/who-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FacultySection } from "@/components/faculty-section"
import { CertMarquee } from "@/components/cert-marquee"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <VideoSection />
      <ProgramSection />
      <WhoSection />
      <TestimonialsSection />
      <FacultySection />
      <CertMarquee />
      <CtaSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
