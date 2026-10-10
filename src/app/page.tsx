import { EventsSection } from "@/components/EventsSection";
import { Hero } from "@/components/Hero";
import { Roadmap } from "@/components/Roadmap";
import { Clients, Connect, Contact, Services, Team, TrustedBy } from "@/components/Sections";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustedBy />
        <EventsSection />
        <Roadmap />
        <Services />
        <Clients />
        <Team />
        <Connect />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
