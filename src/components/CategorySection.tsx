"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";

interface CategorySectionProps {
  onSelectCategory?: (category: string) => void;
}

export default function CategorySection({ onSelectCategory }: CategorySectionProps) {
  const handleClick = (categorySlug: string) => {
    if (onSelectCategory) {
      onSelectCategory(categorySlug);
    }
    const shopEl = document.getElementById("shop");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-14">
          <div>
            <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-terracotta block mb-2">
              FRESH FROM THE OVEN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal tracking-tight">
              Explore Our Goodies
            </h2>
          </div>
          <p className="mt-3 sm:mt-0 text-sm sm:text-base text-charcoal-muted max-w-sm">
            Something wholesome for every craving. Handcrafted daily in Hyderabad.
          </p>
        </div>

        {/* 4 Minimal Category Tiles Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.slug)}
              className="group cursor-pointer flex flex-col bg-cream-50 rounded-2xl overflow-hidden border border-charcoal/5 shadow-soft hover:shadow-lift transition-all duration-500 hover:-translate-y-1"
            >
              {/* Category Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-beige/40">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                
                {/* Subtle top right count badge */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-cream-100/90 backdrop-blur-sm text-charcoal text-[11px] font-semibold flex items-center justify-center shadow-sm">
                  0{idx + 1}
                </div>

                {/* Arrow Icon floating */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-cream-100 text-charcoal flex items-center justify-center transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 text-sage" />
                </div>
              </div>

              {/* Category Info */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-lg font-medium text-charcoal group-hover:text-sage transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[12px] text-charcoal-muted line-clamp-2 mt-1 font-normal">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-charcoal/5 flex items-center justify-between text-[11px] text-charcoal/70">
                  <span>{cat.count} treats</span>
                  <span className="font-medium text-olive group-hover:underline">Explore</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
