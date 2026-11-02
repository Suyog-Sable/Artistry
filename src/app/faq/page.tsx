import type { Metadata } from "next";
import { FAQList } from "@/components/FAQList";
import { WhatsAppLink } from "@/components/WhatsAppLink";
export const metadata: Metadata = { title: "Frequently asked questions" };
export default function FAQ() {
  return (
    <div className="container page-section narrow-page">
      <div className="page-heading">
        <span className="eyebrow">A little clarity before we create</span>
        <h1>
          Good questions.
          <br />
          <em>Thoughtful answers.</em>
        </h1>
        <p>
          From choosing your portrait to sharing your first idea, here’s what
          you need to know.
        </p>
      </div>
      <FAQList />
      <div className="faq-contact">
        <h2>Something else on your mind?</h2>
        <p>Let’s talk it through.</p>
        <WhatsAppLink />
      </div>
    </div>
  );
}
