/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface DataTableMobileContentProps {
  title: string
  content: Record<string, any>
  visibleFields: string[]
  fieldLabels: Record<string, string>
}

export function DataTableMobileContent({
  title,
  content,
  visibleFields,
  fieldLabels,
}: DataTableMobileContentProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View details</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            View all details for this record
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {visibleFields.map((field) => (
            <div key={field} className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">
                {fieldLabels[field]}
              </span>
              <span className="text-sm">
                {typeof content[field] === 'object' 
                  ? JSON.stringify(content[field])
                  : content[field]}
              </span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}