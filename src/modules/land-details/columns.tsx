"use client";

import { ColumnDef } from "@tanstack/react-table";


import { DataTableColumnHeader } from "./data-table-column-header";


export const columns: ColumnDef<LandDetails>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "accountHolder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Holder" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium">{row.getValue("accountHolder")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "bank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bank" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("bank")}</div>;
    },
  },
  {
    accessorKey: "ifscCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IFSC Code" />
    ),
    cell: ({ row }) => {
      return <div className="  font-medium">{row.getValue("ifscCode")}</div>;
    },
  },
  {
    accessorKey: "swiftCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SWIFT Code" />
    ),
    cell: ({ row }) => {
      return <div className=" font-medium">{row.getValue("swiftCode")}</div>;
    },
  },
  {
    accessorKey: "aksmvbsMembershipNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Membership No." />
    ),
    cell: ({ row }) => {
      return (
        <div className="  font-medium">
          {row.getValue("aksmvbsMembershipNumber")}
        </div>
      );
    },
  },
  {
    accessorKey: "dateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateCreated"));
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date);
      return <div className="hidden xl:block font-medium">{formatted}</div>;
    },
  },
];
