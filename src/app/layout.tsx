import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rucher360",
  description: "Cockpit apicole modulaire pour organisations et ruchers"
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
