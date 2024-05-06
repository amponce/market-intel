"use client";
import React, { useState, CSSProperties } from "react";

interface TagProps {
  tagName: string;
  imageSrc: string; // Add this line
  toggleTag: (tag: string) => void;
  selectedTags: string[];
}

// Extend the CSSProperties to include custom properties
interface CustomCSSProperties extends CSSProperties {
  "--pointer-x": string;
  "--pointer-y": string;
}

const ImageFilters: React.FC<TagProps> = ({
  tagName,
  imageSrc,
  toggleTag,
  selectedTags,
}) => {
  const isSelected = selectedTags.includes(tagName);
  const isActive = selectedTags.includes(tagName);

  return (
    <div
      className={`tag-image-container ${isSelected ? "active " : ""}`}
      onClick={() => toggleTag(tagName)}
    >
      <img
        src={imageSrc}
        alt={tagName}
        className="transition-transform duration-300 ease-in-out w-full h-full object-cover"
      />
      <div className="tag-overlay frame"></div>
      <h2 className="tag-name">{tagName}</h2>
    </div>
  );
};

export default ImageFilters;
