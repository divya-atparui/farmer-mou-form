"use client"
import { useGetUserLandDetails } from '@/api/data/use-get-user-land-details'
import React from 'react'
import { DataTable } from './land-details/data-table'
import { columns } from './land-details/columns'
import { EmptyState, LoadingState } from './land-details/state-components'

const Dashboard = () => {
  const { data, isLoading, error } = useGetUserLandDetails();

  console.log(data)
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <EmptyState />;
  }

  if (!data?.data || data === undefined || data?.data === null || data.status !== 404) {
    return <EmptyState />;
  }

  const landDetails = data.data;


  return (
    <div>
      
      <DataTable data={landDetails} columns={columns} />
    </div>
  );
};

export default Dashboard