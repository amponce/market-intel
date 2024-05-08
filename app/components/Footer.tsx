import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="font-semibold text-md text-center sm:text-left mb-4 sm:mb-0">
            All rights reserved. Copyright © 2024 rfpenergysolutions
          </p>

          <div className="flex items-center justify-center sm:justify-start">
            <span className="font-semibold text-md">Powered by</span>
            <Link href="https://outstatic.com/" passHref>
              <Image
                src="/favicon/mstile-150x150.png"
                alt="Outstatic"
                width={40}
                height={40}
                className="mt-2"
              />
            </Link>
            <p className="ml-2 mr-2">
              <Link href="https://rfpenergysolutions.com/privacy">
                Privacy Policy
              </Link>
            </p>
            <p className="ml-2">
              {" "}
              <Link href="https://rfpenergysolutions.com/terms">
                Terms of service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
