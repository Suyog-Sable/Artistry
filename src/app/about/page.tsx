import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Sparkles, PenTool } from "lucide-react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
export const metadata: Metadata = { title: "About the artist" };
export default function About() {
  return (
    <div className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">The heart behind Artistry</span>
        <h1>
          Made by hand.
          <br />
          <em>Kept by heart.</em>
        </h1>
        <p>Turning Memories Into Art.</p>
      </div>
      <div className="about-grid">
        <div className="about-image">
          <Image
            src="/art/studio.svg"
            priority
            alt="Temporary illustration of an artist’s workspace; artist photograph pending"
            fill
            sizes="(max-width:760px) 100vw, 50vw"
          />
          <span className="preview-label">
            Studio illustration · placeholder
          </span>
        </div>
        <div className="about-copy">
          <span className="eyebrow">Our story, still unfolding</span>
          <h2>
            For the things
            <br />
            that <em>mean something.</em>
          </h2>
          <p>
            Artistry is a handmade art brand bringing together personalized
            portraits, Lippan art and God-themed decorative artwork.
          </p>
          <p>
            At its heart is a simple idea: the memories, people and moments you
            love can become part of the spaces you live in.
          </p>
          <p>
            Start with a photograph, a colour, or a thought. Explore a piece,
            share what you have in mind, and work through the details directly
            with the artist.
          </p>
          <div className="editorial-note">
            A personal introduction from the artist, their name and studio
            photographs will be shared here once supplied.
          </div>
          <WhatsAppLink>Say hello to Artistry</WhatsAppLink>
        </div>
      </div>
      <div className="values-grid">
        {[
          {
            Icon: Heart,
            title: "Personal at heart",
            text: "Art that begins with the people, memories and ideas you bring.",
          },
          {
            Icon: PenTool,
            title: "The handmade touch",
            text: "Lippan pieces and decorative artwork with a human touch.",
          },
          {
            Icon: Sparkles,
            title: "A meaningful connection",
            text: "A direct conversation about your design, preferences and final quote.",
          },
        ].map(({ Icon, title, text }) => (
          <div key={title}>
            <Icon size={27} strokeWidth={1} />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
