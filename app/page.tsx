import HomeHero from "./HomeHero";
import MarqueeTicker from "./MarqueeTicker";
import AboutTeaser from "./AboutTeaser";
import FeaturedWork from "./FeaturedWork";
import ContentShowcase from "./ContentShowcase";
import StatsBar from "./StatsBar";
import TestimonialSpotlight from "./TestimonialSpotlight";
import EventsPreview from "./EventsPreview";
import HomeCTA from "./HomeCTA";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <MarqueeTicker />
      <AboutTeaser />
      <FeaturedWork />
      <ContentShowcase />
      <StatsBar />
      <TestimonialSpotlight />
      <EventsPreview />
      <HomeCTA />
    </>
  );
}
