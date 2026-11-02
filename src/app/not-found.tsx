import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page-section not-found">
      <span className="eyebrow">A little off the canvas</span>
      <h1>
        This page is
        <br />
        <em>still a blank canvas.</em>
      </h1>
      <p>Let’s find you something meaningful in the collection.</p>
      <Link href="/shop" className="button">
        Explore art
      </Link>
    </div>
  );
}
