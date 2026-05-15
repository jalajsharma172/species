import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero({ particleRef }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          try {
            videoRef.current.muted = true;
            const p = videoRef.current.play();
            if (p && p.catch)
              p.catch((e) => console.warn("video play prevented", e));
          } catch (e) {
            console.warn("video play attempt failed", e);
          }
        } else {
          try {
            videoRef.current.pause();
          } catch (e) {
            console.warn("video pause attempt failed", e);
          }
        }
      },
      { threshold: 0 },
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [particleRef]);

  return (
    <section
      id="hero"
      className="section-sticky min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background video (place intro.mp4 in /public) */}
      <video
        ref={videoRef}
        className="hero-video"
        src="/intro.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div className="hero-overlay" aria-hidden />

      <div className="container hero-content text-center">
        <div className="text-sm uppercase tracking-widest text-beige/60 mb-6">
          Premium Indian Spice Atelier
        </div>

        <motion.h1
          className="h1-cinematic"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">Every Spice</span>
          <span className="block hero-accent">Has A Journey</span>
        </motion.h1>

        <motion.p
          className="p-sub max-w-xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          From raw harvest to crafted purity.
        </motion.p>

        <motion.div
          className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3 hero-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a href="#raw" className="btn-glow btn-primary text-sm md:text-base">
            Explore Journey
          </a>
          <a
            href="#final"
            className="btn-glow btn-secondary text-sm md:text-base"
          >
            View Products
          </a>
          <a
            href="#contact"
            className="btn-glow btn-secondary text-sm md:text-base"
          >
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 w-full flex justify-center z-30 pointer-events-none">
        <div className="text-center text-sm text-beige/60 uppercase tracking-widest">
          Scroll<div className="mt-1 text-lg">↓</div>
        </div>
      </div>
    </section>
  );
}
