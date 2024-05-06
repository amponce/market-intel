import React from "react";
import { Product } from "../app/products/[slug]/page";

export const AmazonEvent = ({ product }: { product: Product }) => {
  const trackAmazonClick = (productName: string) => {
    if (window.gtag) {
      window.gtag("event", "amazon_click", {
        event_category: "Product Links",
        event_label: productName,
        value: 1,
      });
    }
  };

  return (
    <a
      href={product.productLink}
      target="_blank"
      rel="noopener noreferrer"
      className="your-class-names"
      onClick={() => trackAmazonClick(product.title)}
    >
      Get on Amazon
    </a>
  );
};
