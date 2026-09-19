"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  email: string;
  houseFlat: string;
  streetArea: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  deliveryDate: string;
  deliveryNotes: string;
  paymentMethod: 'upi' | 'card' | 'cod';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  amountToFreeDelivery: number;
  grandTotal: number;
  
  // UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  
  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Toast / feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
  cartBump: boolean;

  // Last completed order
  lastOrder: {
    orderId: string;
    details: CheckoutDetails;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    createdAt: string;
  } | null;
  setLastOrder: React.Dispatch<React.SetStateAction<any>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 499;
const HYDERABAD_DELIVERY_FEE = 60;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartBump, setCartBump] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("healthymakes_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("healthymakes_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Failed to load stored cart/wishlist", e);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem("healthymakes_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("healthymakes_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const triggerCartBump = () => {
    setCartBump(true);
    setTimeout(() => setCartBump(false), 400);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    triggerCartBump();
    showToast(`Added "${product.name}" to your basket.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        showToast(`Removed "${item.product.name}" from your basket.`);
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast("Removed from your saved favourites.");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to your favourites ♡");
        return [...prev, productId];
      }
    });
  };

  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const deliveryFee =
    subtotal === 0 ? 0 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : HYDERABAD_DELIVERY_FEE;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const grandTotal = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountToFreeDelivery,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
        cartBump,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
