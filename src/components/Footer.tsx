import Link from "next/link";
import { WhatsAppLink } from "./WhatsAppLink";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="wordmark" href="/">
              Artistry
            </Link>
            <p>Turning Memories Into Art.</p>
            <p className="footer-small">
              Personalized portraits. Handmade Lippan art.
              <br />
              Little pieces of you, made to keep.
            </p>
          </div>
          <div className="footer-links">
            <span className="eyebrow">Wander a little</span>
            <Link href="/shop">
              Explore art
            </Link>
            <Link href="/gallery">
              The gallery
            </Link>
            <Link href="/about">
              About the artist
            </Link>
            <Link href="/faq">
              FAQs
            </Link>
          </div>
          <div className="footer-chat">
            <span className="eyebrow">A thought. A memory. An idea.</span>
            <p>
              Every artwork starts
              <br />
              with a conversation.
            </p>
            <WhatsAppLink className="text-link" />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Artistry</span>
          <span>Art with a personal touch.</span>
          <Link href="/contact">
            Get in touch
          </Link>
        </div>
      </div>
    </footer>
  );
}
