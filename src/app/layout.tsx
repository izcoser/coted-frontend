import { Providers } from './providers'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oráculo do Tesouro",
  description: "Informação periódica da cotação de títulos públicos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
