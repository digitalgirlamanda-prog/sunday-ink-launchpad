import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/site/Preloader";
import { Nav, ScrollProgress } from "@/components/site/Chrome";
import { Hero } from "@/components/site/Hero";
import { Manifesto } from "@/components/site/Manifesto";
import { Shift } from "@/components/site/Shift";
import { Work } from "@/components/site/Work";
import { Services } from "@/components/site/Services";
import { Specialty } from "@/components/site/Specialty";
import { RevenueMath } from "@/components/site/RevenueMath";
import { Industries } from "@/components/site/Industries";
import { Craft } from "@/components/site/Craft";
import { Pricing } from "@/components/site/Pricing";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import duskImg from "@/assets/specialty-dusk.jpg";

const TITLE = "Sunday & Ink — Websites. Brands. Beautifully Built.";
const DESCRIPTION =
  "Sunday & Ink is a web design and branding studio creating custom, conversion-focused websites for small businesses, owner-led brands and vacation rentals.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      // Hero LCP: photography inside the ampersand letterform
      { rel: "preload", as: "image", href: duskImg },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Sunday & Ink",
          slogan: "Websites. Brands. Beautifully Built.",
          description: DESCRIPTION,
          serviceType: ["Web design", "Brand identity", "Digital growth"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Shift />
        <Work />
        <Services />
        <Specialty />
        <RevenueMath />
        <Industries />
        <Craft />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
