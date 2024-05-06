import type { OstDocument } from "outstatic";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "../lib/utils";

export type Item = {
  tags?: { value: string; label: string }[];
  productLink?: string; // Optional based on your schema
  itemPrice?: number; // Optional based on your schema
} & OstDocument;

type Props = {
  collection: "posts" | "products";
  title?: string;
  items: Item[];
  priority?: boolean;
};

const ContentGrid = ({
  title = "More",
  items,
  collection,
  priority = false,
}: Props) => {
  const mapTagToBgColor = (tag: string) => {
    const tagColorMap = {
      all: "#ffffff",
      kitchen: "custom-button-coral",
      nursery: "custom-button-teal",
      bath: "custom-button-purple",
      home: "custom-button-tan",
      toys: "custom-button-green",
    };
    return tagColorMap[tag as keyof typeof tagColorMap] ?? "custom-mint-green";
  };

  const renderTagPills = (tags: string[]) => {
    return tags.map((tag, index) => {
      const bgColor = tag ? mapTagToBgColor(tag) : " ";
      return (
        <span
          key={index}
          className={`py-2 px-4 rounded-full bg-gray-200 text-gray font-sans font-normal text-xs hover:text-gray-900 hover:bg-gray-100 focus:outline-none active:shadow-none mr-2 border-2 border-${bgColor} `}
        >
          {tag}
        </span>
      );
    });
  };

  return (
    <section id={collection}>
      <h2 className="mb-8 mt-0">
        {title === "Other Products" ? renderTagPills(title.split(",")) : null}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 sm:gap-x-6 lg:gap-x-8 sm:gap-y-6 lg:gap-y-8 mb-8">
        {items.map((item, id) => {
          return (
            <Link key={item.slug} href={`/${collection}/${item.slug}`}>
              <div
                className={`cursor-pointer project-card aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 transition duration-100 motion-reduce:hover:scale-100 overflow-hidden relative group `}
              >
                <div className="p-2 relative">
                  <Image
                    src={item.coverImage ?? ""}
                    alt={`Cover Image for ${item.title}`}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 shadow-md  rounded-md"
                    width={0}
                    height={0}
                    sizes="(min-width: 768px) 347px, 192px"
                    priority={priority && id <= 2}
                  />

                  {/* Existing Product Info */}
                  {collection === "products" && (
                    <div>
                      <span
                        className={`absolute z-11 bottom-32 right-4 py-2 px-4 no-underline rounded-full bg-gray-200 text-gray font-sans font-semibold text-sm hover:text-gray-900 hover:bg-gray-100 focus:outline-none active:shadow-none  `}
                      >
                        {formatCurrency(item.itemPrice ?? 0)}
                      </span>
                      <div className="p-4 h-[100px] overflow-y-auto">
                        <h3 className="text-md mb-2 leading-snug font-normal hover:underline line-clamp-2">
                          {item?.title}
                        </h3>
                      </div>
                    </div>
                  )}
                  {/* Existing Post Info */}
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
                      <h3 className="text-lg mb-2 leading-snug font-semibold hover:underline">
                        {item.title}
                      </h3>
                      <p className="text-md leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ContentGrid;
