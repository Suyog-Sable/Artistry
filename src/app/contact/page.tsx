import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Image,
  ClipboardCheck,
} from "lucide-react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { isWhatsAppConfigured } from "@/lib/whatsapp";
export const metadata: Metadata = { title: "Contact Artistry" };
export default function Contact() {
  return (
    <div className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">Every piece begins with a hello</span>
        <h1>
          Your memory.
          <br />
          <em>Our next conversation.</em>
        </h1>
        <p>
          A portrait for someone special? A little art for your home? Tell
          Artistry what you have in mind.
        </p>
      </div>
      <div className="contact-grid">
        <div className="contact-card">
          <MessageCircle size={36} strokeWidth={1} />
          <h2>Let’s talk art.</h2>
          <p>
            WhatsApp is where we’ll discuss your idea, confirm the details and
            help you get started.
          </p>
          <WhatsAppLink />
          {!isWhatsAppConfigured && (
            <p className="field-hint">
              WhatsApp ordering is not open yet. Artistry’s business number will
              be added here.
            </p>
          )}
        </div>
        <div className="contact-guidance">
          <span className="eyebrow">A little preparation helps</span>
          <div>
            <Image size={23} aria-hidden="true" />
            <div>
              <h3>Bring your inspiration</h3>
              <p>
                Have your reference photos ready to attach directly in WhatsApp.
                For Lippan art, bring along a colour or design idea.
              </p>
            </div>
          </div>
          <div>
            <ClipboardCheck size={23} />
            <div>
              <h3>Let’s confirm the details</h3>
              <p>
                Ask about frame options, custom requests, payment terms,
                delivery charges and timelines before ordering.
              </p>
            </div>
          </div>
          <Link href="/shop" className="text-link">
            Choose an artwork first
          </Link>
          <Link href="/faq" className="text-link">
            Read the FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}
