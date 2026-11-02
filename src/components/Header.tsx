"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Instagram, Menu, X } from "lucide-react";
import { WhatsAppLink } from "./WhatsAppLink";
const instagramUrl =
  "https://www.instagram.com/mee_artistry949?psln=MXQxaTAwMWhveXdrZQ==";

function InstagramLink() {
  return (
    <a
      className="header-instagram"
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Artistry on Instagram (@mee_artistry949)"
    >
      <Instagram size={21} strokeWidth={1.7} aria-hidden="true" />
    </a>
  );
}
const links = [
  ["Explore art", "/shop"],
  ["The gallery", "/gallery"],
  ["Our story", "/about"],
  ["FAQs", "/faq"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const isCurrent = (url: string) =>
    path === url || (url === "/shop" && path.startsWith("/shop/"));
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link
            href="/"
            className="wordmark"
            aria-label="Artistry home"
            onClick={() => setOpen(false)}
          >
            Artistry
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([text, url]) => (
              <Link
                key={url}
                href={url}
                aria-current={isCurrent(url) ? "page" : undefined}
              >
                {text}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <InstagramLink />
            <WhatsAppLink className="header-contact">Let’s talk</WhatsAppLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="mobile-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {links.map(([text, url]) => (
              <Link
                key={url}
                href={url}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(url) ? "page" : undefined}
              >
                {text}
              </Link>
            ))}
            <div className="mobile-social-actions">
              <InstagramLink />
              <WhatsAppLink
                className="header-contact"
                onClick={() => setOpen(false)}
              >
                Let’s talk
              </WhatsAppLink>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
