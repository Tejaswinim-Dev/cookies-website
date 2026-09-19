"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, Instagram, Heart, ArrowUp, Send, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const { showToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      showToast("Thank you for joining our small-batch club! ♡");
      setNewsletterEmail("");
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hi HealthyMakes! I'm interested in ordering wholesome cookies and treats baked in Hyderabad."
  );

  return (
    <footer id="contact" className="bg-cream-200/70 border-t border-charcoal/10 pt-16 pb-12 text-charcoal">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-14">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-serif text-2xl font-bold tracking-tight text-charcoal">
                HealthyMakes
              </span>
              <span className="w-2 h-2 rounded-full bg-terracotta" />
            </div>
            <p className="font-handwriting text-xl text-olive mb-3 font-semibold">
              Homemade with love.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-sm mb-6">
              Wholesome cookies, healthy snacks and sweet treats, freshly baked in small batches in our Hyderabad home kitchen. Clean ingredients, unrefined sweeteners, zero maida.
            </p>

            {/* Direct Connect Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/20 hover:bg-sage text-olive hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HealthyMakes Instagram"
                className="w-9 h-9 rounded-full bg-beige hover:bg-sage hover:text-white text-charcoal flex items-center justify-center transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-muted">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="hover:text-olive transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("shop")}
                  className="hover:text-olive transition-colors"
                >
                  Shop Treats
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("story")}
                  className="hover:text-olive transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ingredients")}
                  className="hover:text-olive transition-colors"
                >
                  Real Ingredients
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("hyderabad")}
                  className="hover:text-olive transition-colors"
                >
                  Hyderabad Kitchen
                </button>
              </li>
            </ul>
          </div>

          {/* Kitchen Hours & Location */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-4">
              Hyderabad Kitchen & Sourdough Club
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
              <strong>Location:</strong> Hyderabad, Telangana, India <br />
              <strong>Baking Days:</strong> Monday – Saturday (Morning Batch) <br />
              <strong>Dispatches:</strong> Fresh same-day local delivery across Hyderabad
            </p>

            {/* Mini Newsletter */}
            <form onSubmit={handleNewsletter} className="mt-4">
              <span className="text-xs text-charcoal font-medium block mb-2">
                Join our weekend fresh batch notifications:
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-cream-50 border border-charcoal/10 text-charcoal focus:ring-1 focus:ring-sage focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-sage hover:bg-olive text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <div>
            © 2026 HealthyMakes. Wholesome Bakery, Hyderabad.
          </div>

          <div className="font-handwriting text-lg text-olive font-semibold">
            “Healthy Today. Happier Tomorrow. ♡”
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-charcoal hover:text-olive transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
