import Image from "next/image"; // Import Image from Next.js
const BlogBanner = "/banners/blogBanner.jpg"; // Ensure this is the correct path to your image

const BlogHero: React.FC = () => {
  return (
    <div
      className="relative w-full overflow-hidden min-h-[450px]"
      style={{ height: "50vh" }}
    >
      {/* Set the height to half the viewport height */}
      <div className="absolute inset-0 z-0">
        {/* Position image absolutely to fill the parent */}
        <Image
          src={BlogBanner}
          alt="Blog Banner"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
      </div>
      <div className="relative z-10 flex justify-center items-center h-full">
        {/* Overlay and content container */}
        <div className="text-center px-4 py-2 bg-white bg-opacity-40 h-full w-full flex flex-col justify-center items-center">
          {/* Light white overlay with padding and flex column */}
          <h1 className="font-filson-pro text-4xl sm:text-4xl md:text-6xl font-bold text-black leading-tight mb-4">
            Posts
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
