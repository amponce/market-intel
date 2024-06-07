import React from "react";
import { absoluteUrl } from "@/lib/utils";
import "@/styles/index.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://news.rfpenergysolutions.com/"),
  title: {
    default: "RFP Energy Solutions | Market Intel",
    template: "%s | RFP Energy Solutions",
  },
  description:
    "RFP Energy solutions market intel offers the latest news, insights, and analysis of energy products and trends.",
  openGraph: {
    title: "RFP Energy Solutions Market Intel",
    description:
      "RFP Energy solutions market intel. Get the latest news, insights, and analysis on energy projects, technologies, and trends.",
    url: absoluteUrl("/"),
    siteName: "news.rfpenergysolutions.com",
    images: [
      {
        url: absoluteUrl("/images/thumbnail-6.png"),
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon/favicon-32x32.png" }],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};
export default Layout;
