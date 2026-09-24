import type { Metadata } from "next";
import "@fontsource/be-vietnam-pro/latin-400.css";
import "@fontsource/be-vietnam-pro/latin-500.css";
import "@fontsource/be-vietnam-pro/latin-600.css";
import "@fontsource/be-vietnam-pro/vietnamese-400.css";
import "@fontsource/be-vietnam-pro/vietnamese-500.css";
import "@fontsource/be-vietnam-pro/vietnamese-600.css";
import "./globals.css";
import { Header, Footer } from "@/components/site";

export const metadata: Metadata = {
  title: {
    default: "Bùi Nguyên Phong — Building toward Data Engineering",
    template: "%s | Bùi Nguyên Phong",
  },
  description:
    "Personal engineering portfolio of Bùi Nguyên Phong. Learning and building data systems with Python, SQL, and PostgreSQL. Explore the JobLake engineering case study.",
  openGraph: {
    title: "Bùi Nguyên Phong — Data Engineering Portfolio",
    description:
      "Hands-on projects, data systems, and the engineering decisions behind JobLake.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
