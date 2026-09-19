import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import SmoothScroll from "../components/SmoothScroll";
import Toast from "../components/Toast";
import CartDrawer from "../components/CartDrawer";
import ProductModal from "../components/ProductModal";
import CheckoutModal from "../components/CheckoutModal";
import SearchModal from "../components/SearchModal";
import WishlistDrawer from "../components/WishlistDrawer";
import MobileBottomBar from "../components/MobileBottomBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HealthyMakes — Goodness, Baked Naturally | Hyderabad Home Bakery",
  description:
    "Wholesome cookies, healthy snacks and sweet treats made with real ingredients, right from our home kitchen in Hyderabad. Small batch, clean ingredients, no refined sugar.",
  keywords: [
    "Healthy cookies Hyderabad",
    "home bakery Hyderabad",
    "millet cookies",
    "healthy snacks Hyderabad",
    "no maida cookies",
    "eggless healthy cupcakes",
    "granola bars Hyderabad"
  ],
  openGraph: {
    title: "HealthyMakes — Wholesome Home Bakery Hyderabad",
    description: "Goodness, baked naturally. Freshly baked in small batches in Hyderabad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${caveat.variable}`}
    >
      <body className="bg-cream-100 text-charcoal font-sans antialiased selection:bg-sage selection:text-white">
        <CartProvider>
          <SmoothScroll>
            {children}
            <Toast />
            <CartDrawer />
            <ProductModal />
            <CheckoutModal />
            <SearchModal />
            <WishlistDrawer />
            <MobileBottomBar />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
