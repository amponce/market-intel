import Link from "next/link";
import Image from "next/image";

const logo = "/images/logo.png";

const logoWidth = 410 * 0.4;
const logoHeight = 95 * 0.4;

const Header = () => {
  return (
    <div className="width-full bg-custom-yellow">
      <div className="max-w-6xl mx-auto px-5 ">
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <Image
              src={logo}
              alt="RFP Energy Solutions"
              width={logoWidth}
              height={logoHeight}
            />
          </Link>
          <nav className="md:sticky md:top-0 layout flex items-center justify-between py-4">
            <ul className="flex items-center justify-between space-x-3 text-sm md:space-x-4 md:text-lg ml-4">
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/details/about">About</Link>
              </li>
              <li>
                <Link href="/details/energy">Trends</Link>
              </li>
              <li>
                <Link href="/details/contact">Contact</Link>
              </li>
              <li className="hidden md:block">
                <Link href="https://rfpenergysolutions.com/support">
                  Support
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
