"use client";
import { useState } from "react";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
export function ShopGrid() {
  const [category, setCategory] = useState<string>("All artwork");
  const filtered = products.filter(
    (p) => category === "All artwork" || p.category === category,
  );
  return (
    <>
      <div className="filter-bar">
        <div className="filters" aria-label="Filter artwork">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="results-count" aria-live="polite">
          {filtered.length} artworks
        </span>
      </div>
      <div className="product-grid">
        {filtered.map((p, index) => (
          <ProductCard key={p.slug} product={p} priority={index < 3} />
        ))}
      </div>
      <p className="image-note">
        A note on the artwork: these illustrations are temporary previews.
        Actual artwork photographs will be added by Artistry.
      </p>
    </>
  );
}
