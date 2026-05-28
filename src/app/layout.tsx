import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Factory of Culture Kernel",
  description: "Infrastructure for communities to operate and transmit their operational DNA."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
