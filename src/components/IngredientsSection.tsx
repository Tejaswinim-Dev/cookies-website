"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { INGREDIENTS_SHOWCASE } from "@/data/products";
import { Sparkles, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function IngredientsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = INGREDIENTS_SHOWCASE.length;

  // Auto-advance every 2.8 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Visible items slice for desktop 3-card sliding window
  const visibleIndices = [
    currentIndex % total,
    (currentIndex + 1) % total,
    (currentIndex + 2) % total,
  ];

  return (
    <section
      id="ingredients"
      className="py-20 md:py-28 bg-cream-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige/60 border border-charcoal/5 mb-3 text-[11px] font-semibold tracking-widest uppercase text-terracotta">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PANTRY PHILOSOPHY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal tracking-tight">
              Real Ingredients. <br />
              <span className="italic font-serif text-olive">Nothing Complicated.</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-xs hidden sm:block">
              Auto-cycling through our clean pantry every 3 seconds. Hover to inspect.
            </p>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous ingredient"
                className="w-10 h-10 rounded-full bg-cream-100 hover:bg-beige text-charcoal flex items-center justify-center transition-colors shadow-soft border border-charcoal/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next ingredient"
                className="w-10 h-10 rounded-full bg-cream-100 hover:bg-beige text-charcoal flex items-center justify-center transition-colors shadow-soft border border-charcoal/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Carousel Viewport */}
        <div className="relative">
          {/* Desktop 3-Card Carousel Track */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 transition-all duration-500">
            {visibleIndices.map((idx, pos) => {
              const item = INGREDIENTS_SHOWCASE[idx];
              const isHighlight = pos === 0;
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className={`bg-cream-100 rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-between ${
                    isHighlight
                      ? "border-olive shadow-lift ring-1 ring-olive/20"
                      : "border-charcoal/5 shadow-soft hover:shadow-lift opacity-90"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-beige/30">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cream-100/95 backdrop-blur-md text-[11px] font-semibold text-olive shadow-soft">
                      {item.tag}
                    </div>
                    {item.origin && (
                      <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-charcoal/80 text-cream-50 text-[10px] font-medium backdrop-blur-sm">
                        {item.origin}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted block mb-1">
                        {item.subtitle}
                      </span>
                      <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-light/85 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-charcoal/5 flex items-center gap-1.5 text-[11px] text-sage-dark font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                      <span>100% Honest & Unrefined</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Single Card View */}
          <div className="md:hidden">
            {(() => {
              const item = INGREDIENTS_SHOWCASE[currentIndex];
              return (
                <div className="bg-cream-100 rounded-3xl overflow-hidden border border-olive shadow-lift flex flex-col animate-in fade-in duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden bg-beige/30">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cream-100/95 backdrop-blur-md text-[11px] font-semibold text-olive shadow-soft">
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-charcoal-light/85 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-sage-dark font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                      <span>100% Honest & Unrefined</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Carousel Progress Indicators (Scrolls every 2.8s) */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {INGREDIENTS_SHOWCASE.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentIndex === i
                  ? "w-8 bg-olive"
                  : "w-2 bg-beige-dark hover:bg-charcoal-muted"
              }`}
              aria-label={`Ingredient slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Bottom Clean Baking Guarantee Strip */}
        <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-beige/40 border border-charcoal/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage/20 text-olive flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-olive" />
            </div>
            <div>
              <h4 className="font-serif text-base text-charcoal font-medium">
                Our Clean Baking Guarantee
              </h4>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Zero palm oil • Zero high-fructose corn syrup • Zero chemical emulsifiers • Zero white flour
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-sage text-white text-xs font-semibold uppercase tracking-wider shrink-0 shadow-soft">
            Hyderabad Certified Honest
          </span>
        </div>

      </div>
    </section>
  );
}
