"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
const links = [
  ["Explore art", "/shop"],
  ["The gallery", "/gallery"],
  ["Our story", "/about"],
  ["FAQs", "/faq"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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
                aria-current={path === url ? "page" : undefined}
              >
                {text}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="header-contact">
            Let’s talk
          </Link>
          <button
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
                aria-current={path === url ? "page" : undefined}
              >
                {text}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}>
              Let’s create something
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
