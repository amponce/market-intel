import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Option {
  value: string;
  label: string;
}

interface FilterSection {
  id: string;
  name: string;
  options: Option[];
}

interface FilterPopoverSectionProps {
  filters: FilterSection[];
  setSelectedAgeRanges: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedPriceRange: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAgeRanges: string[];
  selectedPriceRange: string[];
}

export const FilterPopoverSection: React.FC<FilterPopoverSectionProps> = ({
  filters,
  setSelectedAgeRanges,
  setSelectedPriceRange,
  selectedAgeRanges,
  selectedPriceRange,
}) => {
  return (
    <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
      {filters.map((section, _) => (
        <Popover
          key={section.name}
          className="relative inline-block px-4 text-left"
        >
          <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            <span>{section.name}</span>
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <form className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      value={option.value}
                      type="checkbox"
                      checked={
                        section.id === "priceRange"
                          ? selectedPriceRange.includes(option.value)
                          : selectedAgeRanges.includes(option.value)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => {
                        const value = e.target.value;
                        switch (section.id) {
                          case "ageRange":
                            setSelectedAgeRanges((prev) =>
                              prev.includes(value)
                                ? prev.filter((item) => item !== value)
                                : [...prev, value]
                            );
                            break;
                          case "priceRange":
                            setSelectedPriceRange((prev) =>
                              prev.includes(value)
                                ? prev.filter((item) => item !== value)
                                : [...prev, value]
                            );
                            break;
                          default:
                            console.error(
                              "Unhandled filter section:",
                              section.id
                            );
                        }
                      }}
                    />

                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </form>
            </Popover.Panel>
          </Transition>
        </Popover>
      ))}
    </Popover.Group>
  );
};
