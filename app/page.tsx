import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Results from "@/components/Results";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import AlsoShipped from "@/components/AlsoShipped";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="grain-overlay" />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Results />
        <Marquee />
        <Work />
        <Stack />
        <AlsoShipped />
        <Contact />
      </main>
    </SmoothScrollProvider>
  );
}
