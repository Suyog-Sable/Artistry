import { Plus } from "lucide-react";
import { faqs } from "@/lib/catalog";
export function FAQList({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map(({ q, a }) => (
        <details key={q}>
          <summary>
            {q}
            <Plus size={19} />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
