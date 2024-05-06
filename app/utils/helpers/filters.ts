// utils/filterProducts.js
import { OstDocument } from "outstatic";

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

interface FilterProductsProps {
  initialProducts: Item[];
  selectedTags: string[];
  selectedAgeRanges: string[];
  selectedPriceRange: string[];
  selectedSortOption: string;
}

export function filterProducts({
  initialProducts,
  selectedTags,
  selectedAgeRanges,
  selectedPriceRange,
  selectedSortOption,
}: FilterProductsProps) {
  let ensuredProducts = initialProducts.map((item: Item) => ({
    ...item,
    tags: item.tags || [],
    ageRange: item.ageRange || [],
    itemPrice: item.itemPrice || 0,
  })) as Product[];

  if (selectedTags.length > 0 || selectedAgeRanges.length > 0) {
    ensuredProducts = ensuredProducts.filter((product: Product) => {
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) =>
          product.tags.some(
            (productTag: ProductTag) =>
              productTag.value.toLowerCase() === tag.toLowerCase()
          )
        );

      const ageMatch =
        selectedAgeRanges.length === 0 ||
        selectedAgeRanges.some((age) =>
          product.ageRange.some((ageRange: AgeRange) => {
            if (typeof age === "string" && typeof ageRange.value === "string") {
              return ageRange.value.toLowerCase() === age.toLowerCase();
            }
          })
        );

      return tagMatch && ageMatch;
    });
  }

  if (selectedPriceRange.length > 0) {
    ensuredProducts = ensuredProducts.filter((product) => {
      return selectedPriceRange.some((range) => {
        const [minPrice, maxPrice] = range.split("\u2013").map(Number);
        return (
          product.itemPrice !== undefined &&
          product.itemPrice >= minPrice &&
          (maxPrice ? product.itemPrice <= maxPrice : true)
        );
      });
    });
  }

  if (selectedSortOption === "Lowest Price") {
    ensuredProducts.sort((a, b) => (a.itemPrice ?? 0) - (b.itemPrice ?? 0));
  } else if (selectedSortOption === "Highest Price") {
    ensuredProducts.sort((a, b) => (b.itemPrice ?? 0) - (a.itemPrice ?? 0));
  }

  return ensuredProducts;
}
