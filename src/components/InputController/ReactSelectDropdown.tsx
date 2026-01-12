import type {
  StylesConfig,
  GroupBase,
  ControlProps,
  CSSObjectWithLabel, MenuListProps
} from "react-select";

type OptionType = { label: string; value: string };

import { useRef, useState } from "react";
import Select from "react-select";

interface DropdownItem {
  id?: string | number;
  _id?: string | number;
  name?: string;
  level?: string;
  value: string | number;
  label: string;
}

interface SelectOption {
  value: string;
  label?: string;
}

interface ReactSelectDropdownProps {
  fieldName: string;
  id?: string;
  error?: string;
  data: OptionType[];
  value: string | number | Array<string | number>;
  handleSelectChange: (
    selectedOption: SelectOption,
    field: any
  ) => void;
  field: object;
  onMenuOpen?: () => void;
  placeholder?: string;
  isDisabled?: boolean;
  isMultiSelect?: boolean;
  handleSearchChange?: (searchValue: string, type: string) => void;
  fetchDropdownData?: (
    type?: string,
    value?: string | number,
    searchValue?: string,
    pageValue?: Number | string,
  ) => Promise<{ data: DropdownItem[]; totalPages: number }>;
}

export const customSelectStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided: CSSObjectWithLabel, _state: ControlProps<OptionType, false, GroupBase<OptionType>>) => ({
    ...provided,
    backgroundColor: "#f9f9f9",
    borderColor: "#e5e7eb",
    borderWidth: "1px",
    borderRadius: "0.5rem",
    minHeight: "40px",
    fontSize: "14px",
    boxShadow: "none",
    paddingLeft: "12px",
    transition: "all 0.2s ease-in-out",
    minWidth: "auto",
    cursor: "pointer",
    "&:hover": { borderColor: "#d1d5db" },
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
    padding: "4px 0",
    fontSize: "14px",
  }),

  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    zIndex: 9999,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f3f4f6" : "#ffffff",
    color: "#111827",
    cursor: "pointer",
    padding: "8px 12px",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
    fontSize: "14px",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#111827",
    fontSize: "14px",
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    paddingRight: "8px",
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#6b7280",
    padding: "4px",
    svg: { color: "#88898B", width: "16px" },
    "&:hover": { color: "#374151" },
  }),

  clearIndicator: (provided) => ({
    ...provided,
    cursor: "pointer",
    svg: {
      backgroundPosition: "center",
      backgroundSize: "contain",
      color: "#88898B",
      width: "16px",
    },
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: "0px",
  }),
};

export function ReactSelectDropdown({
  data,
  fieldName,
  value,
  handleSelectChange,
  field,
  onMenuOpen,
  placeholder = "Select",
  isDisabled = false,
  isMultiSelect = false,
  handleSearchChange,
  fetchDropdownData,
  id,
}: ReactSelectDropdownProps) {
  const containerRef = useRef(null); // Ref for the menuList container
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch more data
  const fetchMoreData = async (searchValue: string, pageValue: number) => {
    if (isLoading || !hasMore) return; // Avoid multiple requests at once
    if (typeof fetchDropdownData !== "function") return;
    setIsLoading(true);
    try {
      // const limit = 50;
      const search = searchValue || "";
      const result = await fetchDropdownData(
        fieldName,
        '',
        search,
        pageValue,
      );

      if (result.data && result.data.length > 0) {
        setPage((prevPage) => prevPage + 1); // Increment the page number for the next call
      } else {
        setHasMore(false); // No more data to fetch
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle scroll and detect when the user reaches the bottom
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (typeof value === "string" && value.length > 0) {
        fetchMoreData(value, page + 1);
      }
    }
  };


  return (
    <Select
      
      backspaceRemovesValue={true}
      className="basic-single"
      classNamePrefix="select"
      id={id}
      isClearable={true}
      isDisabled={isDisabled}
      // isMulti={isMultiSelect}
      isSearchable={true}
      // @ts-expect-error - react-select doesn't type menuList; will replace with components.MenuList later
      menuList={(props: MenuListProps<OptionType, boolean, GroupBase<OptionType>>) => (
        <div
          ref={containerRef}
          {...props}
          onScroll={handleScroll} // Attach the scroll handler here
        />
      )}
      menuPlacement="bottom"
      name={fieldName}
      options={data}
      placeholder={placeholder}
      styles={customSelectStyles}
      value={
        isMultiSelect
          ? data.filter(
            (option) =>
              Array.isArray(value) &&
              value.includes(option.value?.toString() || option.value),
          ) || [] // Ensure proper handling of multi select value
          : data.find((option) => option.value == value) || null
      }
      onChange={(selectedOption) =>
        selectedOption
          ? handleSelectChange(selectedOption, field)
          : handleSelectChange({ value: "" }, field)
      }
      onInputChange={(searchValue) => {
        if (handleSearchChange) handleSearchChange(searchValue, fieldName);
      }
      }
      onMenuOpen={onMenuOpen}
      // onMenuScrollToBottom={handleScroll}
    />
  );
}
