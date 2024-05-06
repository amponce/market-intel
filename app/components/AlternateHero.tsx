import Image from "next/image"; // Import Image from Next.js
const HomeBanner = "/banners/homeBanner.jpg"; // Ensure this is the correct path to your image

const Hero: React.FC = () => {
  return (
    <div
      className="relative w-full overflow-hidden min-h-[450px]"
      style={{ height: "50vh" }}
    >
      {/* Set the height to half the viewport height */}
      <div className="absolute inset-0 z-0">
        {/* Position image absolutely to fill the parent */}
        <Image
          src={HomeBanner}
          alt="Home Banner"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
      </div>
      <div className="relative z-10 flex justify-center items-center h-full">
        {/* Overlay and content container */}
        <div className="text-center bg-black bg-opacity-40 px-4 py-2 h-full w-full flex flex-col justify-center items-center">
          {/* Light white overlay with padding and flex column */}
          <h1 className="font-filson-pro text-4xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Baby &amp; toddler essentials.
          </h1>
          <p className="font-filson-pro text-2xl sm:text-xl md:text-5xl text-white">
            Perfectly curated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
