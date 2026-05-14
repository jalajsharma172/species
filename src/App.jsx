import { useRef, useEffect } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import RawShowcase from "./components/RawShowcase";
import PackagingSection from "./components/PackagingSection";
import FinalReveal from "./components/FinalReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactSection from "./components/ContactSection";

export default function App() {
  const particleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <Layout particleRef={particleRef}>
      <main className="relative">
        <Hero particleRef={particleRef} />
        <RawShowcase particleRef={particleRef} />
        <PackagingSection particleRef={particleRef} />
        <FinalReveal particleRef={particleRef} />
        <ContactSection particleRef={particleRef} />
      </main>
    </Layout>
  );
}
