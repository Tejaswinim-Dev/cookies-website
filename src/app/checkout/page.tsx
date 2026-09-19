"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart, CheckoutDetails } from "@/context/CartContext";
import { HYDERABAD_LOCALITIES } from "@/data/products";
import confetti from "canvas-confetti";
import {
  MapPin,
  Check,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Heart,
  FileCheck,
  Truck,
  Clock,
  CheckCircle2
} from "lucide-react";

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    deliveryFee,
    grandTotal,
    amountToFreeDelivery,
    clearCart,
    lastOrder,
    setLastOrder,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [form, setForm] = useState<CheckoutDetails>({
    fullName: "Ananya Rao",
    phone: "+91 98490 12345",
    email: "ananya.rao@example.com",
    houseFlat: "Flat 402, Green Meadows",
    streetArea: "Road No. 36",
    locality: "Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    deliveryDate: "Tomorrow Morning (Bake Slot 9am - 12pm)",
    deliveryNotes: "Please ring the bell or leave with building reception.",
    paymentMethod: "upi",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!form.fullName.trim()) errs.fullName = "Please enter your name";
    if (!form.phone.trim()) errs.phone = "Please enter a valid mobile number";
    if (!form.houseFlat.trim()) errs.houseFlat = "House/Flat number is required";
    if (!form.streetArea.trim()) errs.streetArea = "Street name or area is required";
    if (!form.pincode.trim() || form.pincode.length < 6)
      errs.pincode = "Enter a valid 6-digit Pincode";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToReview = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextToPayment = () => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = () => {
    const randomId = `HM-HYD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId: randomId,
      details: form,
      items: [...cart],
      subtotal,
      deliveryFee,
      total: grandTotal,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setLastOrder(newOrder);
    setStep(4);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#66745A", "#C98F72", "#3F4A36", "#EDE7DA"],
      });
    } catch (e) {
      // ignore
    }
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen flex flex-col bg-cream-100">
        <Header />
        <main className="flex-1 max-w-2xl mx-auto px-5 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-beige/60 text-charcoal-muted flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-8 h-8 stroke-1 text-olive" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-charcoal mb-2">
            Your basket is empty
          </h1>
          <p className="text-sm text-charcoal-muted mb-8 leading-relaxed">
            Please add some wholesome treats to your basket before proceeding to checkout.
          </p>
          <Link
            href="/#shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-olive hover:bg-olive-dark text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors shadow-soft"
          >
            <span>Explore Fresh Bakes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 py-8 md:py-14">
        {/* Breadcrumb & Navigation */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-olive mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Basket</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal tracking-tight">
            {step === 4 ? "Order Confirmed ♡" : "Checkout & Hyderabad Delivery"}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
            Handcrafted with organic jaggery & rolled oats • Baked fresh in Banjara Hills
          </p>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="mb-10 max-w-2xl bg-cream-50 p-4 rounded-2xl border border-charcoal/10 flex items-center justify-between text-xs sm:text-sm">
            <div
              className={`flex items-center gap-2 ${
                step >= 1 ? "text-olive font-bold" : "text-charcoal-muted"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step >= 1 ? "bg-olive text-white" : "bg-beige"
                }`}
              >
                1
              </span>
              <span>Delivery Details</span>
            </div>
            <div className="h-[2px] flex-1 mx-3 bg-charcoal/10" />
            <div
              className={`flex items-center gap-2 ${
                step >= 2 ? "text-olive font-bold" : "text-charcoal-muted"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step >= 2 ? "bg-olive text-white" : "bg-beige"
                }`}
              >
                2
              </span>
              <span>Review Basket</span>
            </div>
            <div className="h-[2px] flex-1 mx-3 bg-charcoal/10" />
            <div
              className={`flex items-center gap-2 ${
                step >= 3 ? "text-olive font-bold" : "text-charcoal-muted"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step >= 3 ? "bg-olive text-white" : "bg-beige"
                }`}
              >
                3
              </span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        {step < 4 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Multi-Step Forms */}
            <div className="lg:col-span-7 bg-cream-50 rounded-3xl p-6 sm:p-10 border border-charcoal/10 shadow-soft">
              {/* STEP 1: DELIVERY DETAILS FORM */}
              {step === 1 && (
                <form onSubmit={handleNextToReview} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-charcoal/10">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-medium text-charcoal">
                        Delivery Destination
                      </h2>
                      <p className="text-xs text-charcoal-muted mt-0.5">
                        Hand-delivered fresh across all Hyderabad neighborhoods
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-sage/20 text-olive text-xs font-bold rounded-full flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Hyderabad
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-cream-100 text-sm text-charcoal focus:ring-2 focus:ring-sage focus:outline-none"
                        placeholder="e.g. Ananya Rao"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-cream-100 text-sm text-charcoal focus:ring-2 focus:ring-sage focus:outline-none"
                        placeholder="+91 98490 12345"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                      Email Address (for fresh bake invoice)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-cream-100 text-sm text-charcoal focus:ring-2 focus:ring-sage focus:outline-none"
                      placeholder="ananya@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                        House / Flat / Apartment No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.houseFlat}
                        onChange={(e) => setForm({ ...form, houseFlat: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-cream-100 text-sm text-charcoal focus:ring-2 focus:ring-sage focus:outline-none"
                        placeholder="Flat 402, Green Meadows"
                      />
                      {errors.houseFlat && (
                        <p className="text-xs text-red-500 mt-1">{errors.houseFlat}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                        Street / Colony / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.streetArea}
                        onChange={(e) => setForm({ ...form, streetArea: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-cream-100 text-sm text-charcoal focus:ring-2 focus:ring-sage focus:outline-none"
                        placeholder="Road No. 36"
                      />
                      {errors.streetArea && (
                        <p className="text-xs text-red-500 mt-1">{errors.streetArea}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                        Hyderabad Locality *
                      </label>
                      <select
                        value={form.locality}
                        onChange={(e) => setForm({ ...form, locality: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal/15 bg-cream-100 text-sm text-charcoal focus:ring-2 focus:ring-sage focus:outline-none cursor-pointer"
                      >
                        {HYDERABAD_LOCALITIES.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        disabled
                        value={form.city}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal/10 bg-beige/40 text-sm text-charcoal cursor-not-allowed font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal/15 bg-cream-100 text-sm text-charcoal focus:ring-2 focus:ring-sage focus:outline-none"
                        placeholder="500033"
                      />
                      {errors.pincode && (
                        <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                      Bake & Delivery Slot
                    </label>
                    <select
                      value={form.deliveryDate}
                      onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-charcoal/15 bg-cream-100 text-sm text-charcoal focus:ring-2 focus:ring-sage focus:outline-none cursor-pointer"
                    >
                      <option value="Tomorrow Morning (Bake Slot 9am - 12pm)">
                        Tomorrow Morning (Fresh Bake Slot 9am - 12pm)
                      </option>
                      <option value="Tomorrow Afternoon (Bake Slot 2pm - 6pm)">
                        Tomorrow Afternoon (Fresh Bake Slot 2pm - 6pm)
                      </option>
                      <option value="Day After Tomorrow Morning">
                        Day After Tomorrow Morning (9am - 12pm)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
                      Delivery Notes / Gate Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={form.deliveryNotes}
                      onChange={(e) => setForm({ ...form, deliveryNotes: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-charcoal/15 bg-cream-100 text-sm text-charcoal focus:ring-2 focus:ring-sage focus:outline-none"
                      placeholder="e.g. Ring the bell, or leave with security at the main gate."
                    />
                  </div>

                  {/* PROMINENT SUBMIT BUTTON: Unmissable directly at the bottom of the details form */}
                  <div className="pt-6 border-t border-charcoal/10">
                    <button
                      type="submit"
                      id="details-form-continue-btn"
                      className="w-full py-4 px-8 bg-olive hover:bg-olive-dark active:bg-olive text-cream-50 text-sm font-semibold uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>Continue to Review Order • ₹{grandTotal}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-charcoal-muted text-center mt-2.5 font-medium">
                      Next step: Review selected items & delivery slot
                    </p>
                  </div>
                </form>
              )}

              {/* STEP 2: REVIEW BASKET */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-charcoal/10">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-medium text-charcoal">
                        Review Your Wholesome Basket
                      </h2>
                      <p className="text-xs text-charcoal-muted mt-0.5">
                        Check your freshly baked treats and delivery address
                      </p>
                    </div>
                    <span className="text-xs text-olive font-bold">
                      {cart.length} healthy treats
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-charcoal/5 border border-charcoal/10 rounded-2xl bg-cream-100 overflow-hidden">
                    {cart.map(({ product, quantity }) => (
                      <div key={product.id} className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-beige/40 shrink-0 border border-charcoal/5">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-serif text-sm sm:text-base font-medium text-charcoal truncate">
                              {product.name}
                            </h3>
                            <p className="text-xs text-charcoal-muted">
                              Qty: {quantity} • {product.weight}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-charcoal font-sans shrink-0">
                          ₹{product.price * quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Address Summary */}
                  <div className="p-4 rounded-2xl bg-beige/30 border border-charcoal/10 text-sm text-charcoal">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-olive uppercase tracking-wider text-xs flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        Delivery Destination
                      </span>
                      <button
                        onClick={() => setStep(1)}
                        className="text-terracotta hover:underline font-semibold text-xs"
                      >
                        Edit Details
                      </button>
                    </div>
                    <p className="font-medium">{form.fullName} ({form.phone})</p>
                    <p className="text-xs text-charcoal-light mt-0.5">
                      {form.houseFlat}, {form.streetArea}, {form.locality}, {form.city} - {form.pincode}
                    </p>
                    <p className="mt-2 text-xs text-olive font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Slot: {form.deliveryDate}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-charcoal/10 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full sm:w-auto px-6 py-3.5 border border-charcoal/15 bg-cream-100 hover:bg-beige text-xs text-charcoal font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Address</span>
                    </button>
                    <button
                      type="button"
                      id="review-proceed-payment-btn"
                      onClick={handleNextToPayment}
                      className="flex-1 w-full py-4 px-8 bg-olive hover:bg-olive-dark text-cream-50 text-sm font-semibold uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 active:scale-[0.99]"
                    >
                      <span>Proceed to Payment • ₹{grandTotal}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: DEMO PAYMENT */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-charcoal/10">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-medium text-charcoal">
                        Choose Payment Method
                      </h2>
                      <p className="text-xs text-charcoal-muted mt-0.5">
                        Demo store mode • No actual bank transactions
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                      Demo Safe
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        id: "upi",
                        title: "UPI / Google Pay / PhonePe (Simulated)",
                        desc: "Instant confirmation with simulated QR / UPI transfer",
                      },
                      {
                        id: "cod",
                        title: "Pay on Delivery (Cash or UPI at Doorstep)",
                        desc: "Pay directly to our delivery executive upon arrival",
                      },
                      {
                        id: "card",
                        title: "Credit / Debit Card (Simulated)",
                        desc: "Simulated safe and secure mock gateway",
                      },
                    ].map((item) => (
                      <label
                        key={item.id}
                        className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                          form.paymentMethod === item.id
                            ? "border-sage bg-sage/10 shadow-soft"
                            : "border-charcoal/10 bg-cream-100 hover:bg-beige/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={form.paymentMethod === item.id}
                            onChange={() => setForm({ ...form, paymentMethod: item.id as any })}
                            className="text-sage focus:ring-sage w-4 h-4"
                          />
                          <div>
                            <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                            <p className="text-xs text-charcoal-muted mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-charcoal/10 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto px-6 py-3.5 border border-charcoal/15 bg-cream-100 hover:bg-beige text-xs text-charcoal font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Review</span>
                    </button>
                    <button
                      type="button"
                      id="place-order-submit-btn"
                      onClick={handlePlaceOrder}
                      className="flex-1 w-full py-4 px-8 bg-olive hover:bg-olive-dark text-cream-50 text-sm font-semibold uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 active:scale-[0.99]"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Place Order Now • ₹{grandTotal}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Order Summary */}
            <div className="lg:col-span-5 bg-cream-50 rounded-3xl p-6 sm:p-8 border border-charcoal/10 shadow-soft sticky top-28">
              <h2 className="font-serif text-xl font-medium text-charcoal mb-4">
                Order Breakdown
              </h2>

              {/* Items quick list with visible smooth scroll */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto modal-scroll pr-1.5">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-beige/30">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <span className="text-charcoal font-medium truncate">
                        {product.name} (x{quantity})
                      </span>
                    </div>
                    <span className="font-sans font-bold text-charcoal shrink-0">
                      ₹{product.price * quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-charcoal pt-4 border-t border-charcoal/10">
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Items Subtotal</span>
                  <span className="font-medium font-sans">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Fresh Hyderabad Delivery</span>
                  <span className="font-medium font-sans">
                    {deliveryFee === 0 ? (
                      <span className="text-sage font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-charcoal/10 flex justify-between text-base font-bold">
                  <span className="font-serif">Total Payable</span>
                  <span className="text-olive font-sans text-lg">₹{grandTotal}</span>
                </div>
              </div>

              {/* Hyderabad delivery badge */}
              <div className="mt-6 p-3.5 bg-beige/40 rounded-2xl border border-charcoal/5 text-xs text-charcoal flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-olive shrink-0" />
                <span>
                  Dispatched in temperature-safe eco-packaging from Banjara Hills.
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 4: ORDER CONFIRMED RECEIPT VIEW */
          lastOrder && (
            <div className="max-w-2xl mx-auto bg-cream-50 rounded-3xl p-6 sm:p-10 border border-charcoal/10 shadow-soft text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-sage/20 text-olive mx-auto flex items-center justify-center animate-in zoom-in-50 duration-300">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <span className="font-handwriting text-2xl text-terracotta block mb-1">
                  Freshly scheduled for baking ♡
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
                  Thank you for your order!
                </h2>
                <p className="text-sm text-charcoal-muted max-w-md mx-auto mt-2">
                  Our ovens will be fired up for your wholesome bakes. You will receive a WhatsApp notification when dispatched.
                </p>
              </div>

              {/* Receipt Details */}
              <div className="p-6 rounded-2xl bg-cream-100 border border-charcoal/10 text-left space-y-4">
                <div className="flex justify-between items-center border-b border-charcoal/10 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                      Order Reference
                    </span>
                    <span className="text-xl font-bold text-olive font-mono">
                      {lastOrder.orderId}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sage/20 text-olive text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                    <span>Confirmed</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block mb-2">
                    Items ({lastOrder.items.length})
                  </span>
                  <div className="divide-y divide-charcoal/5 border border-charcoal/5 rounded-xl bg-cream-50 overflow-hidden">
                    {lastOrder.items.map(({ product, quantity }: any) => (
                      <div key={product.id} className="p-3 flex items-center justify-between text-xs">
                        <span className="font-medium text-charcoal">
                          {product.name} (x{quantity})
                        </span>
                        <span className="font-bold text-charcoal font-sans">
                          ₹{product.price * quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-beige/30 text-xs text-charcoal space-y-1">
                  <div className="flex justify-between font-semibold text-olive text-[11px] mb-1">
                    <span>Delivering To</span>
                    <span>{lastOrder.details.phone}</span>
                  </div>
                  <p className="font-medium">{lastOrder.details.fullName}</p>
                  <p className="text-charcoal-light">
                    {lastOrder.details.houseFlat}, {lastOrder.details.streetArea}, {lastOrder.details.locality}, Hyderabad - {lastOrder.details.pincode}
                  </p>
                  <p className="text-[11px] text-olive font-semibold pt-1">
                    Slot: {lastOrder.details.deliveryDate}
                  </p>
                </div>

                <div className="pt-3 border-t border-charcoal/10 space-y-1 text-xs">
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Subtotal</span>
                    <span className="font-sans font-medium">₹{lastOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Hyderabad Delivery</span>
                    <span className="font-sans font-medium">
                      {lastOrder.deliveryFee === 0 ? "FREE" : `₹${lastOrder.deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-charcoal pt-2 border-t border-charcoal/5">
                    <span>Total Paid (Simulated)</span>
                    <span className="text-olive font-sans text-base">₹{lastOrder.total}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 bg-olive hover:bg-olive-dark text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all shadow-md"
                >
                  <span>Return to Bakery Home</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
