"use client";

import React from "react";
import { Button, Switch } from "@heroui/react";

// import TableItem from "./custom-table";

interface TableRenderCellProps {
  data: any;
  columnKey: string;
  setMethod?: (method: string) => void;
  setIsOpen?: (open: boolean) => void;
  onRowSelected?: (item: any) => void;
  setIsProductFormView?: (view: boolean) => void;
}

export const TableRenderCell: React.FC<TableRenderCellProps> = ({
  data,
  columnKey,
  setMethod,
  setIsOpen,
  onRowSelected,
  setIsProductFormView,
}) => {
  const cellValue = data[columnKey] as string | number | boolean | null | undefined;

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            color="primary"
            onPress={() => {
              setMethod?.("edit");
              setIsOpen?.(true);
              onRowSelected?.(data);
              setIsProductFormView?.(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            color="danger"
            onPress={() => alert(`Delete ${data.name}`)}
          >
            Delete
          </Button>
        </div>
      );

    case "status":
      return (
        <Switch
          isSelected={cellValue === "Active"}
          color="success"
          onChange={() => alert(`Toggled ${data.name}`)}
        >
          {cellValue}
        </Switch>
      );

    default:
      return <span>{cellValue}</span>;
  }
};
