import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/site/Preloader";
import { Nav, ScrollProgress } from "@/components/site/Chrome";
import { Hero } from "@/components/site/Hero";
import { Manifesto } from "@/components/site/Manifesto";
import { Transformation } from "@/components/site/Transformation";
import { Services } from "@/components/site/Services";
import { Industries } from "@/components/site/Industries";
import { Work } from "@/components/site/Work";
import { Craft } from "@/components/site/Craft";
import { Pricing } from "@/components/site/Pricing";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

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
        <Transformation />
        <Services />
        <Industries />
        <Work />
        <Craft />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
