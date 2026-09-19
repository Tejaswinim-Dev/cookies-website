"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    // Initialize ultra-smooth kinetic scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.8,
      infinite: false,
    });

    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Global anchor link smooth scroll handler
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const elem = document.querySelector<HTMLElement>(href);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem, { offset: -80, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      document.removeEventListener("click", handleAnchorClick);
      if (typeof window !== "undefined") {
        delete (window as any).lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
