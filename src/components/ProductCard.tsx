"use client";

import React from "react";
import Image from "next/image";
import { Heart, Plus, Minus, Check, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
  } = useCart();

  const isWishlisted = wishlist.includes(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantityInCart <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantityInCart - 1);
    }
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group cursor-pointer flex flex-col bg-cream-50 rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
        quantityInCart > 0
          ? "border-olive/30 shadow-md ring-1 ring-olive/20"
          : "border-charcoal/5 shadow-soft hover:shadow-lift"
      }`}
    >
      {/* Image Wrap */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-beige/30">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Top Badges: Category / Primary Benefit / In-Basket Indicator */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full bg-cream-100/90 backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase text-charcoal shadow-sm">
            {product.category}
          </span>
          {quantityInCart > 0 ? (
            <span className="px-2.5 py-1 rounded-full bg-olive text-cream-50 backdrop-blur-md text-[10px] font-bold shadow-md flex items-center gap-1 animate-in zoom-in-95 duration-200">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>{quantityInCart} in Basket</span>
            </span>
          ) : (
            product.tags[0] && (
              <span className="px-2 py-1 rounded-full bg-sage/90 backdrop-blur-md text-[10px] font-medium text-white shadow-sm">
                {product.tags[0]}
              </span>
            )
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={`Save ${product.name} to wishlist`}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream-100/90 backdrop-blur-md flex items-center justify-center text-charcoal hover:text-terracotta transition-colors shadow-sm z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-terracotta text-terracotta" : "text-charcoal/70"
            }`}
          />
        </button>

        {/* Subtle bottom weight tag */}
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-charcoal/70 backdrop-blur-sm text-cream-50 text-[10px] font-medium">
          {product.weight}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-xs font-semibold text-charcoal">{product.rating}</span>
            <span className="text-[11px] text-charcoal-muted">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-medium text-charcoal group-hover:text-olive transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {product.tagline}
          </p>

          {/* Clean Secondary Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(1, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-beige/50 text-[10px] text-charcoal-light font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Interactive Add / Quantity Stepper Footer */}
        <div className="mt-5 pt-4 border-t border-charcoal/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-wider text-charcoal-muted block">
              Price
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-charcoal font-sans">
                ₹{product.price}
              </span>
              {quantityInCart > 1 && (
                <span className="text-[11px] text-olive font-semibold font-sans">
                  (₹{product.price * quantityInCart})
                </span>
              )}
            </div>
          </div>

          {/* Interactive Stepper on Home Screen */}
          {quantityInCart === 0 ? (
            <button
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to basket`}
              className="group/btn inline-flex items-center gap-1.5 px-4 py-2 bg-sage hover:bg-olive text-cream-50 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-soft hover:shadow active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 p-1 bg-olive text-cream-50 rounded-full shadow-md animate-in zoom-in-90 duration-200 border border-olive-dark/20"
            >
              <button
                onClick={handleDecrement}
                aria-label={`Remove one ${product.name} from basket`}
                className="w-7 h-7 rounded-full bg-cream-100/20 hover:bg-cream-100 hover:text-charcoal flex items-center justify-center transition-all text-cream-50 active:scale-90 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-sans font-bold text-xs px-1 min-w-[18px] text-center text-cream-50 select-none">
                {quantityInCart}
              </span>
              <button
                onClick={handleIncrement}
                aria-label={`Add one more ${product.name} to basket`}
                className="w-7 h-7 rounded-full bg-cream-100/20 hover:bg-cream-100 hover:text-charcoal flex items-center justify-center transition-all text-cream-50 active:scale-90 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
