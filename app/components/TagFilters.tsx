import React from "react";

interface TagProps {
  tagName: string;
  bgColor: string;
  toggleTag: (tag: string) => void;
  selectedTags: string[];
}

// const colorMapping = {
//   Toys: "bg-custom-button-green",
//   Nursery: "bg-custom-button-teal",
//   Kitchen: "bg-custom-button-coral",
//   Bath: "bg-custom-button-purple",
//   Gifts: "bg-custom-button-warm-gray",
//   Books: "bg-custom-button-royal-blue",
//   Home: "bg-custom-button-tan",
//   All: "bg-custom-button-mushroom",
// };

const TagFilters: React.FC<TagProps> = ({
  tagName,
  bgColor,
  toggleTag,
  selectedTags,
}) => {
  const isSelected =
    tagName === "All"
      ? selectedTags.length === 0
      : selectedTags.includes(tagName);

  return (
    <a
      onClick={() => toggleTag(tagName)}
      className={`relative inline-block px-4 py-2 font-medium cursor-pointer group text-center rounded ${
        isSelected ? `duration-200 ease ${bgColor} text-white` : "bg-white"
      }`}
    >
      <span
        className={`absolute rounded-lg inset-1 w-full h-full transition-all duration-200 ease-out transform ${
          isSelected
            ? "-translate-x-0 -translate-y-0"
            : "translate-x-1 translate-y-1"
        } group-hover:-translate-x-0 group-hover:-translate-y-0 ${bgColor}`}
      ></span>
      <span
        className={`absolute rounded-lg inset-0 w-full h-full border-2 border-black group-hover:bg-[#1E6169] ${
          isSelected ? "bg-[#1E6169] text-white" : "bg-white"
        }`}
      ></span>
      <span className="relative group-hover:text-white">{tagName}</span>
    </a>
  );
};

export default TagFilters;
