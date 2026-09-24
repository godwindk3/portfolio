import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <p className="eyebrow">404 / Page not found</p>
      <h1>This page isn’t here.</h1>
      <p>You can find my projects and contact details on the homepage.</p>
      <Link className="button" href="/">
        Back to the portfolio →
      </Link>
    </main>
  );
}
