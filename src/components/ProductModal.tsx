"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Heart, Plus, Minus, Clock, Package, Sparkles, Star, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCartOpen,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const detailsScrollRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleForwardWheel = (e: React.WheelEvent) => {
    if (detailsScrollRef.current) {
      detailsScrollRef.current.scrollTop += e.deltaY;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - currentY;
    touchStartY.current = currentY;
    if (detailsScrollRef.current) {
      detailsScrollRef.current.scrollTop += deltaY;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-charcoal/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSelectedProduct(null)}
      onWheel={handleForwardWheel}
    >
      {/* Modal Card */}
      <div
        data-lenis-prevent
        className="relative w-full max-w-3xl sm:max-w-4xl bg-cream-100 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-charcoal/10 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-cream-50/90 hover:bg-cream-200 text-charcoal flex items-center justify-center transition-all shadow-soft"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Column: Image with Overlays - forwards scroll/touch anywhere to details */}
          <div
            onWheel={handleForwardWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="md:col-span-6 relative aspect-[16/10] md:aspect-auto md:h-full bg-beige/40 shrink-0 cursor-default"
          >
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-60 md:hidden" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <span className="px-3 py-1 rounded-full bg-cream-100/95 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-charcoal shadow-soft">
                {selectedProduct.category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-sage text-white text-[10px] font-medium shadow-soft">
                Fresh Batch
              </span>
            </div>

            {/* Bottom Weight Tag */}
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-charcoal/80 backdrop-blur-sm text-cream-50 text-xs font-medium">
              {selectedProduct.weight}
            </div>
          </div>

          {/* Right Column: Scrollable Details + Always Visible Sticky Action Footer */}
          <div className="md:col-span-6 flex flex-col justify-between h-full overflow-hidden bg-cream-100">
            
            {/* Scrollable details container */}
            <div
              ref={detailsScrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto modal-scroll p-5 sm:p-7 space-y-4"
            >
              {/* Header Info */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-charcoal">
                    {selectedProduct.rating}
                  </span>
                  <span className="text-xs text-charcoal-muted">
                    ({selectedProduct.reviewsCount} reviews)
                  </span>
                </div>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  aria-label="Save to favourites"
                  className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-terracotta transition-colors px-2.5 py-1 rounded-full bg-beige/40"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isWishlisted
                        ? "fill-terracotta text-terracotta"
                        : "text-charcoal-muted"
                    }`}
                  />
                  <span>{isWishlisted ? "Saved" : "Save"}</span>
                </button>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal leading-tight">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-baseline gap-2.5 mt-1">
                  <span className="text-2xl font-bold text-olive font-sans">
                    ₹{selectedProduct.price}
                  </span>
                  <span className="text-xs text-charcoal-muted">
                    • {selectedProduct.weight}
                  </span>
                </div>
              </div>

              {/* Tagline / Sensory Description */}
              <p className="text-xs sm:text-sm text-charcoal-light/90 leading-relaxed font-normal">
                {selectedProduct.description}
              </p>

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-beige/60 text-charcoal text-[11px] font-medium border border-charcoal/5"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>

              {/* Real Ingredients Breakdown */}
              <div className="p-3.5 rounded-2xl bg-beige/30 border border-charcoal/5">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-charcoal mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-olive" />
                  Real Ingredients
                </h4>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  {selectedProduct.ingredients.join(", ")}.
                </p>
                {selectedProduct.allergens && (
                  <p className="text-[11px] text-terracotta-dark mt-1.5 font-medium">
                    Allergen Notice: {selectedProduct.allergens}
                  </p>
                )}
              </div>

              {/* Freshness & Storage Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-cream-50 border border-charcoal/5">
                  <Clock className="w-3.5 h-3.5 text-sage mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-charcoal text-[11px] block">Freshness</span>
                    <span className="text-[10px] text-charcoal-muted leading-tight block">
                      {selectedProduct.freshness}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-cream-50 border border-charcoal/5">
                  <Package className="w-3.5 h-3.5 text-sage mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-charcoal text-[11px] block">Storage</span>
                    <span className="text-[10px] text-charcoal-muted leading-tight block">
                      {selectedProduct.storage}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ALWAYS VISIBLE PINNED ACTION FOOTER */}
            <div 
              onWheel={handleForwardWheel}
              className="p-4 sm:p-5 bg-cream-50 border-t border-charcoal/10 flex items-center justify-between gap-3 shadow-lift z-20 shrink-0"
            >
              {/* Stepper */}
              <div className="flex items-center rounded-full border border-charcoal/20 bg-cream-100 p-1 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-beige text-charcoal transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-charcoal font-sans">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-beige text-charcoal transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Prominent Add Button with Live Calculated Total */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-sage hover:bg-olive text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-soft hover:shadow active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Add to Basket</span>
                <span>•</span>
                <span className="font-sans font-bold">₹{selectedProduct.price * quantity}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
