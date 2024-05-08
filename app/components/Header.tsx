import Link from "next/link";
import Image from "next/image";

const logo = "/images/logo.png";
const logoWidth = 410 * 0.4;
const logoHeight = 95 * 0.4;

const Header = () => {
  return (
    <div className="width-full bg-custom-yellow">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <Image
              src={logo}
              alt="RFP Energy Solutions"
              width={logoWidth}
              height={logoHeight}
            />
          </Link>
          <nav className="md:sticky md:top-0 layout flex items-center">
            <ul className="flex items-center space-x-6 text-base md:text-lg">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/details/about"
                  className="hover:text-gray-600 transition duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/details/energy"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Market
                </Link>
              </li>
              <li>
                <Link
                  href="/details/contact"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Contact
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="https://rfpenergysolutions.com/"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Platform
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
