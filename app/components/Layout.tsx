import React from "react";
import Footer from "./Footer";
import Script from "next/script"; // Ensure you import the Script component

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
        `}
      </Script>
      <div className="min-h-screen flex flex-col items-center">
        <main className="w-full bg-custom-yellow">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
