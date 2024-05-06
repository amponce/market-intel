import ImageFilters from "../ImageFilters";

interface TagSectionProps {
  toggleTag: (tag: string) => void;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImageCategory: React.FC<TagSectionProps> = ({
  toggleTag,
  selectedTags,
  setSelectedTags,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <ImageFilters
        tagName="Home"
        imageSrc="/categories/home-category.png"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <ImageFilters
        tagName="Kitchen"
        imageSrc="/categories/kitchen-category.png"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <ImageFilters
        tagName="Nursery"
        imageSrc="/categories/nursery-category.png"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <ImageFilters
        tagName="Bath"
        imageSrc="/categories/bath-category.png"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <ImageFilters
        tagName="Toys"
        imageSrc="/categories/toy-category.png"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <ImageFilters
        tagName="All"
        imageSrc="/categories/all-category.png"
        toggleTag={() => setSelectedTags([])} // Reset tags when "All" is clicked
        selectedTags={selectedTags}
      />
    </div>
  );
};
