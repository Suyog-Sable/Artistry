import Image from "next/image";
import type { Product } from "@/lib/catalog";
export function Artwork({
  product,
  priority = false,
  className = "",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`artwork ${product.tone} ${className}`}>
      <Image
        src={product.image}
        alt={`Illustrative placeholder for ${product.description}; not a finished Artistry artwork`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
        priority={priority}
      />
      <span className="preview-label">Illustrative preview</span>
    </div>
  );
}
