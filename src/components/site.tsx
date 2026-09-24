import Link from "next/link";
import { portfolio } from "@/content/portfolio";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          className="brand"
          href="/"
          aria-label={`${portfolio.name} — home`}
        >
          <span className="monogram">
            {portfolio.initials}
            <span>.</span>
          </span>
          <span className="brand-name">{portfolio.name}</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">
            Contact <Arrow diagonal />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="container site-footer">
      <span>
        © {new Date().getFullYear()} {portfolio.name}
      </span>
      <span>Built with care. Still learning.</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}

export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      {children}
    </div>
  );
}
