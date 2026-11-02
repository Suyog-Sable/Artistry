"use client";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useState } from "react";
import { whatsappUrl, generalMessage } from "@/lib/whatsapp";
export function WhatsAppLink({
  message = generalMessage,
  children = "Let’s talk on WhatsApp",
  className = "button",
}: {
  message?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const [notice, setNotice] = useState(false);
  const href = whatsappUrl(message);
  return (
    <div className="whatsapp-wrap">
      {href ? (
        <a
          className={className}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <span>{children}</span>
        </a>
      ) : (
        <button
          type="button"
          className={className}
          onClick={() => setNotice(!notice)}
          aria-expanded={notice}
        >
          <WhatsAppIcon />
          <span>{children}</span>
        </button>
      )}
      {notice && (
        <p className="config-notice" role="status">
          WhatsApp ordering will open here once Artistry adds its business
          number. Orders are not being accepted through this preview yet.
        </p>
      )}
    </div>
  );
}
