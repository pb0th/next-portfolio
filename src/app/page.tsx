import { AboutSection } from "./components/Home/AboutSection";
import HeroSection from "./components/Home/HeroSection";
import ZoomOutSection from "./components/Home/ZoomOutSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <AboutSection />
      {/* <ZoomOutSection /> */}
    </div>
  );
}
