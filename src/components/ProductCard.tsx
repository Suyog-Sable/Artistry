import Link from "next/link";
import { money, type Product } from "@/lib/catalog";
import { Artwork } from "./Artwork";
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link className="product-card" href={`/shop/${product.slug}`}>
      <Artwork product={product} priority={priority} />
      <div className="product-meta">
        <span>{product.category}</span>
        <span>{product.people ? "Made personal" : "Made by hand"}</span>
      </div>
      <div className="product-title">
        <h3>{product.name}</h3>
      </div>
      <p>{product.description}</p>
      <div className="product-price">
        {money(product.price)}{" "}
        <span>
          {product.people
            ? "+ frame charges"
            : product.size
              ? `/ ${product.size}`
              : " / artwork"}
        </span>
      </div>
    </Link>
  );
}
