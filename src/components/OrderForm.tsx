"use client";
import { useState } from "react";
import { Check, MessageCircle, Info } from "lucide-react";
import { money, products, type Product } from "@/lib/catalog";
import { WhatsAppLink } from "./WhatsAppLink";
export function OrderForm({ product }: { product: Product }) {
  const [people, setPeople] = useState(String(product.people || 2));
  const [size, setSize] = useState("A4");
  const [frame, setFrame] = useState("Please show me frame options");
  const [colour, setColour] = useState("As discussed with the artist");
  const [design, setDesign] = useState("Discuss the design with the artist");
  const [notes, setNotes] = useState("");
  const portraits = Boolean(product.people);
  const numeric = Number(people);
  const price = portraits
    ? (products.find((p) => p.people === (numeric >= 6 ? 6 : numeric))?.price ??
      null)
    : product.price;
  const message = [
    `Hello Artistry! I’m interested in ${product.name}.`,
    portraits
      ? `Number of people: ${people === "11" ? "11 or more" : people}\nPortrait size: ${size}\nFrame preference: ${frame}`
      : `Artwork: ${product.description}\nColour request: ${colour}\nDesign request: ${design}`,
    `Listed artwork price: ${price === null ? "Quote required" : money(price)}${portraits ? " + frame charges" : ""}.`,
    portraits
      ? "Please confirm size-related charges, frame price, delivery charges and the final total. I will attach my reference photographs here in WhatsApp."
      : "Please confirm the requested customization, any additional charges, artwork dimensions, delivery charges and the final total.",
    notes ? `Additional requests: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
  return (
    <form className="order-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-heading">
        <span className="eyebrow">Make it yours</span>
        <span>
          <Check size={14} /> Personal by design
        </span>
      </div>
      {portraits ? (
        <>
          <label htmlFor="people">Number of people</label>
          <select
            id="people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person" : "people"}
                {[1, 3, 5].includes(n) ? " · request a quote" : ""}
              </option>
            ))}
            <option value="11">11 or more people</option>
          </select>
          <fieldset>
            <legend>Portrait size</legend>
            <div className="choice-row">
              {["A4", "A3", "A2"].map((s) => (
                <label
                  className={size === s ? "choice selected" : "choice"}
                  key={s}
                >
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={() => setSize(s)}
                  />
                  <span>{s}</span>
                  <small>
                    {s === "A4"
                      ? "21 × 29.7 cm"
                      : s === "A3"
                        ? "29.7 × 42 cm"
                        : "42 × 59.4 cm"}
                  </small>
                </label>
              ))}
            </div>
          </fieldset>
          <label htmlFor="frame">Frame preference</label>
          <select
            id="frame"
            value={frame}
            onChange={(e) => setFrame(e.target.value)}
          >
            <option>Please show me frame options</option>
            <option>With a frame · price to be confirmed</option>
            <option>Without a frame · confirm availability</option>
          </select>
          <p className="field-hint">
            Frame options and size-related charges are confirmed on WhatsApp.
          </p>
        </>
      ) : (
        <>
          <label htmlFor="artwork">Artwork selection</label>
          <select id="artwork" defaultValue={product.name}>
            <option>{product.name}</option>
          </select>
          <label htmlFor="colour">Colour preference</label>
          <select
            id="colour"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
          >
            <option>As discussed with the artist</option>
            <option>Warm neutrals · request</option>
            <option>Terracotta tones · request</option>
            <option>Sage tones · request</option>
            <option>My own palette · describe below</option>
          </select>
          <label htmlFor="design">Design preference</label>
          <select
            id="design"
            value={design}
            onChange={(e) => setDesign(e.target.value)}
          >
            <option>Discuss the design with the artist</option>
            <option>
              {portraits
                ? "Personal design"
                : product.category === "Sacred art"
                  ? "God-themed design · describe below"
                  : "Geometric mirror pattern · request"}
            </option>
            <option>My own idea · describe below</option>
          </select>
          <p className="field-hint">
            These are requests, subject to artist confirmation.{" "}
            {product.size
              ? `Listed size: ${product.size}.`
              : "Dimensions will be confirmed with the artist."}
          </p>
        </>
      )}
      <label htmlFor="notes">
        A little more about your idea <span>(optional)</span>
      </label>
      <textarea
        id="notes"
        maxLength={1200}
        rows={3}
        placeholder={
          portraits
            ? "An occasion, a detail, something meaningful…"
            : "Your colour palette, preferred deity or design idea…"
        }
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="price-breakdown">
        <div>
          <span>Artwork price</span>
          <strong>{price === null ? "Quote required" : money(price)}</strong>
        </div>
        {portraits && (
          <div>
            <span>Frame charges</span>
            <span>Confirmed by artist</span>
          </div>
        )}
        <div>
          <span>
            {portraits ? "Size changes & delivery" : "Customization & delivery"}
          </span>
          <span>Confirmed by artist</span>
        </div>
        <div className="price-total">
          <span>Listed artwork subtotal</span>
          <strong aria-live="polite">
            {price === null ? "Request a quote" : money(price)}
          </strong>
        </div>
        <p>
          <Info size={14} /> This is not a final total. Additional charges and
          availability will be agreed on WhatsApp before you order.
        </p>
      </div>
      <div className="order-action">
        <WhatsAppLink message={message}>Discuss on WhatsApp</WhatsAppLink>
        <p>
          <MessageCircle size={13} />
          {portraits
            ? "Share reference photos in the WhatsApp chat."
            : "Confirm your design directly with the artist."}
        </p>
      </div>
    </form>
  );
}
