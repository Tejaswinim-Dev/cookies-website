"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  Package,
  CheckCircle2,
  ArrowRight,
  Search,
  Sparkles,
  Heart
} from "lucide-react";
import { HYDERABAD_LOCALITIES } from "@/data/products";

export default function HyderabadSection() {
  const [selectedLocality, setSelectedLocality] = useState("Banjara Hills");
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToShop = () => {
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const deliveryZones = [
    {
      zone: "Zone 1 — Central & Hills",
      areas: "Banjara Hills, Jubilee Hills, Somajiguda, Begumpet, Panjagutta",
      speed: "Fastest • 2-3 Hours from oven",
      tag: "Free over ₹499",
    },
    {
      zone: "Zone 2 — Cyberabad & West",
      areas: "HITEC City, Madhapur, Gachibowli, Kondapur, Financial District, Tellapur",
      speed: "Same-Day Afternoon Batch",
      tag: "Free over ₹499",
    },
    {
      zone: "Zone 3 — North & Secunderabad",
      areas: "Secunderabad, Marredpally, Sainikpuri, Alwal, Bowenpally",
      speed: "Daily Scheduled Slots",
      tag: "Free over ₹499",
    },
    {
      zone: "Zone 4 — South & East",
      areas: "Himayatnagar, Narayanguda, Dilsukhnagar, LB Nagar, Uppal",
      speed: "Daily Scheduled Slots",
      tag: "Free over ₹499",
    },
  ];

  const filteredLocalities = HYDERABAD_LOCALITIES.filter((loc) =>
    loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="hyderabad" className="py-20 md:py-28 bg-cream-100 relative overflow-hidden border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-beige/60 border border-charcoal/5 mb-4 shadow-soft">
            <MapPin className="w-3.5 h-3.5 text-terracotta" />
            <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-charcoal/80">
              DOORSTEP HYDERABAD DELIVERY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal tracking-tight">
            Fresh From Our Oven, <br />
            <span className="italic font-serif text-olive">Delivered Across Hyderabad.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
            We don&apos;t warehouse our cookies for weeks. Every morning batch is baked fresh upon order and dispatched directly across the twin cities.
          </p>
        </div>

        {/* 3 Core Delivery Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-cream-50 rounded-3xl p-6 sm:p-7 border border-charcoal/10 shadow-soft flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-sage/20 text-olive flex items-center justify-center mb-5">
              <Clock className="w-6 h-6 text-olive" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block mb-1">
                Bake & Dispatch Schedule
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                Two Daily Morning Batches
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
                <strong>Batch 1:</strong> Ovens heat at 6:00 AM • Dispatched by 10:30 AM <br />
                <strong>Batch 2:</strong> Chai batch at 2:00 PM • Dispatched by 5:00 PM
              </p>
            </div>
            <div className="pt-3 border-t border-charcoal/5 flex items-center gap-1.5 text-xs text-olive font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>Baked & delivered same day</span>
            </div>
          </div>

          <div className="bg-cream-50 rounded-3xl p-6 sm:p-7 border border-charcoal/10 shadow-soft flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-sage/20 text-olive flex items-center justify-center mb-5">
              <Truck className="w-6 h-6 text-olive" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block mb-1">
                Zero Shipping Threshold
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                Free Delivery Over ₹499
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
                Enjoy complimentary local home delivery anywhere in Hyderabad on orders above ₹499. Flat ₹60 for smaller craving packs.
              </p>
            </div>
            <div className="pt-3 border-t border-charcoal/5 flex items-center gap-1.5 text-xs text-olive font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
              <span>No hidden platform charges</span>
            </div>
          </div>

          <div className="bg-cream-50 rounded-3xl p-6 sm:p-7 border border-charcoal/10 shadow-soft flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-sage/20 text-olive flex items-center justify-center mb-5">
              <Package className="w-6 h-6 text-olive" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block mb-1">
                Eco-Friendly Protection
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                Plastic-Free Breathable Kraft
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
                Packed in food-grade unbleached kraft paper boxes and airtight glass jars to preserve oven-crisp texture without chemical preservatives.
              </p>
            </div>
            <div className="pt-3 border-t border-charcoal/5 flex items-center gap-1.5 text-xs text-olive font-semibold">
              <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
              <span>Thoughtfully packed with love</span>
            </div>
          </div>
        </div>

        {/* Detailed Hyderabad Coverage Zones Table / Grid */}
        <div className="bg-cream-50 rounded-3xl p-6 sm:p-10 border border-charcoal/10 shadow-soft mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/10 mb-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                Hyderabad Delivery Coverage Zones
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                Every corner of Hyderabad is covered with doorstep tracking & fresh handoff.
              </p>
            </div>

            {/* Quick Locality Search Filter */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your Hyderabad area..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-cream-100 border border-charcoal/15 text-xs text-charcoal placeholder-charcoal-muted focus:ring-1 focus:ring-sage focus:outline-none shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliveryZones.map((z, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-cream-100 border border-charcoal/10 hover:border-olive/40 hover:shadow-soft transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-serif text-base font-semibold text-charcoal flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-olive" />
                      {z.zone}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-sage/20 text-olive text-[11px] font-bold">
                      {z.tag}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-light leading-relaxed mb-3">
                    <strong className="text-charcoal font-semibold">Key Localities:</strong> {z.areas}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-olive font-semibold pt-2.5 border-t border-charcoal/5">
                  <Clock className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span>{z.speed}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Clickable Hyderabad Locality Chips */}
          <div className="mt-8 pt-6 border-t border-charcoal/10">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
                Tap Your Area to Check Availability:
              </span>
              <span className="text-[11px] text-olive font-medium">
                {filteredLocalities.length} Localities Active
              </span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
              {filteredLocalities.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocality(loc)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedLocality === loc
                      ? "bg-olive text-white font-semibold shadow-soft scale-105"
                      : "bg-beige/50 hover:bg-beige text-charcoal border border-charcoal/5"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            {selectedLocality && (
              <div className="mt-5 p-4 rounded-2xl bg-sage/15 border border-sage/30 text-xs text-olive flex items-center justify-between flex-wrap gap-3 shadow-soft">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-sage text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal text-sm block">
                      Active Dispatch Route: {selectedLocality}
                    </span>
                    <span className="text-charcoal-light text-[11px]">
                      Doorstep delivery available. Fresh morning bake dispatched directly to your address.
                    </span>
                  </div>
                </div>
                <button
                  onClick={scrollToShop}
                  className="px-4 py-2 bg-olive text-cream-50 hover:bg-sage text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-colors shadow-soft"
                >
                  <span>Select Treats For {selectedLocality}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Details & FAQ Cards (Ensuring NO content is hidden) */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta block mb-1">
              HYDERABAD DISPATCH POLICIES
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              Everything You Need to Know About Delivery
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cream-50 rounded-2xl p-6 border border-charcoal/10 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-beige/60 text-olive flex items-center justify-center mb-3.5">
                <Clock className="w-5 h-5 text-olive" />
              </div>
              <h4 className="font-serif text-base font-semibold text-charcoal mb-2">
                Order Cutoffs & Baking Times
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Orders placed before <strong>9:00 PM</strong> are baked in the next morning&apos;s 6:00 AM batch. Same-day afternoon orders are baked at 2:00 PM for tea-time dispatches.
              </p>
            </div>

            <div className="bg-cream-50 rounded-2xl p-6 border border-charcoal/10 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-beige/60 text-olive flex items-center justify-center mb-3.5">
                <Package className="w-5 h-5 text-olive" />
              </div>
              <h4 className="font-serif text-base font-semibold text-charcoal mb-2">
                Crispness-Lock Packaging
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                We use food-safe airtight tin ties and reusable glass jars packed with unbleached kraft cushions. Zero plastic wrap touches your cookies.
              </p>
            </div>

            <div className="bg-cream-50 rounded-2xl p-6 border border-charcoal/10 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-beige/60 text-olive flex items-center justify-center mb-3.5">
                <Truck className="w-5 h-5 text-olive" />
              </div>
              <h4 className="font-serif text-base font-semibold text-charcoal mb-2">
                Live WhatsApp Dispatch Tracking
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                The moment your treats leave our oven in Banjara Hills, you receive a direct WhatsApp notification with live rider tracking and estimated ETA.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-olive text-cream-50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-elevated">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-light block mb-1">
              FROM BANJARA HILLS TO YOUR HOME
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-tight">
              Craving wholesome cookies today?
            </h3>
            <p className="text-xs sm:text-sm text-cream-200 mt-1 max-w-lg">
              Place your order now to guarantee your spot in tomorrow morning&apos;s small-batch oven bake. Free delivery across Hyderabad over ₹499.
            </p>
          </div>

          <button
            onClick={scrollToShop}
            className="px-8 py-3.5 bg-cream-50 hover:bg-cream-100 text-charcoal text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-soft shrink-0 flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <span>Order Fresh Bakes</span>
            <ArrowRight className="w-4 h-4 text-olive" />
          </button>
        </div>

      </div>
    </section>
  );
}
