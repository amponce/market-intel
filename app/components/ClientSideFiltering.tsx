// ClientSideFiltering.tsx
"use client";
import ContentGrid from "./ContentGrid";
import { useEffect } from "react";
import {
  useProductFiltering,
  ProductFilteringProps,
} from "../hooks/useProductFiltering";
import { TagSection } from "./filters/TagSection";
import { FilterPopoverSection } from "./filters/FilterPopoverSection";
import { ActiveFilterSection } from "./filters/ActiveFilterSection";
import { FilterSortButton } from "./filters/FilterSortButton";
import { ArrowPathIcon } from "@heroicons/react/24/outline"; // For outline icons

export default function ClientSideFiltering({
  initialProducts,
}: ProductFilteringProps) {
  const {
    setOpen,
    selectedTags,
    setSelectedTags,
    setSelectedSortOption,
    selectedAgeRanges,
    setSelectedAgeRanges,
    selectedPriceRange,
    setSelectedPriceRange,
    filteredProducts,
    removeFilter,
    toggleTag,
    addSpaceBeforeMonths,
    clearAllFilters,
    sortOptions,
    activeFilters,
    searchQuery,
    searchedProducts,
    setSearchQuery,
    filters,
  } = useProductFiltering({ initialProducts });

  return (
    <>
      <div className="flex justify-center items-center" id="collections">
        <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full ">
          <div className="flex flex-col jusitfy-center items-center space-y-10">
            {/* <div className="flex flex-col justify-center items-center ">
              <h1 className="text-3xl xl:text-4xl font-bold leading-7 xl:leading-9 text-gray-800 ">
                Filter by category
              </h1>
            </div> */}
            <TagSection
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              toggleTag={toggleTag}
            />
          </div>
        </div>
      </div>
      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="border-b border-gray-200 bg-custom-yellow pb-4 mb-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <FilterPopoverSection
              filters={filters}
              setSelectedAgeRanges={setSelectedAgeRanges}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedAgeRanges={selectedAgeRanges}
              selectedPriceRange={selectedPriceRange}
            />

            {/* New flex container for Sort and Clear Filters */}
            <div className="flex items-center space-x-4">
              {activeFilters.length > 0 && (
                <button
                  type="button"
                  className="group btn inline-flex items-center justify-center text-gray-600 hover:text-gray-900"
                  onClick={() => clearAllFilters()}
                >
                  <ArrowPathIcon className="h-6 w-6" />
                </button>
              )}
              <FilterSortButton
                setSelectedSortOption={setSelectedSortOption}
                sortOptions={sortOptions}
              />
              <div className="relative hidden sm:block">
                <form>
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      id="default-search"
                      className="py-2 text-sm text-white bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <ActiveFilterSection
            activeFilters={activeFilters}
            removeFilter={removeFilter}
            addSpaceBeforeMonths={addSpaceBeforeMonths}
          />
        )}
      </section>

      {/* Products Grid */}
      {searchQuery.length > 0 ? (
        searchedProducts?.length > 0 ? (
          <ContentGrid
            title="Search Results"
            items={searchedProducts}
            collection="products"
          />
        ) : (
          <div>No products found for "{searchQuery}"</div>
        )
      ) : selectedTags ? (
        filteredProducts?.length > 0 ? (
          <ContentGrid
            title={`${selectedTags}`}
            items={filteredProducts}
            collection="products"
          />
        ) : (
          <div>No products found for selected tags</div>
        )
      ) : (
        initialProducts?.length > 0 && (
          <ContentGrid title="" items={initialProducts} collection="products" />
        )
      )}
    </>
  );
}
