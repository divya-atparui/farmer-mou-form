"use client"
import { useGetUserLandDetails } from '@/api/data/use-get-user-land-details'
import React from 'react'
import { DataTable } from './land-details/data-table'
import { columns } from './land-details/columns'
import { EmptyState, LoadingState } from './land-details/state-components'

const Dashboard = () => {
  const { data, isLoading, error } = useGetUserLandDetails();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <EmptyState />;
  }

  if (!data || data.length === 0 || data === undefined) {
    return <EmptyState />;
  }

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Dashboard