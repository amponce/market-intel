type Filter = {
  type: string;
  label: string;
  value: string;
};

type ActiveFilterSectionProps = {
  activeFilters: Filter[];
  removeFilter: (type: string, value: string) => void;
  addSpaceBeforeMonths: (label: string) => string;
};

export const ActiveFilterSection = ({
  activeFilters,
  removeFilter,
  addSpaceBeforeMonths,
}: ActiveFilterSectionProps) => {
  return (
    <div className="bg-custom-yellow">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
        <h3 className="text-sm font-medium text-gray-500 hidden sm:block">
          Filters
          <span className="sr-only">, active</span>
        </h3>

        <div
          aria-hidden="true"
          className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
        />

        <div className="mt-2 sm:ml-4 sm:mt-0">
          <div className="-m-1 flex flex-wrap items-center">
            <h2 className="mb-8 mt-0">
              {activeFilters.length > 0 && (
                <span className="sr-only">Active filters</span>
              )}
            </h2>

            {activeFilters.map((activeFilter) => (
              <span
                key={activeFilter.value + activeFilter.type}
                className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
              >
                <span>
                  {`${
                    activeFilter.type === "Age Range"
                      ? addSpaceBeforeMonths(activeFilter.label)
                      : activeFilter.label
                  }`}
                </span>
                <button
                  type="button"
                  className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                  onClick={() =>
                    removeFilter(activeFilter.type, activeFilter.value)
                  }
                >
                  <span className="sr-only">
                    Remove filter for {activeFilter.label}
                  </span>
                  <svg
                    className="h-2 w-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 8 8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M1 1l6 6m0-6L1 7"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
