"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { useLanguage } from "@/contexts/LanguageContext";

// Define a type for the messages object structure we need
type ColumnMessages = {
  lang: string;
  form: {
    sections: {
      bank: {
        fields: {
          accountHolder: string;
          bank: string;
          ifscCode: string;
          swiftCode: string;
          membershipNumber: string;
          dateCreated: string;
        }
      }
    }
  }
};

// Define a type for the columns function to make it reusable
type ColumnsFunction = (messages: ColumnMessages) => ColumnDef<LandDetails>[];

// Create the columns with a function that takes messages as a parameter
const createColumns: ColumnsFunction = (messages) => [
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
      <DataTableColumnHeader 
        column={column} 
        title={messages.form.sections.bank.fields.accountHolder} 
      />
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
      <DataTableColumnHeader 
        column={column} 
        title={messages.form.sections.bank.fields.bank} 
      />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("bank")}</div>;
    },
  },
  {
    accessorKey: "ifscCode",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title={messages.form.sections.bank.fields.ifscCode} 
      />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("ifscCode")}</div>;
    },
  },
  {
    accessorKey: "swiftCode",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title={messages.form.sections.bank.fields.swiftCode} 
      />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("swiftCode")}</div>;
    },
  },
  {
    accessorKey: "aksmvbsMembershipNumber",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title={messages.form.sections.bank.fields.membershipNumber} 
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("aksmvbsMembershipNumber")}
        </div>
      );
    },
  },
  {
    accessorKey: "dateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title={messages.form.sections.bank.fields.dateCreated} 
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateCreated"));
      const formatted = new Intl.DateTimeFormat(messages.lang === "en" ? "en-US" : "kn-IN", {
        dateStyle: "medium",
      }).format(date);
      return <div className="hidden xl:block font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }
];

// Create a custom hook to get the translated columns
export function useTranslatedColumns() {
  const { messages } = useLanguage();
  return createColumns(messages);
}

// For backward compatibility, export a default set of columns using English
// This will be used for static rendering, but components should use useTranslatedColumns()
export const columns: ColumnDef<LandDetails>[] = createColumns({
  lang: "en",
  form: {
    sections: {
      bank: {
        fields: {
          accountHolder: "Account Holder",
          bank: "Bank",
          ifscCode: "IFSC Code",
          swiftCode: "SWIFT Code",
          membershipNumber: "Membership No.",
          dateCreated: "Date Created"
        }
      }
    }
  }
});
