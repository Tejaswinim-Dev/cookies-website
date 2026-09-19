"use client";

import React from "react";
import { Sparkles, Leaf, Flame, Home, PackageCheck } from "lucide-react";

export default function TrustStrip() {
  const points = [
    { icon: Flame, label: "Freshly Baked", sub: "Small morning batches" },
    { icon: Leaf, label: "Clean Ingredients", sub: "No palm oil or chemicals" },
    { icon: Sparkles, label: "Zero Maida", sub: "Wholesome oats & millets" },
    { icon: Home, label: "Home Made", sub: "Kitchen in Hyderabad" },
    { icon: PackageCheck, label: "Thoughtfully Packed", sub: "Eco-friendly materials" },
  ];

  return (
    <section className="border-y border-charcoal/10 bg-cream-50/70 py-6 sm:py-8 my-4">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 items-center justify-between">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 group transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-full bg-beige/60 group-hover:bg-sage/20 border border-charcoal/5 flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-4 h-4 text-olive group-hover:text-sage transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-charcoal tracking-wide">
                    {pt.label}
                  </h4>
                  <p className="text-[11px] text-charcoal-muted font-normal">
                    {pt.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
