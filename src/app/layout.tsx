import { Providers } from "./providers";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import "highlight.js/styles/github.min.css";

export const metadata: Metadata = {
  title: "Oráculo do Tesouro",
  description: "Informação periódica da cotação de títulos públicos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
