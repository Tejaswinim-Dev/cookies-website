"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { X, Heart, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
  } = useCart();
  const listRef = useRef<HTMLDivElement>(null);

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleForwardWheel = (e: React.WheelEvent) => {
    if (listRef.current) {
      listRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="flex-1" 
        onClick={() => setIsWishlistOpen(false)} 
        onWheel={handleForwardWheel}
      />

      <div
        data-lenis-prevent
        className="w-full max-w-md bg-cream-100 h-full shadow-2xl flex flex-col justify-between border-l border-charcoal/10 animate-in slide-in-from-right duration-300"
      >
        
        {/* Header */}
        <div 
          onWheel={handleForwardWheel}
          className="px-6 py-5 border-b border-charcoal/10 flex items-center justify-between bg-cream-50"
        >
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-terracotta fill-terracotta/20" />
            <div>
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Your Favourites
              </h2>
              <p className="text-[11px] text-charcoal-muted uppercase tracking-wider font-semibold">
                Saved Treats ({wishlistedProducts.length})
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close favourites"
            className="w-9 h-9 rounded-full bg-cream-100 hover:bg-beige/60 text-charcoal flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div 
          ref={listRef}
          data-lenis-prevent
          className="flex-1 overflow-y-auto modal-scroll px-6 py-4 divide-y divide-charcoal/5"
        >
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-beige/60 flex items-center justify-center mb-4 text-charcoal-muted">
                <Heart className="w-7 h-7 stroke-1 text-charcoal-muted" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                No favourites saved yet.
              </h3>
              <p className="text-xs text-charcoal-muted max-w-xs mb-6">
                Tap the heart icon on any wholesome cookie or muffin to keep track of your loved bakes.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2.5 bg-sage hover:bg-olive text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-4 items-center">
                <div
                  className="relative w-16 h-16 rounded-xl overflow-hidden bg-beige/40 shrink-0 cursor-pointer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setSelectedProduct(product);
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4
                      className="font-serif text-sm font-medium text-charcoal truncate cursor-pointer hover:text-olive"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setSelectedProduct(product);
                      }}
                    >
                      {product.name}
                    </h4>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-charcoal-muted hover:text-terracotta p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-charcoal-muted">{product.weight}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-charcoal font-sans">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3 py-1 bg-sage hover:bg-olive text-white text-[11px] font-semibold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-5 border-t border-charcoal/10 bg-cream-50 text-center">
            <p className="text-xs text-charcoal-muted font-handwriting text-base">
              Goodness baked fresh upon order in Hyderabad ♡
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
