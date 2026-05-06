import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apollo Resources Group",
  description: "Strategic capital, resources, commodities trading and industrial technologies across Central Asia, CIS and the Middle East.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
