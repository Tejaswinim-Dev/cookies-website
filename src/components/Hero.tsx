"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Check, Heart, Sparkles, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

interface HeroSlide {
  id: number;
  eyebrow: string;
  titlePart1: string;
  titleItalic: string;
  description: string;
  image: string;
  productName: string;
  badgeTag: string;
  price: string;
  rating: string;
  targetCategory: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    eyebrow: "WHOLESOME • HOMEMADE • HAPPIER YOU",
    titlePart1: "Goodness,",
    titleItalic: "Baked Naturally.",
    description: "Wholesome cookies, healthy snacks and sweet treats made with real unrefined ingredients, right from our home kitchen in Hyderabad. Freshly baked each morning.",
    image: "/images/products/choco-oats.jpg",
    productName: "Signature Chocolate Oats Cookie",
    badgeTag: "Bestseller Morning Bake",
    price: "₹380",
    rating: "4.9 ★ (500+ Homes)",
    targetCategory: "Cookies",
  },
  {
    id: 1,
    eyebrow: "CRISP • NUTTY • 100% ZERO MAIDA",
    titlePart1: "Golden Crisp,",
    titleItalic: "Heartily Made.",
    description: "Slow-baked golden bakes loaded with sliced California almonds, tart ruby cranberries, and organic palm jaggery. Rich in dietary fibre, zero refined white sugar.",
    image: "/images/products/almond-cranberry.jpg",
    productName: "Almond Cranberry Artisan Cookie",
    badgeTag: "Artisan Nutty Crunch",
    price: "₹420",
    rating: "5.0 ★ (Artisan Choice)",
    targetCategory: "Cookies",
  },
  {
    id: 2,
    eyebrow: "ORGANIC MILLET • GUILT-FREE SWEETNESS",
    titlePart1: "Pure Millets,",
    titleItalic: "Sweet Memories.",
    description: "Ancient Telangana foxtail millet, golden farm jaggery and fragrant green cardamom. Nostalgic heritage recipes reinvented for conscious everyday snacking.",
    image: "/images/products/jaggery-millet.jpg",
    productName: "Jaggery Millet Heritage Cookie",
    badgeTag: "Telangana Heritage Grain",
    price: "₹360",
    rating: "4.8 ★ (Nutrient Dense)",
    targetCategory: "Cookies",
  },
  {
    id: 3,
    eyebrow: "SUPERFOOD ENERGY • NO REFINED SUGAR",
    titlePart1: "Roasted Seeds,",
    titleItalic: "Pure Vitality.",
    description: "Packed with pumpkin, chia, sunflower, and flax seeds bound together with natural jaggery. A nutrient-dense, high-protein powerhouse snack.",
    image: "/images/products/roasted-seeds.jpg",
    productName: "Super Seeds Energy Crisp",
    badgeTag: "Superfood Snack",
    price: "₹340",
    rating: "4.9 ★ (Energy Hit)",
    targetCategory: "Healthy Snacks",
  },
];

const heroProductMap: Record<number, string> = {
  0: "choco-oats-cookie",
  1: "almond-cranberry-cookie",
  2: "jaggery-millet-cookie",
  3: "roasted-seed-mix",
};

