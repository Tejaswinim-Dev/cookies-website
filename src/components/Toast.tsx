"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 bg-charcoal text-cream-100 rounded-full shadow-elevated border border-charcoal-light/30 text-sm font-medium animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <span className="p-1 rounded-full bg-sage/30 text-sage-light">
        <Sparkles className="w-4 h-4 text-terracotta" />
      </span>
      <span>{toastMessage}</span>
    </div>
  );
}
