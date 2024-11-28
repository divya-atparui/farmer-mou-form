'use client';

import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from 'react';

// This will be replaced with actual data fetching
const mockData = [
  {
    id: 1,
    dateCreated: "2024-01-20",
    landOwners: ["John Doe"],
    totalArea: 500,
    location: "Karnataka",
    surveyNumbers: "123, 124",
  },
  {
    id: 2,
    dateCreated: "2024-01-22",
    landOwners: ["Jane Smith"],
    totalArea: 300,
    location: "Maharashtra",
    surveyNumbers: "125, 126",
  },
  {
    id: 3,
    dateCreated: "2024-01-25",
    landOwners: ["Alice Johnson"],
    totalArea: 450,
    location: "Tamil Nadu",
    surveyNumbers: "127, 128",
  },
  {
    id: 4,
    dateCreated: "2024-01-28",
    landOwners: ["Bob Brown"],
    totalArea: 600,
    location: "Kerala",
    surveyNumbers: "129, 130",
  },
  {
    id: 5,
    dateCreated: "2024-02-01",
    landOwners: ["Charlie Davis"],
    totalArea: 350,
    location: "Gujarat",
    surveyNumbers: "131, 132",
  },
];

export default function Dashboard() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth >= 768 ? 10 : 4);
  const [totalPages, setTotalPages] = useState(Math.ceil(mockData.length / itemsPerPage));

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth >= 768 ? 10 : 4;
      setItemsPerPage(newItemsPerPage);
      setTotalPages(Math.ceil(mockData.length / newItemsPerPage));
      setCurrentPage(1); // Reset to first page on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mockData]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const paginatedData = mockData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCreateNew = () => {
    router.push('/land-details-form');
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 relative h-[90vh] bg-blue-100/20">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Land Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full hidden md:table">
              <TableHeader>
                <TableRow>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Land Owners</TableHead>
                  <TableHead>Total Area</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Survey Numbers</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.dateCreated}</TableCell>
                    <TableCell>{entry.landOwners.join(", ")}</TableCell>
                    <TableCell>{entry.totalArea}</TableCell>
                    <TableCell>{entry.location}</TableCell>
                    <TableCell>{entry.surveyNumbers}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Preview</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mb-5">
              <Button onClick={handlePrevPage} disabled={currentPage === 1} className="mr-2">Previous</Button>
              <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
            </div>
          </div>
          <div className="block md:hidden space-y-4">
            {paginatedData.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4 shadow-md">
                <div className="font-bold">Date Created: <span className="font-normal">{entry.dateCreated}</span></div>
                <div className="font-bold">Land Owners: <span className="font-normal">{entry.landOwners.join(", ")}</span></div>
                <Button variant="outline" size="sm" className="mt-2">Preview</Button>
              </div>
            ))}
            <div className="flex justify-center mt-2">
              <Button onClick={handlePrevPage} disabled={currentPage === 1} className="mr-2">Previous</Button>
              <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button onClick={handleCreateNew} className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New
      </Button>
    </div>
  );
}
