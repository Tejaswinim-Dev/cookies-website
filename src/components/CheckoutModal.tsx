"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Check,
  MapPin,
  Calendar,
  CreditCard,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Heart,
  FileCheck
} from "lucide-react";
import { useCart, CheckoutDetails } from "@/context/CartContext";
import { HYDERABAD_LOCALITIES } from "@/data/products";
import confetti from "canvas-confetti";

export default function CheckoutModal() {
  const {
    cart,
    subtotal,
    deliveryFee,
    grandTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    lastOrder,
    setLastOrder,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Address, 2: Review, 3: Demo Payment, 4: Confirmed

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
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    if (step === 4) {
      setStep(1);
    }
  };

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
    }
  };

  const handleNextToPayment = () => {
    setStep(3);
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
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLastOrder(newOrder);
    setStep(4);
    clearCart();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#66745A", "#C98F72", "#3F4A36", "#EDE7DA"],
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/75 backdrop-blur-md p-2 sm:p-4 md:p-6 flex justify-center items-start sm:items-center min-h-screen animate-in fade-in duration-200"
      onClick={handleClose}
      onWheel={(e) => modalBodyRef.current && (modalBodyRef.current.scrollTop += e.deltaY)}
    >
      {/* Modal Container: Fitted to consistent, balanced dimensions */}
      <div
        data-lenis-prevent
        className="relative w-full max-w-xl bg-cream-100 rounded-3xl shadow-2xl border border-charcoal/10 flex flex-col h-[86vh] max-h-[640px] my-auto overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div
          onWheel={(e) => modalBodyRef.current && (modalBodyRef.current.scrollTop += e.deltaY)}
          className="px-5 py-3.5 bg-cream-50 border-b border-charcoal/10 flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sage/20 text-olive flex items-center justify-center font-bold text-xs">
              HM
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-medium text-charcoal">
                {step === 4 ? "Order Confirmed ♡" : "HealthyMakes Checkout"}
              </h2>
              <p className="text-[10px] text-charcoal-muted uppercase tracking-wider font-semibold">
                Hyderabad Home Kitchen Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="w-8 h-8 rounded-full bg-cream-100 hover:bg-beige text-charcoal flex items-center justify-center transition-colors shadow-soft"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Fixed Steps Breadcrumb (Steps 1-3) */}
        {step < 4 && (
          <div
            onWheel={(e) => modalBodyRef.current && (modalBodyRef.current.scrollTop += e.deltaY)}
            className="px-5 py-2 bg-beige/30 border-b border-charcoal/5 flex items-center justify-between text-xs shrink-0"
          >
            <div className={`flex items-center gap-1.5 ${step >= 1 ? "text-olive font-bold" : "text-charcoal-muted"}`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${step >= 1 ? "bg-olive text-white" : "bg-beige"}`}>
                1
              </span>
              <span>Address</span>
            </div>
            <div className="h-[1px] flex-1 mx-2.5 bg-charcoal/10" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? "text-olive font-bold" : "text-charcoal-muted"}`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${step >= 2 ? "bg-olive text-white" : "bg-beige"}`}>
                2
              </span>
              <span>Review</span>
            </div>
            <div className="h-[1px] flex-1 mx-2.5 bg-charcoal/10" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? "text-olive font-bold" : "text-charcoal-muted"}`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${step >= 3 ? "bg-olive text-white" : "bg-beige"}`}>
                3
              </span>
              <span>Demo Pay</span>
            </div>
          </div>
        )}

        {/* Scrollable Body Container with smooth scrollbar */}
        <div
          ref={modalBodyRef}
          data-lenis-prevent
          className="flex-1 overflow-y-auto modal-scroll p-4 sm:p-6 pb-12"
        >
          
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base sm:text-lg text-charcoal font-medium">
                  Delivery Destination
                </h3>
                <span className="text-xs text-olive font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Hyderabad Only
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-charcoal/15 bg-cream-50 text-xs text-charcoal focus:ring-1 focus:ring-sage focus:outline-none"
                    placeholder="e.g. Ananya Rao"
                  />
                  {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-charcoal/15 bg-cream-50 text-xs text-charcoal focus:ring-1 focus:ring-sage focus:outline-none"
                    placeholder="+91 98490 12345"
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-charcoal/15 bg-cream-50 text-xs text-charcoal focus:ring-1 focus:ring-sage focus:outline-none"
                  placeholder="ananya@example.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                    House / Flat / Villa *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.houseFlat}
                    onChange={(e) => setForm({ ...form, houseFlat: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-charcoal/15 bg-cream-50 text-xs text-charcoal focus:ring-1 focus:ring-sage focus:outline-none"
                    placeholder="Flat 402, Green Meadows"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                    Street / Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.streetArea}
                    onChange={(e) => setForm({ ...form, streetArea: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-charcoal/15 bg-cream-50 text-xs text-charcoal focus:ring-1 focus:ring-sage focus:outline-none"
                    placeholder="Road No. 36"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                    Locality *
                  </label>
                  <select
                    value={form.locality}
                    onChange={(e) => setForm({ ...form, locality: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-charcoal/15 bg-cream-50 text-xs text-charcoal focus:ring-1 focus:ring-sage focus:outline-none cursor-pointer"
                  >
                    {HYDERABAD_LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    disabled
                    value={form.city}
                    className="w-full px-3 py-2 rounded-xl border border-charcoal/10 bg-beige/40 text-xs text-charcoal cursor-not-allowed font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-charcoal/15 bg-cream-50 text-xs text-charcoal focus:ring-1 focus:ring-sage focus:outline-none"
                    placeholder="500033"
                  />
                  {errors.pincode && <p className="text-[10px] text-red-500 mt-1">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                  Bake & Delivery Slot
                </label>
                <select
                  value={form.deliveryDate}
                  onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-charcoal/15 bg-cream-50 text-xs text-charcoal focus:ring-1 focus:ring-sage focus:outline-none cursor-pointer"
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
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal-light mb-1">
                  Delivery Notes / Gate Instructions
                </label>
                <textarea
                  rows={2}
                  value={form.deliveryNotes}
                  onChange={(e) => setForm({ ...form, deliveryNotes: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl border border-charcoal/15 bg-cream-50 text-xs text-charcoal focus:ring-1 focus:ring-sage focus:outline-none"
                  placeholder="e.g. Leave with security or call upon arrival."
                />
              </div>

              {/* DIRECT FORM ACTION BUTTON: Always visible at bottom of form */}
              <div className="pt-4 border-t border-charcoal/10">
                <button
                  type="button"
                  id="checkout-step1-submit-btn"
                  onClick={() => handleNextToReview()}
                  className="w-full py-3.5 sm:py-4 px-6 bg-olive hover:bg-olive-dark active:bg-olive text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Continue to Review Order • ₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-charcoal-muted text-center mt-2 font-medium">
                  Review your treats & Hyderabad delivery slot next
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: REVIEW */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base sm:text-lg text-charcoal font-medium">
                  Review Your Wholesome Basket
                </h3>
                <span className="text-xs text-charcoal-muted">
                  {cart.length} treats
                </span>
              </div>

              {/* Items List - natural flow so all items are visible and scrolling content moves down to Estimated Total */}
              <div className="divide-y divide-charcoal/5 border border-charcoal/10 rounded-2xl bg-cream-50 overflow-hidden">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="p-3 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-beige/40">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs sm:text-sm font-medium text-charcoal truncate">
                        {product.name}
                      </h4>
                      <p className="text-[10px] text-charcoal-muted">
                        Qty: {quantity} • {product.weight}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-charcoal font-sans">
                      ₹{product.price * quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Address Summary Box */}
              <div className="p-3.5 rounded-2xl bg-beige/30 border border-charcoal/5 text-xs text-charcoal">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-olive uppercase tracking-wider text-[10px]">
                    Delivery Destination
                  </span>
                  <button
                    onClick={() => setStep(1)}
                    className="text-terracotta hover:underline font-medium text-[11px]"
                  >
                    Edit Address
                  </button>
                </div>
                <p className="font-medium">{form.fullName} ({form.phone})</p>
                <p className="text-charcoal-light">
                  {form.houseFlat}, {form.streetArea}, {form.locality}, {form.city} - {form.pincode}
                </p>
                <p className="mt-1 text-[11px] text-olive font-medium">
                  Slot: {form.deliveryDate}
                </p>
              </div>

              {/* Price Line Breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal pt-1">
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
                <div className="pt-2 border-t border-charcoal/10 flex justify-between text-sm font-bold">
                  <span className="font-serif">Total Payable</span>
                  <span className="text-olive font-sans">₹{grandTotal}</span>
                </div>
              </div>

              {/* DIRECT ACTION BUTTONS: Inside Step 2 Review */}
              <div className="pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-5 py-3 border border-charcoal/15 bg-cream-50 hover:bg-beige text-xs text-charcoal font-semibold rounded-2xl transition-colors flex items-center justify-center gap-1.5 order-2 sm:order-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Edit Details</span>
                </button>
                <button
                  type="button"
                  id="checkout-step2-payment-btn"
                  onClick={handleNextToPayment}
                  className="flex-1 w-full py-3.5 sm:py-4 px-6 bg-olive hover:bg-olive-dark text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 active:scale-[0.99]"
                >
                  <span>Proceed to Payment • ₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DEMO PAYMENT */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-base sm:text-lg text-charcoal font-medium">
                  Select Payment Method
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Simulated demo store mode. No actual card or bank charges.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>DEMO STORE:</strong> You can place a simulated order safely to test the flow!
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: "upi",
                    title: "UPI / Google Pay / PhonePe (Simulated)",
                    desc: "Scan or enter any simulated UPI ID on confirmation",
                  },
                  {
                    id: "cod",
                    title: "Pay on Delivery (Cash or UPI upon delivery)",
                    desc: "Settle with our local Hyderabad delivery partner",
                  },
                  {
                    id: "card",
                    title: "Credit / Debit Card (Simulated)",
                    desc: "Safe simulated card processing",
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`block p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      form.paymentMethod === item.id
                        ? "border-sage bg-sage/5 shadow-soft"
                        : "border-charcoal/10 bg-cream-50 hover:bg-beige/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={form.paymentMethod === item.id}
                        onChange={() => setForm({ ...form, paymentMethod: item.id as any })}
                        className="text-sage focus:ring-sage"
                      />
                      <div>
                        <p className="text-xs font-semibold text-charcoal">{item.title}</p>
                        <p className="text-[11px] text-charcoal-muted mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* DIRECT ACTION BUTTONS: Inside Step 3 Payment */}
              <div className="pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-5 py-3 border border-charcoal/15 bg-cream-50 hover:bg-beige text-xs text-charcoal font-semibold rounded-2xl transition-colors flex items-center justify-center gap-1.5 order-2 sm:order-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Review</span>
                </button>
                <button
                  type="button"
                  id="checkout-step3-confirm-btn"
                  onClick={handlePlaceOrder}
                  className="flex-1 w-full py-3.5 sm:py-4 px-6 bg-olive hover:bg-olive-dark text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Confirm & Place Order • ₹{grandTotal}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMED */}
          {step === 4 && lastOrder && (
            <div className="text-center py-2 space-y-4">
              <div className="w-14 h-14 rounded-full bg-sage/20 text-olive mx-auto flex items-center justify-center animate-in zoom-in-50 duration-300">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>

              <div>
                <span className="font-handwriting text-2xl text-terracotta block mb-0.5">
                  Order received ♡
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                  Thank you for choosing HealthyMakes!
                </h3>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto mt-1">
                  Your small-batch treats are scheduled for morning baking in our Hyderabad home kitchen.
                </p>
              </div>

              {/* Comprehensive Order Receipt Card */}
              <div className="p-5 rounded-2xl bg-cream-50 border border-charcoal/10 text-left shadow-soft max-w-lg mx-auto space-y-4">
                {/* Header line */}
                <div className="flex justify-between items-center border-b border-charcoal/10 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                      Order Reference
                    </span>
                    <span className="text-lg font-bold text-olive font-mono">
                      {lastOrder.orderId}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sage/20 text-olive text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-terracotta" />
                    <span>Baking Confirmed</span>
                  </span>
                </div>

                {/* Ordered Items List */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted block mb-2">
                    Baked Treats in This Order ({lastOrder.items.length})
                  </span>
                  <div className="divide-y divide-charcoal/5 border border-charcoal/5 rounded-xl bg-cream-100 overflow-hidden">
                    {lastOrder.items.map(({ product, quantity }: any) => (
                      <div key={product.id} className="p-2.5 flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-beige/40">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-serif text-xs font-medium text-charcoal truncate">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-charcoal-muted">
                              Qty: {quantity} • {product.weight}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-charcoal font-sans shrink-0">
                          ₹{product.price * quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Delivery Details */}
                <div className="p-3 rounded-xl bg-beige/30 text-xs text-charcoal space-y-1">
                  <div className="flex justify-between font-semibold text-olive text-[11px] mb-1">
                    <span>Delivery Address</span>
                    <span>{lastOrder.details.phone}</span>
                  </div>
                  <p className="font-medium text-charcoal">
                    {lastOrder.details.fullName}
                  </p>
                  <p className="text-charcoal-light">
                    {lastOrder.details.houseFlat}, {lastOrder.details.streetArea}, {lastOrder.details.locality}, Hyderabad - {lastOrder.details.pincode}
                  </p>
                  <p className="text-[11px] text-olive font-medium pt-1">
                    Slot: {lastOrder.details.deliveryDate}
                  </p>
                  {lastOrder.details.deliveryNotes && (
                    <p className="text-[10px] text-charcoal-muted italic">
                      Note: &ldquo;{lastOrder.details.deliveryNotes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Price Line Breakdown */}
                <div className="pt-2 border-t border-charcoal/10 space-y-1 text-xs">
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
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Payment Mode</span>
                    <span className="font-medium capitalize text-olive">
                      {lastOrder.details.paymentMethod === "upi" ? "UPI (Demo Paid)" : lastOrder.details.paymentMethod === "cod" ? "Pay on Delivery" : "Card (Demo Paid)"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-charcoal pt-1.5 border-t border-charcoal/5">
                    <span>Total Amount</span>
                    <span className="text-olive font-sans">₹{lastOrder.total}</span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* ALWAYS VISIBLE PINNED FOOTER WITH ACTION BUTTONS */}
        <div
          onWheel={(e) => modalBodyRef.current && (modalBodyRef.current.scrollTop += e.deltaY)}
          className="p-4 sm:p-5 bg-cream-50/95 backdrop-blur-md border-t border-charcoal/10 flex items-center justify-between gap-3 shrink-0 z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
        >
          {step === 1 && (
            <>
              <div className="text-xs text-charcoal">
                <span className="text-charcoal-muted block text-[10px] uppercase font-bold tracking-wider">
                  Total Payable
                </span>
                <span className="text-base font-bold text-olive font-sans">
                  ₹{grandTotal}
                </span>
              </div>
              <button
                type="button"
                id="footer-review-btn"
                onClick={() => handleNextToReview()}
                className="px-6 sm:px-8 py-3 bg-olive hover:bg-olive-dark text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Review Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs text-charcoal font-medium hover:text-olive flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                id="footer-payment-btn"
                onClick={handleNextToPayment}
                className="px-6 sm:px-8 py-3 bg-olive hover:bg-olive-dark text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-xs text-charcoal font-medium hover:text-olive flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                id="footer-placeorder-btn"
                onClick={handlePlaceOrder}
                className="px-6 sm:px-8 py-3 bg-olive hover:bg-olive-dark text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Place Demo Order (₹{grandTotal})</span>
              </button>
            </>
          )}

          {step === 4 && (
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3.5 bg-olive hover:bg-olive-dark text-cream-50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all shadow-md cursor-pointer"
            >
              Done & Return to Bakery Home
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
