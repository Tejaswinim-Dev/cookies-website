"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold,
    amountToFreeDelivery,
    grandTotal,
    setIsCheckoutOpen,
  } = useCart();

  const drawerBodyRef = useRef<HTMLDivElement>(null);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleForwardWheel = (e: React.WheelEvent) => {
    if (drawerBodyRef.current) {
      drawerBodyRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to dismiss */}
      <div className="flex-1" onClick={handleClose} onWheel={handleForwardWheel} />

      {/* Slide-over Drawer */}
      <div
        data-lenis-prevent
        className="w-full max-w-md bg-cream-100 h-full shadow-2xl flex flex-col justify-between border-l border-charcoal/10 animate-in slide-in-from-right duration-300"
      >
        
        {/* Drawer Header (Fixed) */}
        <div
          onWheel={handleForwardWheel}
          className="px-5 sm:px-6 py-4 border-b border-charcoal/10 flex items-center justify-between bg-cream-50 shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sage/20 text-olive flex items-center justify-center font-bold text-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-medium text-charcoal">
                Your Goodies ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
              <p className="text-[10px] sm:text-[11px] text-charcoal-muted uppercase tracking-wider font-semibold">
                Banjara Hills Kitchen Basket
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full bg-cream-100 hover:bg-beige text-charcoal flex items-center justify-center transition-colors shadow-soft"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Drawer Body (Unified Scroll: items + breakdown + estimated total) */}
        <div
          ref={drawerBodyRef}
          data-lenis-prevent
          className="flex-1 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-4"
        >
          {/* Free Delivery Bar */}
          {cart.length > 0 && (
            <div className="p-3 bg-beige/40 rounded-2xl border border-charcoal/5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                {amountToFreeDelivery > 0 ? (
                  <span className="text-charcoal-light font-medium">
                    Add <strong className="text-olive">₹{amountToFreeDelivery}</strong> more for Free Hyderabad Delivery!
                  </span>
                ) : (
                  <span className="text-sage font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Unlocked Free Hyderabad Delivery!
                  </span>
                )}
                <span className="text-[11px] text-charcoal-muted font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                <div
                  className="h-full bg-sage transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Empty Basket State */}
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-beige/60 flex items-center justify-center mb-4 text-charcoal-muted">
                <ShoppingBag className="w-7 h-7 stroke-1 text-olive" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                Your basket is empty
              </h3>
              <p className="text-xs text-charcoal-muted max-w-xs mb-6 leading-relaxed">
                Wholesome cookies, artisan granola bars, and guilt-free snacks freshly baked in small batches.
              </p>
              <button
                onClick={() => {
                  handleClose();
                  const shop = document.getElementById("shop");
                  if (shop) shop.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-olive hover:bg-olive-dark text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors shadow-soft"
              >
                Explore Fresh Bakes
              </button>
            </div>
          ) : (
            <>
              {/* All Items List: Naturally expanding, smooth scrolling */}
              <div className="divide-y divide-charcoal/5 border border-charcoal/10 rounded-2xl bg-cream-50 overflow-hidden">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="p-3.5 flex gap-3.5 items-center">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-beige/30 shrink-0 border border-charcoal/5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-xs sm:text-sm font-medium text-charcoal truncate">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          aria-label="Remove item"
                          className="text-charcoal-muted hover:text-terracotta transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] text-charcoal-muted">{product.weight}</p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center rounded-full border border-charcoal/15 bg-cream-100 px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-charcoal hover:text-olive transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-charcoal">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-charcoal hover:text-olive transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-charcoal font-sans">
                          ₹{product.price * quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* In-Flow Order Breakdown with Estimated Total */}
              <div className="p-4 rounded-2xl bg-cream-50 border border-charcoal/10 space-y-2 text-xs text-charcoal">
                <div className="flex justify-between text-charcoal-muted">
                  <span>Items Subtotal</span>
                  <span className="font-medium font-sans">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Fresh Hyderabad Delivery</span>
                  <span className="font-medium font-sans">
                    {deliveryFee === 0 ? (
                      <span className="text-sage font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-charcoal/10 flex justify-between text-sm font-bold text-charcoal">
                  <span className="font-serif">Estimated Total</span>
                  <span className="text-olive font-sans text-base">₹{grandTotal}</span>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-charcoal-muted">
                  <span>Freshly baked in Hyderabad ♡</span>
                  <Link
                    href="/cart"
                    onClick={handleClose}
                    className="font-semibold text-olive hover:underline"
                  >
                    View Full Cart Page →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky Drawer Footer with Quick Checkout CTA */}
        {cart.length > 0 && (
          <div
            onWheel={handleForwardWheel}
            className="p-3.5 sm:p-4 bg-cream-50/95 backdrop-blur-md border-t border-charcoal/10 flex items-center justify-between gap-3 shrink-0 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
          >
            <div>
              <span className="text-[10px] text-charcoal-muted uppercase font-bold tracking-wider block">
                Estimated Total
              </span>
              <span className="text-base font-bold text-olive font-sans">
                ₹{grandTotal}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-olive hover:bg-olive-dark text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
