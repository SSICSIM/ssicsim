import type { Metadata } from "next";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "SSICSIM 2026",
  description:
    "Canada's premier Model UN crisis simulation hosted by UofT students in Toronto.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
