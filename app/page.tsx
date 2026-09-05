import { ScrollProgressBar } from "@/components/layout/scroll-progress-bar";
import { MusicToggle } from "@/components/layout/music-toggle";
import { HeroSection } from "@/components/sections/hero-section";
import { CountdownSection } from "@/components/sections/countdown-section";
import { StorySection } from "@/components/sections/story-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { PhotoWallSection } from "@/components/sections/photo-wall-section";
import { EventDetailsSection } from "@/components/sections/event-details-section";
import { RsvpSection } from "@/components/sections/rsvp-section";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <main>
        <HeroSection />
        <CountdownSection />
        <StorySection />
        <GallerySection />
        <PhotoWallSection />
        <EventDetailsSection />
        <RsvpSection />
      </main>
      <SiteFooter />
      <MusicToggle />
    </>
  );
}
