"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../land-details/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";


// Define a type for the columns function to make it reusable
export type ColumnsFunction = () => ColumnDef<LandDetails>[];

// Create the columns with the required parameters - focusing only on Landowners name and created by
export const createColumns: ColumnsFunction = () => [
  {
    // Display the first landowner's name
    accessorFn: (row) => row.landOwners?.length > 0 ? row.landOwners[0].landownerName : "N/A",
    id: "landownerName",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title="Landowner Name" 
      />
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium">{value}</div>
        </div>
      );
    },
  },
  {
    // Display who created the record
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title="Created  Date" 
      />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdDate") as string;
      // Format the date to make it more readable
      const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : "N/A";
      
      return <div className="font-medium text-gray-700">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }
];

// Export the columns
export const columns = createColumns();
