"use client";

import { ArrowUpRight } from "lucide-react";

const collections = [
  {
    title: "Men",
    subtitle: "Refined everyday dressing",
    category: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900",
  },
  {
    title: "Women",
    subtitle: "Effortless expression",
    category: "Women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900",
  },
  {
    title: "Unisex",
    subtitle: "Style without boundaries",
    category: "Unisex",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=900",
  },
];

export default function Collections({ onSelectCategory }) {
  return (
    <section id="collections" className="px-6 py-16 md:px-12 lg:px-20 lg:py-24">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#926B70]">
            Explore VÉLORA
          </p>

          <h2 className="font-serif text-3xl text-[#48252F] md:text-5xl">
            Find your expression.
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-6 text-gray-500">
          Thoughtfully selected pieces for different styles, personalities and
          ways of expressing yourself.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {collections.map((collection) => (
          <button
            key={collection.category}
            onClick={() => onSelectCategory(collection.category)}
            className="group relative h-[420px] overflow-hidden text-left"
          >
            <img
              src={collection.image}
              alt={`${collection.title} fashion collection`}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white">
              <div>
                <h3 className="font-serif text-3xl">{collection.title}</h3>

                <p className="mt-2 text-sm text-white/80">
                  {collection.subtitle}
                </p>
              </div>

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 transition group-hover:bg-white group-hover:text-[#48252F]">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
