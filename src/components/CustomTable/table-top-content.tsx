import { Input } from "@heroui/react";
import React, { useMemo } from "react";

interface TableTopContentProps {
  filterValue?: string;
  statusFilter?: string;
  visibleColumns?: string[];
  onRowsPerPageChange?: (rows: number) => void;
  onSearchChange?: (value: string) => void;
  onClear?: () => void;
  setStatusFilter?: (status: string) => void;
  setVisibleColumns?: (columns: string[]) => void;
  headerFields?: Record<string, any>;
  setTriggerData?: (data: unknown) => void;
  isSearchable?: boolean
}

export const TableTopContent: React.FC<TableTopContentProps> = ({
  filterValue,
  statusFilter,
  visibleColumns,
  onRowsPerPageChange,
  onSearchChange,
  onClear,
  setStatusFilter,
  setVisibleColumns,
  headerFields,
  setTriggerData,
  isSearchable
}) => {
  return useMemo(() => {
    return (
      <div className={`flex flex-col gap-4 w-full sm:w-auto ${isSearchable ? "" : "hidden"}`}>
        <div className="flex justify-end gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:w-auto"
            classNames={{
              inputWrapper: [
                "group-data-[focus=true]:border-default-400",
                "bg-background",
              ],
            }}
            placeholder="Search"
            radius="md"
            value={filterValue ?? ""}
            variant="bordered"
            onClear={() => onClear?.()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    setStatusFilter,
    setVisibleColumns,
    headerFields,
    setTriggerData,
  ]);
};
