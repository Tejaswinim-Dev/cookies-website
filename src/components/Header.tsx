"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItemsCount, setIsCartOpen, setIsSearchOpen, wishlist, setIsWishlistOpen, cartBump } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ["home", "shop", "story", "ingredients", "hyderabad", "contact"];
      const scrollPosition = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-header border-b border-charcoal/5 shadow-soft py-3"
            : "bg-cream-100/90 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-charcoal group-hover:text-olive transition-colors flex items-center gap-1.5">
                HealthyMakes
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-terracotta"></span>
              </span>
              <span className="text-[10px] font-sans tracking-widest uppercase text-charcoal-muted font-medium">
                Hyderabad • Home Bakery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "home", label: "Home" },
              { id: "shop", label: "Shop" },
              { id: "story", label: "Our Story" },
              { id: "ingredients", label: "Ingredients" },
              { id: "hyderabad", label: "Delivery" },
              { id: "contact", label: "Contact" },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative text-sm font-medium transition-colors py-1 ${
                    isActive
                      ? "text-sage font-semibold"
                      : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-sage rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search baked goods"
              className="p-2 text-charcoal/70 hover:text-charcoal hover:bg-beige/40 rounded-full transition-all"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View saved favourites"
              className="relative p-2 text-charcoal/70 hover:text-charcoal hover:bg-beige/40 rounded-full transition-all"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping bag"
              className={`relative p-2 text-charcoal/80 hover:text-charcoal hover:bg-beige/40 rounded-full transition-all ${
                cartBump ? "animate-cart-bump" : ""
              }`}
            >
              <ShoppingBag className="w-5 h-5 text-olive" />
              {totalItemsCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 bg-sage text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Order Now Button (Desktop) */}
            <button
              onClick={() => scrollTo("shop")}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-sage hover:bg-olive text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-soft hover:shadow hover:-translate-y-0.5"
            >
              <span>Order Fresh</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-charcoal hover:bg-beige/40 rounded-full transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cream-100 border-b border-charcoal/10 px-6 py-6 animate-in slide-in-from-top-4 duration-200 shadow-elevated">
            <div className="flex flex-col gap-4">
              {[
                { id: "home", label: "Home" },
                { id: "shop", label: "Explore Goodies" },
                { id: "story", label: "Our Story" },
                { id: "ingredients", label: "Real Ingredients" },
                { id: "hyderabad", label: "Made in Hyderabad" },
                { id: "contact", label: "Contact Us" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-base font-serif font-medium text-charcoal hover:text-sage py-1.5 transition-colors border-b border-beige/40"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollTo("shop");
                  }}
                  className="w-full py-3 bg-sage hover:bg-olive text-cream-50 text-center text-xs font-semibold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore All Treats</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-charcoal-muted font-handwriting text-base">
                  Freshly baked with love in Hyderabad ♡
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for sticky header height */}
      <div className="h-20 sm:h-24" />
    </>
  );
}
