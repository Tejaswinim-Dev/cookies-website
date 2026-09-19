"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function MobileBottomBar() {
  const { totalItemsCount, grandTotal, setIsCartOpen, isCartOpen, isCheckoutOpen } = useCart();

  if (totalItemsCount === 0 || isCartOpen || isCheckoutOpen) return null;

  return (
    <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30 animate-in slide-in-from-bottom-5 duration-300">
      <button
        onClick={() => setIsCartOpen(true)}
        className="w-full py-3.5 px-5 bg-olive text-cream-50 rounded-full shadow-elevated flex items-center justify-between border border-white/20 active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-cream-100" />
            <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-terracotta text-white text-[9px] font-bold flex items-center justify-center">
              {totalItemsCount}
            </span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider">
            View Your Basket
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-sm text-cream-100">
            ₹{grandTotal}
          </span>
          <ArrowRight className="w-4 h-4 text-cream-100" />
        </div>
      </button>
    </div>
  );
}
