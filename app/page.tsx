
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { SocialProof } from "@/components/site/social-proof";
import { Benefits } from "@/components/site/benefits";
import { StepsSection } from "@/components/site/steps-section";
import { Plans } from "@/components/site/plans";
import { Faq } from "@/components/site/faq";
import { CtaFinal } from "@/components/site/cta-final";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Hero />
      <SocialProof />
      <Benefits />
      <StepsSection />
      <Plans />
      <Faq />
      <Footer />
    </main>
  );
}
