import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Artwork } from "@/components/Artwork";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export default function Home() {
  return (
    <div className="boutique-home">
      <section className="quiet-hero container">
        <div className="quiet-hero-copy">
          <span className="eyebrow">Personal portraits & handmade art</span>
          <h1>
            Memories made
            <br />
            to stay.
          </h1>
          <p>Turning Memories Into Art.</p>
          <p className="hero-intro">
            Personalized portraits and handmade pieces,
            <br /> for the people and places you love.
          </p>
          <div className="hero-buttons">
            <Link href="/shop" className="button">
              Explore the collection
            </Link>
            <Link
              href="/shop/two-person-portrait"
              className="button button-outline"
            >
              Create your portrait
            </Link>
          </div>
        </div>
        <div className="quiet-hero-art">
          <Image
            src="/art/lippan.svg"
            alt="Illustrative placeholder of handmade floral Lippan art"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 480px"
          />
          <span className="preview-label">Illustrative preview</span>
        </div>
      </section>
      <section className="container quiet-section">
        <div className="quiet-heading">
          <h2>
            A few favourites{" "}
            <Heart aria-hidden="true" size={23} strokeWidth={1.2} />
          </h2>
          <Link className="text-link" href="/shop">
            View all
          </Link>
        </div>
        <div className="product-grid quiet-collection">
          {[
            products[0],
            products[3],
            products[4],
            products[1],
            products[2],
          ].map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <section className="container quiet-story quiet-section">
        <div className="quiet-story-art">
          <Image
            src="/art/studio.svg"
            alt="Illustrative placeholder of an artist’s workspace"
            fill
            sizes="(max-width: 760px) 100vw, 460px"
          />
          <span className="preview-label">
            Studio illustration · placeholder
          </span>
        </div>
        <div className="quiet-story-copy">
          <span className="eyebrow">Our story</span>
          <h2>
            Handmade.{" "}
            <br />
            Heartfelt. Yours.
          </h2>
          <p>
            A familiar face, a shared memory, a quiet corner of home. Artistry
            brings what matters to you into focus through personalized portraits
            and handmade Lippan art.
          </p>
          <Link href="/about" className="text-link">
            Meet Artistry
          </Link>
        </div>
      </section>
      <section className="container quiet-section">
        <div className="quiet-heading">
          <div>
            <h2>
              Made with meaning{" "}
              <Heart aria-hidden="true" size={23} strokeWidth={1.2} />
            </h2>
            <p>A little inspiration for your walls.</p>
          </div>
          <Link className="text-link" href="/gallery">
            The gallery
          </Link>
        </div>
        <div className="home-mosaic">
          {[
            products[0],
            products[3],
            products[4],
            products[1],
            products[2],
          ].map((p, i) => (
            <Link
              href={`/shop/${p.slug}`}
              className={`mosaic-piece mosaic-piece-${i}`}
              key={p.slug}
              aria-label={`Explore ${p.name}`}
            >
              <Artwork product={p} />
            </Link>
          ))}
        </div>
        <p className="gallery-disclaimer">
          Illustrative previews. Original Artistry artwork photographs are
          coming soon.
        </p>
      </section>
      <section className="container quiet-section">
        <div className="quiet-heading">
          <h2>How to order</h2>
        </div>
        <div className="quiet-steps">
          {[
            [
              "Choose your piece",
              "Find a portrait, Lippan artwork or God-themed design that speaks to you.",
            ],
            [
              "Make it personal",
              "Choose your preferences. Share reference photos directly in WhatsApp.",
            ],
            [
              "Talk to the artist",
              "Confirm your design, final quote and delivery details before ordering.",
            ],
          ].map(([title, text], i) => (
            <div key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container quiet-section">
        <div className="quiet-order-note">
          <div>
            <h2>A little note before we create</h2>
            <p>
              Portraits start at ₹{products[0].price}, with frame charges extra.
              Handmade six-inch Lippan art is ₹{products[3].price}; God-themed
              Lippan art is ₹{products[4].price.toLocaleString("en-IN")}.
            </p>
            <p>
              Frame options, custom requests, production timelines and delivery
              charges are confirmed directly with the artist.
            </p>
          </div>
          <div>
            <h3>Have a memory in mind?</h3>
            <p>Tell us what you’d love to create.</p>
            <WhatsAppLink className="text-link">
              Start a conversation
            </WhatsAppLink>
            <Link href="/faq" className="quiet-faq-link">
              Questions? Read the FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
