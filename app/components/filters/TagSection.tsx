import TagFilters from "../TagFilters";

interface TagSectionProps {
  toggleTag: (tag: string) => void;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagSection: React.FC<TagSectionProps> = ({
  toggleTag,
  selectedTags,
  setSelectedTags,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full">
      <TagFilters
        tagName="Toys"
        bgColor="bg-custom-button-green"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <TagFilters
        tagName="Nursery"
        bgColor="bg-custom-button-teal"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <TagFilters
        tagName="Kitchen"
        bgColor="bg-custom-button-coral "
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <TagFilters
        tagName="Bath"
        bgColor="bg-custom-button-purple"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <TagFilters
        tagName="Gifts"
        bgColor="bg-custom-button-light-pink"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <TagFilters
        tagName="Books"
        bgColor="bg-custom-button-cream-orange"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
      <TagFilters
        tagName="Home"
        bgColor="bg-custom-button-light-teal"
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />

      <TagFilters
        tagName="All"
        bgColor="bg-custom-button-mushroom"
        toggleTag={() => setSelectedTags([])} // Reset tags when "All" is clicked
        selectedTags={selectedTags}
      />
    </div>
  );
};
