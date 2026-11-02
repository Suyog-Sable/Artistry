import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";
export const metadata: Metadata = { title: "Explore art" };
export default function Shop() {
  return (
    <div className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">Find a little something meaningful</span>
        <h1>
          Art for your walls.
          <br />
          <em>A story for your heart.</em>
        </h1>
        <p>
          Personalized portraits, little mirrors of light, and pieces with a
          sense of the sacred. Find the artwork that feels like you.
        </p>
      </div>
      <ShopGrid />
    </div>
  );
}
