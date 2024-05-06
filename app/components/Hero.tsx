import Image from "next/image"; // Import Next.js Image
import HomeBanner from "/banners/homeBanner.jpg";
import Link from "next/link";

const heroContent = {
  title: "Handpicked products for your little ones",
  content1:
    "Featuring curated collections of thoughtfully designed baby essentials; shop better with Hazel Sprout.",
  content2: "Find what you need here and buy on Amazon.",
  cta: "See the latest collections",
};

const Hero: React.FC = () => {
  return (
    <div className="relative bg-custom-dark-teal">
      <div className="mx-auto max-w-6xl">
        <div className="relative z-10 pt-10 lg:w-full lg:max-w-2xl">
          {/* SVG part */}
          <svg
            className="absolute inset-y-0 right-16 hidden h-full w-80 translate-x-1/2 transform fill-[#1d6169] lg:block" // changed right-8 to right-16
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>
          {/* End SVG */}
          <div className="relative px-6 py-24 sm:py-24 lg:px-8 lg:py-32 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <h1 className="font-filson-pro text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                {heroContent?.title}
              </h1>
              <p className="mt-6 text-2xl leading-8 font-light text-white">
                {heroContent?.content1}
              </p>
              <p className="font-filson-pro mt-8 text-2xl leading-8 font-light text-white">
                {heroContent?.content2}
              </p>
              <p className="mt-8 text-2xl font-light underline leading-8 text-white">
                <Link href="/#collections" className="hover:underline">
                  {heroContent.cta}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        {/* Using Next.js Image */}
        <div className="hidden lg:block lg:h-full lg:w-full object-left relative">
          <Image
            src={HomeBanner}
            alt="Home Banner"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
