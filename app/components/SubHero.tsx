import Image from "next/image"; // Import Image from Next.js
const defaultBanner = "/banners/aboutBanner-lg.jpg";
interface SubHeroProps {
  title?: string;
  coverImage?: string;
  alt?: string;
}
const SubHero: React.FC<SubHeroProps> = ({ title, coverImage, alt }) => {
  return (
    <div
      className="relative w-full overflow-hidden min-h-[450px]"
      style={{ height: "50vh" }}
    >
      {/* Set the height to half the viewport height */}
      <div className="absolute inset-0 z-0">
        {/* Position image absolutely to fill the parent */}
        <Image
          src={coverImage || defaultBanner}
          alt={alt || ""}
          fill
          className="imageStyle"
          quality={100}
          priority
        />
      </div>
      <div className="relative z-10 flex justify-center items-center h-full">
        {/* Overlay and content container */}
        <div className="text-center bg-black bg-opacity-40 px-4 py-2 h-full w-full flex flex-col justify-center items-center">
          {/* Light white overlay with padding and flex column */}
          <h1 className="font-filson-pro text-4xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SubHero;
