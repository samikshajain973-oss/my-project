import HeroSection from "./HeroSection";
import ServicesSection from "./services";
import Slideshow from "./slideshow";
import About from "./aboutus";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <Slideshow />
      <About />
    </>
  );
}