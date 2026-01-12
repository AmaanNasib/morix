import { useCallback, useMemo, useState } from "react";

export interface TableRowItem {
  id: string | number;
  [key: string]: any;
}

export interface UseTableControlsReturn {
  filterValue: string;
  statusFilter: string;
  rowsPerPage: number;
  page: number;
  pages: number;
  hasSearchFilter: boolean;
  totalItems: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  isCustomFormModalOpen: boolean;
  setIsCustomFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRowSelected: (rowItem: TableRowItem) => void;
  selectedRowItem: TableRowItem | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmModalOpen: boolean;
}

const useTableControls = (
  data: TableRowItem[] = [],
  pageCount: number = 0,
): UseTableControlsReturn => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRowItem, setSelectedRowItem] = useState<TableRowItem | null>(
    null,
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isCustomFormModalOpen, setIsCustomFormModalOpen] =
    useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const hasSearchFilter = Boolean(filterValue);

  const pages = useMemo(
    () => Math.ceil((pageCount || 0) / rowsPerPage),
    [pageCount, rowsPerPage],
  );

  const onRowsPerPageChange = useCallback(
  (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1); // reset to first page when rows per page changes
  },
  [],
);


  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onRowSelected = useCallback((rowItem: TableRowItem) => {
    setSelectedRowItem(rowItem);
  }, []);

  console.log(data);

  return {
    filterValue,
    statusFilter,
    rowsPerPage,
    page,
    pages,
    hasSearchFilter,
    totalItems: pageCount,
    setPage,
    setStatusFilter,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    isCustomFormModalOpen,
    setIsCustomFormModalOpen,
    onRowSelected,
    selectedRowItem,
    setIsOpen,
    isOpen,
    setIsConfirmModalOpen,
    isConfirmModalOpen,
  };
};

export default useTableControls;
