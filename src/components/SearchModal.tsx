"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product } from "@/data/products";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct } = useCart();
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelect = (product: Product) => {
    setIsSearchOpen(false);
    setSelectedProduct(product);
  };

  const handleForwardWheel = (e: React.WheelEvent) => {
    if (resultsRef.current) {
      resultsRef.current.scrollTop += e.deltaY;
    }
  };

  const suggestions = ["Chocolate", "Millet", "Granola", "Oats", "Cranberry", "Eggless"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsSearchOpen(false)}
      onWheel={handleForwardWheel}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl bg-cream-100 rounded-3xl overflow-hidden shadow-elevated border border-charcoal/10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div 
          onWheel={handleForwardWheel}
          className="p-4 sm:p-6 border-b border-charcoal/10 flex items-center gap-3 bg-cream-50"
        >
          <Search className="w-5 h-5 text-olive shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search healthy treats, millets, dark chocolate..."
            className="w-full bg-transparent text-sm sm:text-base text-charcoal placeholder-charcoal-muted focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-charcoal-muted hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-terracotta ml-2"
          >
            Close
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div 
          onWheel={handleForwardWheel}
          className="px-6 py-3 bg-beige/30 border-b border-charcoal/5 flex items-center gap-2 overflow-x-auto text-xs"
        >
          <span className="text-charcoal-muted text-[11px] uppercase tracking-wider shrink-0">
            Popular:
          </span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="px-2.5 py-1 rounded-full bg-cream-100 text-charcoal hover:bg-sage hover:text-white transition-colors text-xs shrink-0"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div
          ref={resultsRef}
          data-lenis-prevent
          className="max-h-[60vh] overflow-y-auto modal-scroll p-4 sm:p-6"
        >
          {query.trim() === "" ? (
            <div className="text-center py-10 text-charcoal-muted">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-terracotta" />
              <p className="text-sm">Type any treat name or ingredient to search.</p>
              <p className="text-xs text-charcoal-muted/80 mt-1">
                E.g., &ldquo;Oats&rdquo;, &ldquo;No Refined Sugar&rdquo;, &ldquo;Muffins&rdquo;
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-charcoal-muted">
              <p className="font-serif text-lg text-charcoal">No goodies found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-charcoal-muted mt-1">
                Try searching for cookies, cupcakes, granola, or seeds.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-2">
                Found {results.length} delicious {results.length === 1 ? "treat" : "treats"}
              </p>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-cream-50 hover:bg-beige/40 border border-charcoal/5 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-beige/40 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-medium text-charcoal group-hover:text-olive transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-charcoal-muted truncate">
                        {product.category} • {product.weight}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {product.tags.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[9px] bg-beige/60 text-charcoal-light"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-bold text-charcoal font-sans">
                      ₹{product.price}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-cream-100 group-hover:bg-sage group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
