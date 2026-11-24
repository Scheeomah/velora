"use client";

import { Heart, ShoppingBag } from "lucide-react";

const filters = [
  "All",
  "Men",
  "Women",
  "Unisex",
  "Dresses",
  "Ready to Wear",
  "Co-ords",
  "Essentials",
  "Accessories",
];

export default function ProductSection({
  products,
  activeCategory,
  setActiveCategory,
  onAddToCart,
}) {
  const filteredProducts = products.filter((product) => {
    if (activeCategory === "All") return true;

    if (["Men", "Women", "Unisex"].includes(activeCategory)) {
      return product.audience === activeCategory;
    }

    return product.category === activeCategory;
  });

  const formatPrice = (price) => `₦${Number(price).toLocaleString("en-NG")}`;

  return (
    <section id="shop" className="px-6 py-16 md:px-12 lg:px-20 lg:py-24">
      <div className="mb-10">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#926B70]">
          The VÉLORA Edit
        </p>

        <h2 className="font-serif text-3xl text-[#48252F] md:text-5xl">
          Discover your next favourite.
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500">
          Explore thoughtfully selected fashion and accessories for every style
          and personality.
        </p>
      </div>

      {/* Filters */}

      <div className="mb-10 flex gap-3 overflow-x-auto pb-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveCategory(filter)}
            className={`shrink-0 border px-5 py-3 text-xs uppercase tracking-wider transition ${
              activeCategory === filter
                ? "border-[#48252F] bg-[#48252F] text-white"
                : "border-[#DED5D0] text-[#48252F] hover:border-[#48252F]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="mb-6 text-xs text-gray-500">
        Showing {filteredProducts.length} products
      </p>

      {/* Product Grid */}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[#F0ECE7]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {product.tag && (
                  <span className="absolute left-2 top-2 bg-[#FAF8F5] px-2 py-2 text-[9px] uppercase tracking-wider text-[#48252F] md:left-3">
                    {product.tag}
                  </span>
                )}

                <button
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#48252F] transition hover:bg-[#48252F] hover:text-white"
                >
                  <Heart size={17} />
                </button>
              </div>

              <div>
                <p className="mb-2 text-[9px] uppercase tracking-widest text-[#926B70]">
                  {product.audience} · {product.category}
                </p>

                <h3 className="text-sm font-medium text-[#292421]">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm font-semibold text-[#48252F]">
                  {formatPrice(product.price)}
                </p>

                <p className="mt-1 text-xs text-gray-500">{product.color}</p>

                <button
                  onClick={() => onAddToCart(product)}
                  className="mt-4 flex w-full items-center justify-center gap-2 bg-[#48252F] px-3 py-3 text-[10px] font-semibold uppercase tracking-widest text-white transition hover:bg-[#68404A]"
                >
                  <ShoppingBag size={15} />
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h3 className="font-serif text-2xl text-[#48252F]">
            Nothing here just yet.
          </h3>

          <p className="mt-3 text-sm text-gray-500">
            Try another collection to discover more pieces.
          </p>

          <button
            onClick={() => setActiveCategory("All")}
            className="mt-6 border border-[#48252F] px-6 py-3 text-xs uppercase tracking-widest text-[#48252F]"
          >
            View All Products
          </button>
        </div>
      )}
    </section>
  );
}
