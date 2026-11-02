import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, PenTool } from "lucide-react";
import { products, money } from "@/lib/catalog";
import { Artwork } from "@/components/Artwork";
import { OrderForm } from "@/components/OrderForm";
import { ProductCard } from "@/components/ProductCard";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return { title: p?.name || "Artwork not found", description: p?.detail };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return (
    <div className="container product-page">
      <Link href="/shop" className="back-link">
        <ArrowLeft size={15} /> Back to the collection
      </Link>
      <div className="product-detail">
        <div className="product-gallery">
          <Artwork product={product} priority />
          <p className="image-note">
            Illustrative placeholder. Final artwork photographs are awaiting
            upload. Discuss the actual design with the artist.
          </p>
          <div className="product-promises">
            <span>
              <PenTool size={17} />{" "}
              {product.people ? "Personalized for you" : "Handmade with care"}
            </span>
            <span>
              <Heart size={17} /> Made to mean something
            </span>
          </div>
        </div>
        <div className="product-info">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-description">{product.detail}</p>
          <div className="detail-price">
            {money(product.price)}
            <span>
              {product.people
                ? "+ frame charges"
                : product.size
                  ? ` / ${product.size}`
                  : " / artwork"}
            </span>
          </div>
          <OrderForm product={product} />
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A little more to fall for</span>
            <h2>Keep exploring.</h2>
          </div>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.slug !== slug)
            .slice(0, 3)
            .map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
        </div>
      </section>
    </div>
  );
}
