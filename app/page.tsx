
import "./icon-tilt.css";
import "./cta-section.css";
import { Hero } from "@/components/site/hero";
import { Characteristics } from "@/components/site/characteristics";
import { Benefits } from "@/components/site/benefits-section";
import { Footer } from "@/components/site/footer";
import { SignUp } from "@/components/site/sign-up";
import { Faq } from "@/components/site/faq";
import { Plans } from "@/components/site/plans";
import { Porque } from "@/components/site/porque";
import { Navbar } from "@/components/site/navbar";

export default function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      <Characteristics />
      <Benefits />
      <Porque />
      <Plans />
      <Faq />
      <SignUp />
      <Footer />
    </>
  );
}
