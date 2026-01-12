import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useMemo } from "react";

import { BottomPagination } from "./table-pagination";
import { TableTopContent } from "./table-top-content";

export default function CustomTable({
  page,
  pages,
  setPage,
  rowsPerPage,
  onRowsPerPageChange,
  totalItems,
  onSearchChange,
  filterValue,
  columns,
  tableData,
  onClear,
  statusFilter,
  setStatusFilter,
  visibleColumns,
  setVisibleColumns,
  headerFields,
  rowActions,
  isSelectable = false,
  selectedKeys,
  onSelectionChange,
  isSearchable,
}: any) {
  const bottomContent = BottomPagination({
    page,
    pages,
    setPage,
    rowsPerPage,
    onRowsPerPageChange,
    totalItems,
  });

  const topContent = TableTopContent({
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    setStatusFilter,
    setVisibleColumns,
    headerFields,
    isSearchable,
  });

  const classNames = useMemo(
    () => ({
      wrapper: [
        "bg-white",
        "rounded-xl",
        "border border-gray-200",
        "shadow-sm",
        "pt-0 px-0",
      ],
      thead: ["text-gray-900"],
      th: [
        "font-semibold",
        "py-4 px-4",
        "text-sm",
        "bg-gray-50",
        "border-b border-gray-200",
      ],
      tr: [
        "h-14 border-b border-gray-100 last:border-0",
        "hover:bg-gray-50",
      ],
      td: ["py-4 px-4 text-gray-700 text-sm align-middle"],
    }),
    []
  );

  const headerColumns = useMemo(() => {
    if (visibleColumns?.length > 0) {
      return columns.filter((col: any) => visibleColumns.includes(col.uid));
    }

    return columns.filter((col: any) => !col.hidden);
  }, [visibleColumns, columns]);

  const renderCell = (item: any, columnKey: string) => {
    const column = columns.find((col: any) => col.uid === columnKey);

    // Renderer Override
    if (column?.renderOptions) {
      return column.renderOptions(item, columnKey);
    }

    if (columnKey === "actions") {
      return (
        <Dropdown className="min-w-[100px]" placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly className="rounded-full hover:bg-gray-100 text-xl" variant="light">
              ⋮
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Row Actions">
            {rowActions(item).map((action: any) => (
              <DropdownItem
                key={action.label}
                startContent={action.icon}
                onPress={() => action.onClick(item, action.key)}
              >
                {action.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    }

    return item[columnKey];
  };

  return (
    <div className="w-full overflow-x-auto overflow-y-auto custom-scrollbar">
      <Table
        isHeaderSticky
        removeWrapper
        aria-label="Custom Table"
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        className="text-sm min-w-max"
        classNames={classNames}
        layout="auto"
        selectedKeys={selectedKeys}
        selectionMode={isSelectable ? "multiple" : undefined}
        showSelectionCheckboxes={isSelectable}
        topContent={topContent}
        topContentPlacement="inside"
        onSelectionChange={onSelectionChange}
      >
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              allowsSorting={column.sortable}
              className={column.width ? `w-${column.width}` : ""}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody emptyContent="No results found" items={tableData}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>


  );
}
