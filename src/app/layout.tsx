import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rucher360",
  description: "Socle applicatif Rucher360"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
