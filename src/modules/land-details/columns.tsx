"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableMobileContent } from "./data-table-mobile.content";
import { DataTableColumnHeader } from "./data-table-column-header";
import Link from "next/link";

const fieldLabels = {
  accountHolder: "Account Holder",
  accountNumber: "Account Number",
  bank: "Bank",
  branch: "Branch",
  ifscCode: "IFSC Code",
  swiftCode: "SWIFT Code",
  aksmvbsMembershipNumber: "Membership Number",
  dateCreated: "Date Created",
};

export const columns: ColumnDef<UserLandDetailsDataTable>[] = [
  {
    accessorKey: "accountHolder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Holder" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium">{row.getValue("accountHolder")}</div>
          <DataTableMobileContent
            title="Account Details"
            content={row.original}
            visibleFields={[
              "accountHolder",
              "accountNumber",
              "bank",
              "branch",
              "ifscCode",
              "swiftCode",
              "aksmvbsMembershipNumber",
              "dateCreated",
            ]}
            fieldLabels={fieldLabels}
          />
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
      return (
        <div className="hidden sm:block font-medium">
          {row.getValue("ifscCode")}
        </div>
      );
    },
  },
  {
    accessorKey: "swiftCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SWIFT Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="hidden md:block font-medium">
          {row.getValue("swiftCode")}
        </div>
      );
    },
  },
  {
    accessorKey: "aksmvbsMembershipNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Membership No." />
    ),
    cell: ({ row }) => {
      return (
        <div className="hidden lg:block font-medium">
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
  {
    id: "actions",
    cell: ({ row }) => {
      const details = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(details.accountNumber)
              }
            >
              Copy Account Number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href={`/land-details/${details.id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];