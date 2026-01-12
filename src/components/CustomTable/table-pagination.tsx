import { Pagination, Select, SelectItem } from "@heroui/react";
import React from "react";

interface BottomPaginationProps {
  page: number;
  pages: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
  totalItems: number;
}

export const BottomPagination: React.FC<BottomPaginationProps> = ({
  page,
  pages,
  setPage,
  rowsPerPage,
  onRowsPerPageChange,
  totalItems,
}) => {
  const pageSizeOptions = ["5", "10", "20", "50", "100"];

  return (
    <div className="flex justify-between items-center px-4 py-3 border-t border-default-200">
      <div className="flex items-center gap-2">
        <span className="text-sm text-default-500">Rows per page:</span>
        <Select
          aria-label="Rows per page"
          className="w-[80px]"
          selectedKeys={[rowsPerPage.toString()]}
          size="sm"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((num) => (
            <SelectItem key={num}>{num}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-default-500">
          {Math.min((page - 1) * rowsPerPage + 1, totalItems)}–
          {Math.min(page * rowsPerPage, totalItems)} of {totalItems}
        </span>
        <Pagination
          isCompact
          showControls
          className="text-white"
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
