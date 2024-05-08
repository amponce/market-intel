import type { OstDocument } from "outstatic";
import Link from "next/link";
import DateFormatter from "./DateFormatter";
import Image from "next/image";
const thumbnailPaths = [
  "/images/thumbnail-1.png",
  "/images/thumbnail-2.png",
  "/images/thumbnail-3.png",
  "/images/thumbnail-4.png",
  "/images/thumbnail-5.png",
  "/images/thumbnail-6.png",
  "/images/thumbnail-7.png",
];

let currentIndex = 0;

function getNextThumbnailPath() {
  const thumbnailPath = thumbnailPaths[currentIndex];
  currentIndex = (currentIndex + 1) % thumbnailPaths.length; // Ensures looping back to the start
  return thumbnailPath;
}

export type Item = {
  tags?: { value: string; label: string }[];
  productLink?: string; // Optional based on your schema
  itemPrice?: number; // Optional based on your schema
} & OstDocument;

type Props = {
  collection: "posts";
  title?: string;
  items: Item[];
  priority?: boolean;
};

const ContentGrid = ({ title = "More", items, collection }: Props) => {
  return (
    <section id={collection}>
      <h2 className="mb-8 mt-0 text-lg mb-2 leading-snug font-semibold hover:underline">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 sm:gap-x-6 lg:gap-x-8 sm:gap-y-6 lg:gap-y-8 mb-8">
        {items.map((item) => (
          <Link
            key={item.slug}
            as={`/${collection}/${item.slug}`}
            href={`/${collection}/[slug]`}
          >
            <div
              className={`cursor-pointer project-card aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 transition duration-100 motion-reduce:hover:scale-100 overflow-hidden relative group `}
            >
              <div className="p-2 relative">
                <Image
                  src={getNextThumbnailPath()}
                  alt={`Cover Image for ${item.title}`}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 shadow-md  rounded-md"
                  width={0}
                  height={0}
                  sizes="(min-width: 768px) 347px, 192px"
                />
              </div>
              {collection === "posts" && (
                <div className="p-4">
                  {Array.isArray(item?.tags)
                    ? item.tags.map(({ label }) => (
                        <span
                          key={label}
                          className="inline-block bg-gray-100 rounded-full px-3 py-2 text-sm font-normal text-gray-700 mr-2 mb-4"
                        >
                          {label}
                        </span>
                      ))
                    : null}

                  <p className="text-sm text-gray-500">
                    <DateFormatter dateString={item.publishedAt} />{" "}
                    {item.author ? item.author.name : ""}
                  </p>

                  <h3 className="text-lg mb-2 leading-snug font-semibold hover:underline">
                    {item.title}
                  </h3>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContentGrid;
