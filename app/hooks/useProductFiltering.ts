import { useState, useEffect, useCallback, useRef } from "react";
import {
  removeFilterHelper,
  findUniqueAgeRanges,
  toggleTagHelper,
  addSpaceBeforeMonthsHelper,
  generateActiveFilters,
  generateFilters,
} from "@/utils/helpers";
import { OstDocument } from "outstatic";
import { filterProducts } from "@/utils/helpers/filters"; // <-- Import the new utility function

type ProductTag = { value: string; label: string };
type AgeRange = { value: string; label: string };

type Item = {
  tags?: ProductTag[];
  ageRange?: AgeRange[];
  itemPrice?: number;
} & OstDocument;

type Product = Item & {
  tags: ProductTag[];
  ageRange: AgeRange[];
  productLink?: string;
  itemPrice?: number;
  items?: Product[]; // Make this optional
};

export type ProductFilteringProps = {
  initialProducts: Item[];
};

export const sortOptions = [
  { name: "Newest", href: "#", current: false },
  { name: "Lowest Price", href: "#", current: false },
  { name: "Highest Price", href: "#", current: false },
];

export const useProductFiltering = ({
  initialProducts,
}: ProductFilteringProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [_, setOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const result = filteredProducts.filter((product) => {
      return (
        product.title.toLowerCase().includes(lowercasedQuery) ||
        product.tags.some((tag) =>
          tag.value.toLowerCase().includes(lowercasedQuery)
        ) ||
        (product.itemPrice &&
          product.itemPrice.toString().includes(lowercasedQuery))
      );
    });

    setSearchedProducts(result);
  }, [searchQuery, filteredProducts]);

  useEffect(() => {
    // Use filterProducts function to get the filtered list
    const filtered = filterProducts({
      initialProducts,
      selectedTags,
      selectedAgeRanges,
      selectedPriceRange,
      selectedSortOption,
    });

    setFilteredProducts(filtered);
  }, [
    initialProducts,
    selectedTags,
    selectedAgeRanges,
    selectedPriceRange,
    selectedSortOption,
  ]);

  const uniqueAgeRanges = findUniqueAgeRanges(initialProducts);

  const activeFilters = generateActiveFilters({
    selectedTags,
    selectedAgeRanges,
    selectedPriceRange,
    selectedSortOption,
  });

  const filters = generateFilters(uniqueAgeRanges);

  // Function to clear all filters
  const clearAllFilters = useCallback(() => {
    setSelectedTags([]); // Clear tag filters
    setSelectedAgeRanges([]); // Clear age range filters
    setSelectedPriceRange([]); // Clear price range filters
    setSelectedSortOption(""); // Reset sorting option
  }, [
    setSelectedTags,
    setSelectedAgeRanges,
    setSelectedPriceRange,
    setSelectedSortOption,
  ]);

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      console.log("Restoring filters from local storage.");
      const savedFilters = localStorage.getItem("productFilters");
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        setSelectedTags(parsedFilters.selectedTags || []);
        setSelectedAgeRanges(parsedFilters.selectedAgeRanges || []);
        setSelectedPriceRange(parsedFilters.selectedPriceRange || []);
        setSelectedSortOption(parsedFilters.selectedSortOption || "");
      }
      didMountRef.current = true;
    }
  }, []);
  useEffect(() => {
    const filterState = {
      selectedTags,
      selectedAgeRanges,
      selectedPriceRange,
      selectedSortOption,
    };
    localStorage.setItem("productFilters", JSON.stringify(filterState));
  }, [selectedTags, selectedAgeRanges, selectedPriceRange, selectedSortOption]);

  return {
    setOpen,
    selectedTags,
    setSelectedTags,
    filteredProducts,
    setFilteredProducts,
    selectedSortOption,
    setSelectedSortOption,
    selectedAgeRanges,
    setSelectedAgeRanges,
    selectedPriceRange,
    setSelectedPriceRange,
    removeFilter: (type: string, value: string) =>
      removeFilterHelper(
        type,
        value,
        setSelectedTags,
        setSelectedAgeRanges,
        setSelectedPriceRange,
        setSelectedSortOption
      ),
    toggleTag: (tag: string) => toggleTagHelper(tag, setSelectedTags),
    addSpaceBeforeMonths: addSpaceBeforeMonthsHelper,
    clearAllFilters,
    sortOptions,
    activeFilters,
    searchQuery,
    setSearchQuery,
    searchedProducts,
    filters,
  };
};
