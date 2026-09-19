"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, Sparkles } from "lucide-react";

interface ProductShopProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const CATEGORY_TABS = [
  { label: "All Treats (8)", value: "All" },
  { label: "Cookies", value: "Cookies" },
  { label: "Cupcakes & Muffins", value: "Cupcakes" },
  { label: "Granola & Bars", value: "Granola & Bars" },
  { label: "Healthy Snacks", value: "Healthy Snacks" },
];

const DIETARY_FILTERS = [
  "All",
  "No Maida",
  "No Refined Sugar",
  "Eggless",
  "Millet Based",
  "High Fibre",
];

export default function ProductShop({
  selectedCategory,
  setSelectedCategory,
}: ProductShopProps) {
  const [dietFilter, setDietFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      // Diet tag match
      const matchesDiet =
        dietFilter === "All" ||
        product.tags.some(
          (tag) => tag.toLowerCase() === dietFilter.toLowerCase()
        );

      return matchesCategory && matchesDiet;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, dietFilter, sortBy]);

  return (
    <section id="shop" className="py-16 md:py-24 bg-cream-50/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-terracotta block mb-2">
            DAILY HOME OVEN MENU
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal tracking-tight">
            Small Batches, Real Goodness
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal-muted">
            Wholesome cookies, snacks and treats hand-baked in Hyderabad. Zero refined white flour (maida), zero chemical additives.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-sage text-white shadow-soft"
                    : "bg-beige/60 hover:bg-beige text-charcoal hover:text-olive"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sub Filters: Diet & Sort By Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 rounded-2xl bg-beige/30 border border-charcoal/5 mb-10 text-xs text-charcoal">
          {/* Dietary Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-charcoal-muted font-medium shrink-0 flex items-center gap-1 text-[11px] uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Diet:
            </span>
            {DIETARY_FILTERS.map((d) => (
              <button
                key={d}
                onClick={() => setDietFilter(d)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  dietFilter === d
                    ? "bg-olive text-white font-medium"
                    : "bg-cream-100/90 text-charcoal-light hover:bg-cream-100"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
            <span className="text-charcoal-muted text-[11px] uppercase tracking-wider shrink-0">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-cream-100/90 border border-charcoal/10 rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-sage cursor-pointer"
            >
              <option value="featured">Featured Fresh</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-cream-50 rounded-2xl border border-charcoal/5">
            <p className="font-serif text-xl text-charcoal mb-2">
              No baked goodies found in this filter.
            </p>
            <p className="text-sm text-charcoal-muted mb-6">
              Try selecting a different category or dietary preference.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setDietFilter("All");
              }}
              className="px-6 py-2.5 bg-sage text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-olive transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
