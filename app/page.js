"use client";

import { useState } from "react";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import ProductSection from "./components/productsection";
import Cart from "./components/cart";
import AIStylist from "./components/aistylist";
import Footer from "./components/footer";

import { products } from "./data/products";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Navigation */}
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      {/* Hero */}
      <Hero />

      {/* Shop */}
      <ProductSection
        products={products}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onAddToCart={addToCart}
      />

      {/* Footer */}
      <Footer />

      {/* Shopping Cart */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        setCart={setCart}
      />

      {/* AI Stylist */}
      <AIStylist products={products} onAddToCart={addToCart} />
    </main>
  );
}
