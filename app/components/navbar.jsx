"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-[#48252F] px-4 py-2 text-center text-xs tracking-[0.2em] text-[#FAF8F5]">
        CONTEMPORARY STYLE. WITHOUT BOUNDARIES.
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e9e2dc] bg-[#FAF8F5]/95 backdrop-blur-md">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-xs tracking-[0.18em] text-[#292421] transition hover:text-[#926B70]"
            >
              HOME
            </Link>

            <a
              href="#shop"
              className="text-xs tracking-[0.18em] text-[#292421] transition hover:text-[#926B70]"
            >
              SHOP
            </a>
          </div>

          {/* VÉLORA wordmark only */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-3xl tracking-[0.16em] text-[#48252F] md:text-4xl"
          >
            VÉLORA
          </Link>

          {/* Cart and mobile menu */}
          <div className="ml-auto flex items-center gap-5">
            <button
              onClick={onOpenCart}
              aria-label="Open shopping bag"
              className="relative text-[#292421] transition hover:text-[#926B70]"
            >
              <ShoppingBag size={21} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#48252F] text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="text-[#292421] md:hidden"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t border-[#e9e2dc] bg-[#FAF8F5] px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-xs tracking-[0.18em] text-[#292421]"
              >
                HOME
              </Link>

              <a
                href="#shop"
                onClick={() => setMenuOpen(false)}
                className="text-xs tracking-[0.18em] text-[#292421]"
              >
                SHOP
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
