import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/catalog";
import { Artwork } from "@/components/Artwork";
export const metadata: Metadata = { title: "The gallery" };
export default function Gallery() {
  return (
    <div className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">A space for little inspirations</span>
        <h1>
          Different stories.
          <br />
          <em>The same heart.</em>
        </h1>
        <p>A glimpse of the kinds of pieces you can explore with Artistry.</p>
      </div>
      <div className="gallery-notice">
        This is an illustrative preview gallery. These temporary illustrations
        are not photographs of completed commissions. Original Artistry artwork
        will be added here.
      </div>
      <div className="gallery-grid">
        {[products[3], products[0], products[4], products[1], products[2]].map(
          (p, i) => (
            <Link
              href={`/shop/${p.slug}`}
              key={p.slug}
              className={`gallery-item gallery-${i}`}
            >
              <Artwork product={p} priority={i < 2} />
              <div>
                <div>
                  <small>{p.category}</small>
                  <h2>{p.name}</h2>
                </div>
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
