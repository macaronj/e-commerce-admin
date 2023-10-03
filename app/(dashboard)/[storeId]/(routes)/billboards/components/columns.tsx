"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TabelCellAction } from "./table-cell-action";

export type BillboardColumn = {
  id: string;
  label: string;
  isDefault: boolean;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "label",
  },
  {
    accessorKey: "isDefault",
    header: "isDefault",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <TabelCellAction data={row.original} />,
  },
];
