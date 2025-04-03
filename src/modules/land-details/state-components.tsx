import React from "react";
import { Loader2, AlertTriangle, FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoadingState = () => (
  <div className="flex min-h-[80vh] items-center justify-center bg-slate-50">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
  </div>
);

export const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-slate-50">
    <div className="text-red-500 mb-2">
      <AlertTriangle className="h-12 w-12" />
    </div>
    <p className="text-lg font-medium text-slate-900">{message}</p>
  </div>
);

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-slate-100">
    <div className="text-slate-400 mb-2">
      <FolderOpen className="h-12 w-12" />
    </div>
    <p className=" text-slate-700">
      No land details available. 
    </p>
    <p className="text-lg font-medium">
    Please create One to get started
    </p>
    <div className="mt-4">
      <Button asChild variant="outline" className="h-12 w-12 hover:bg-slate-100">
        <Link href="/land-details-form">
          <Plus className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  </div>
);
