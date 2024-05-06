import Link from 'next/link';
import Image from 'next/image';

import Logo from '@/assets/logo.png';

const logoWidth = 410 * 0.75;
const logoHeight = 95 * 0.75;

const Header = () => {
  return (
    <div className="width-full bg-custom-yellow">
      <div className="max-w-6xl mx-auto px-5 ">
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <Image
              src={Logo}
              alt="Hazel Sprout"
              width={logoWidth}
              height={logoHeight}
            />
          </Link>
          <nav className="md:sticky md:top-0 layout flex items-center justify-between py-4">
            <ul className="flex items-center justify-between space-x-3 text-sm md:space-x-4 md:text-base ml-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="hidden md:block">
                <Link href="/#collections">Collections</Link>
              </li>
              <li>
                <Link href="/posts/">Posts</Link>
              </li>
              <li>
                <Link href="/details/about">About</Link>
              </li>
              <li>
                <Link href="/details/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;