export default function Hero() {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 2.5 seconds (in the requested 2-3 sec range)
  // Continuous, reliable rotation without hover freeze
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-4 pb-14 md:pt-8 md:pb-24 lg:pt-10 lg:pb-24"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Subtle Live Bake Announcement Bar */}
        <div className="mb-6 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-beige/50 border border-charcoal/10 text-[11px] sm:text-xs text-charcoal font-medium shadow-soft">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span className="font-semibold text-olive">Morning Bake Fresh:</span>
            <span>Baking fresh today in Hyderabad • Orders dispatch at 11 AM & 4 PM</span>
          </div>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Editorial Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-charcoal/5 mb-5 shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest uppercase text-charcoal/85">
                {slide.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.1] font-medium text-charcoal tracking-tight mb-5 min-h-[140px] sm:min-h-[160px] flex flex-col justify-center">
              <span className="transition-opacity duration-300">{slide.titlePart1}</span>
              <span className="italic font-serif font-normal text-olive transition-opacity duration-300">
                {slide.titleItalic}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-charcoal-light/85 max-w-xl leading-relaxed mb-8 font-sans min-h-[72px] transition-opacity duration-300">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection("shop")}
                className="group flex-1 sm:flex-initial px-8 py-3.5 bg-sage hover:bg-olive text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-soft hover:shadow-lift flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <span>Shop Fresh</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection("story")}
                className="flex-1 sm:flex-initial px-6 py-3.5 bg-beige/50 hover:bg-beige text-charcoal text-xs sm:text-sm font-medium rounded-full transition-all duration-300 border border-charcoal/10 hover:border-charcoal/20 text-center cursor-pointer"
              >
                Our Kitchen Story
              </button>
            </div>

            {/* Carousel Navigation Indicators with live progress bar */}
            <div className="flex items-center gap-3 mb-6">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-500 overflow-hidden cursor-pointer relative ${
                    currentSlide === idx
                      ? "w-10 bg-beige-dark/50"
                      : "w-2.5 bg-beige-dark/40 hover:bg-charcoal-muted"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {currentSlide === idx && (
                    <div
                      key={`progress-${currentSlide}`}
                      className="h-full bg-olive rounded-full animate-hero-progress"
                    />
                  )}
                </button>
              ))}
              <span className="text-xs text-olive font-semibold ml-2 font-mono">
                0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-charcoal/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-charcoal/80">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-4 h-4 rounded-full bg-sage/20 text-sage flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span>Zero Maida</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-4 h-4 rounded-full bg-sage/20 text-sage flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span>Country Jaggery</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-4 h-4 rounded-full bg-sage/20 text-sage flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span>Hyderabad Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image & Sliding Carousel Showcase */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Organic Glows */}
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-beige/60 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-sage/10 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Carousel Box with Horizontal Sliding Track */}
            <div className="relative w-full max-w-[520px] aspect-[4/3] sm:aspect-[1/1] rounded-3xl overflow-hidden shadow-elevated border border-beige-dark/40 bg-beige/30">
              <div
                className="flex h-full w-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {HERO_SLIDES.map((s) => (
                  <div key={s.id} className="relative w-full h-full shrink-0">
                    <Image
                      src={s.image}
                      alt={s.productName}
                      fill
                      priority={s.id === 0}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 520px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-60" />

                    {/* Top Left Artisan Badge / In-Basket Indicator */}
                    {(() => {
                      const productId = heroProductMap[s.id];
                      const cartItem = cart.find((item) => item.product.id === productId);
                      const qtyInCart = cartItem ? cartItem.quantity : 0;
                      return qtyInCart > 0 ? (
                        <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-olive text-cream-50 text-[11px] font-bold flex items-center gap-1.5 shadow-md animate-in zoom-in-95 duration-200">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>{qtyInCart} in Basket</span>
                        </div>
                      ) : (
                        <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-cream-100/95 backdrop-blur-md text-[11px] font-semibold text-charcoal flex items-center gap-1.5 shadow-soft border border-white/60">
                          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                          <span>{s.badgeTag}</span>
                        </div>
                      );
                    })()}

                    {/* Top Right Price Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-sage/95 backdrop-blur-md text-white text-xs font-bold shadow-soft">
                      {s.price}
                    </div>

                    {/* Bottom Showcase Card */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 sm:p-4 rounded-2xl bg-cream-50/95 backdrop-blur-md border border-charcoal/10 shadow-lift flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta block">
                          Featured Goodie
                        </span>
                        <h4 className="font-serif text-xs sm:text-base font-semibold text-charcoal truncate">
                          {s.productName}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-charcoal-muted">
                          {s.rating}
                        </p>
                      </div>

                      {(() => {
                        const productId = heroProductMap[s.id];
                        const cartItem = cart.find((item) => item.product.id === productId);
                        const qtyInCart = cartItem ? cartItem.quantity : 0;
                        const matchedProduct = PRODUCTS.find((p) => p.id === productId);

                        return qtyInCart === 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (matchedProduct) {
                                addToCart(matchedProduct, 1);
                              } else {
                                scrollToSection("shop");
                              }
                            }}
                            className="px-4 py-2 bg-sage hover:bg-olive text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-colors shrink-0 cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-soft"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 p-1 bg-olive text-cream-50 rounded-full shadow-md animate-in zoom-in-90 duration-200 shrink-0 border border-olive-dark/20"
                          >
                            <button
                              onClick={() => {
                                if (qtyInCart <= 1) {
                                  removeFromCart(productId);
                                } else {
                                  updateQuantity(productId, qtyInCart - 1);
                                }
                              }}
                              aria-label="Decrease quantity"
                              className="w-6 h-6 rounded-full bg-cream-100/20 hover:bg-cream-100 hover:text-charcoal flex items-center justify-center transition-all text-cream-50 active:scale-90 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-sans font-bold text-xs px-1 min-w-[16px] text-center text-cream-50 select-none">
                              {qtyInCart}
                            </span>
                            <button
                              onClick={() => {
                                if (matchedProduct) {
                                  addToCart(matchedProduct, 1);
                                }
                              }}
                              aria-label="Increase quantity"
                              className="w-6 h-6 rounded-full bg-cream-100/20 hover:bg-cream-100 hover:text-charcoal flex items-center justify-center transition-all text-cream-50 active:scale-90 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Manual Navigation Controls */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-cream-100/90 hover:bg-cream-100 text-charcoal flex items-center justify-center transition-all shadow-soft cursor-pointer z-10 hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-cream-100/90 hover:bg-cream-100 text-charcoal flex items-center justify-center transition-all shadow-soft cursor-pointer z-10 hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Floating Handwritten Stamp (Desktop) */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-cream-100 px-4 py-3 rounded-2xl shadow-elevated border border-charcoal/10 transform rotate-3 pointer-events-none z-10">
              <div className="flex items-center gap-1.5 text-xs text-charcoal">
                <Heart className="w-4 h-4 text-terracotta fill-terracotta animate-pulse shrink-0" />
                <span className="font-handwriting text-lg text-olive font-bold">
                  Small Bites. Better Days. ♡
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
