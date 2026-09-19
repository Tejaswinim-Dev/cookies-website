"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import CategorySection from "../components/CategorySection";
import ProductShop from "../components/ProductShop";
import OurStory from "../components/OurStory";
import IngredientsSection from "../components/IngredientsSection";
import HyderabadSection from "../components/HyderabadSection";
import Footer from "../components/Footer";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <main className="min-h-screen flex flex-col bg-cream-100 selection:bg-sage selection:text-white">
      {/* Sticky Translucent Header */}
      <Header />

      {/* Editorial Hero Section */}
      <Hero />

      {/* Artisan Trust Strip */}
      <TrustStrip />

      {/* 5 Minimal Category Tiles */}
      <CategorySection onSelectCategory={setSelectedCategory} />

      {/* Product Shop with Filters & Drawer Interaction */}
      <ProductShop
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Our Story & Small Batch Philosophy */}
      <OurStory />

      {/* Real Ingredients Showcase */}
      <IngredientsSection />

      {/* Hyderabad Kitchen & Delivery Coverage */}
      <HyderabadSection />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
