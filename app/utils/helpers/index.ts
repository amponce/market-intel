type SetStateStringArray = React.Dispatch<React.SetStateAction<string[]>>;
type SetStateString = React.Dispatch<React.SetStateAction<string>>;

interface AgeRange {
  value: string;
  label: string;
}

interface Item {
  tags?: AgeRange[];
  ageRange?: AgeRange[];
  itemPrice?: number;
}

export const removeFilterHelper = (
  type: string,
  value: string,
  setSelectedTags: SetStateStringArray,
  setSelectedAgeRanges: SetStateStringArray,
  setSelectedPriceRange: SetStateStringArray,
  setSelectedSortOption: SetStateString
): void => {
  switch (type) {
    case "Tag":
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== value));
      break;
    case "Age Range":
      setSelectedAgeRanges((prev) => prev.filter((age) => age !== value));
      break;
    case "Price Range":
      setSelectedPriceRange((prev) => prev.filter((price) => price !== value));
      break;
    case "Sort Option":
      setSelectedSortOption("");
      break;
    default:
      console.error("Unknown filter type:", type);
  }
};

// Helper function to find unique age ranges
export const findUniqueAgeRanges = (initialProducts: Item[]): AgeRange[] => {
  const uniqueAgeRanges: AgeRange[] = [];
  initialProducts.forEach((price) => {
    if (price.ageRange) {
      price.ageRange.forEach((ageRange) => {
        if (
          !uniqueAgeRanges.some((unique) => unique.value === ageRange.value)
        ) {
          uniqueAgeRanges.push(ageRange);
        }
      });
    }
  });
  return uniqueAgeRanges;
};

// Helper function to toggle tag
export const toggleTagHelper = (
  tag: string,
  setSelectedTags: SetStateStringArray
): void => {
  if (tag === "All") {
    setSelectedTags([]); // Clear all tags when 'All' is selected
  } else {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  }
};

// Helper function to add space before 'Months'
export const addSpaceBeforeMonthsHelper = (str: string): string => {
  return str.replace(/Months/, " Months");
};

interface ActiveFilter {
  value: string;
  label: string;
  type: string;
}

export const generateActiveFilters = ({
  selectedTags,
  selectedAgeRanges,
  selectedPriceRange,
  selectedSortOption,
}: {
  selectedTags: string[];
  selectedAgeRanges: string[];
  selectedPriceRange: string[];
  selectedSortOption: string;
}): ActiveFilter[] => {
  const activeFilters = [
    ...selectedTags.map((tag) => ({ value: tag, label: tag, type: "Tag" })),
    ...selectedAgeRanges.map((age) => ({
      value: age,
      label: age,
      type: "Age Range",
    })),
    ...selectedPriceRange.map((price) => ({
      value: price,
      label: price
        .split("-")
        .map((p) => `$${p}`)
        .join("-"),
      type: "Price Range",
    })),
    ...(selectedSortOption
      ? [
          {
            value: selectedSortOption,
            label: selectedSortOption,
            type: "Sort Option",
          },
        ]
      : []),
  ];
  return activeFilters;
};

export const generateFilters = (
  uniqueAgeRanges: AgeRange[]
): {
  id: string;
  name: string;
  options: { value: string; label: string; checked: boolean }[];
}[] => {
  const filters = [
    {
      id: "ageRange",
      name: "Age",
      options: uniqueAgeRanges.map((ageRange) => ({
        value: ageRange.value,
        label: ageRange.label,
        checked: false,
      })),
    },
    {
      id: "priceRange",
      name: "Price",
      options: [
        { value: "0\u201325", label: "$0\u2013$25", checked: false },
        { value: "25\u201350", label: "$25\u2013$50", checked: false },
        { value: "50\u2013100", label: "$50\u2013$100", checked: false },
        { value: "100\u2013", label: "$100+", checked: false },
      ],
    },
  ];
  return filters;
};
