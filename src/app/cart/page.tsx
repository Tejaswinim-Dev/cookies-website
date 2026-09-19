"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Sparkles, CheckCircle2 } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    grandTotal,
    amountToFreeDelivery,
    setIsCheckoutOpen,
  } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-cream-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 py-10 md:py-16">
        {/* Page Title */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-olive mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping Goodies</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal tracking-tight">
            Your Wholesome Basket
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
            Freshly prepared on order in our Hyderabad kitchen.
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-cream-50 rounded-3xl border border-charcoal/5 max-w-2xl mx-auto shadow-soft my-6">
            <div className="w-20 h-20 rounded-full bg-beige/60 text-charcoal-muted flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-8 h-8 stroke-1 text-olive" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mb-2">
              Your basket is waiting for something delicious.
            </h2>
            <p className="text-sm text-charcoal-muted max-w-md mx-auto mb-8 leading-relaxed">
              Explore our small-batch cookies, energy granola bars, and wholesome guilt-free treats made with real ingredients.
            </p>
            <Link
              href="/#shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-sage hover:bg-olive text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors shadow-soft"
            >
              <span>Explore Goodies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Split Layout: Cart Items & Order Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Cart Items Table */}
            <div className="lg:col-span-8 bg-cream-50 rounded-3xl p-6 sm:p-8 border border-charcoal/10 shadow-soft">
              <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                <span>Baked Goodie</span>
                <span className="hidden sm:inline">Quantity & Price</span>
              </div>

              <div className="divide-y divide-charcoal/5">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Item Thumbnail & Info */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-beige/40 shrink-0 border border-charcoal/5">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-semibold text-olive tracking-wider block">
                          {product.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-charcoal-muted">{product.weight}</p>
                        <p className="text-xs font-bold text-charcoal font-sans sm:hidden mt-1">
                          ₹{product.price} each
                        </p>
                      </div>
                    </div>

                    {/* Stepper & Line Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-full border border-charcoal/15 bg-cream-100 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-charcoal hover:text-olive transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-charcoal">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-charcoal hover:text-olive transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="text-sm sm:text-base font-bold text-charcoal font-sans min-w-[70px] text-right">
                        ₹{product.price * quantity}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-charcoal-muted hover:text-terracotta transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Free delivery prompt */}
              <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center gap-2 text-xs text-charcoal">
                <Sparkles className="w-4 h-4 text-terracotta shrink-0" />
                {amountToFreeDelivery > 0 ? (
                  <span>
                    Add treats worth <strong className="text-olive">₹{amountToFreeDelivery}</strong> more to qualify for Free Delivery across Hyderabad!
                  </span>
                ) : (
                  <span className="text-sage font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    You unlocked complimentary delivery in Hyderabad!
                  </span>
                )}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 bg-cream-50 rounded-3xl p-6 sm:p-8 border border-charcoal/10 shadow-soft sticky top-28">
              <h2 className="font-serif text-xl font-medium text-charcoal mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-charcoal mb-6">
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Items Subtotal</span>
                  <span className="font-medium font-sans">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Hyderabad Delivery</span>
                  <span className="font-medium font-sans">
                    {deliveryFee === 0 ? (
                      <span className="text-sage font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-charcoal/10 flex justify-between text-base font-bold">
                  <span className="font-serif">Estimated Total</span>
                  <span className="text-olive font-sans">₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-olive hover:bg-olive-dark text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-soft hover:shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout (₹{grandTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-4 text-center">
                <span className="font-handwriting text-base text-terracotta">
                  Freshly baked in Hyderabad ♡
                </span>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
