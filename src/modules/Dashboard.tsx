"use client"
import { useGetUserLandDetails } from '@/api/data/use-get-user-land-details'
import React from 'react'
import { DataTable } from './land-details/data-table'
import { useTranslatedColumns } from './land-details/columns'
import { EmptyState, LoadingState } from './land-details/state-components'

const Dashboard = () => {
  const { data, isLoading, error } = useGetUserLandDetails();
  // Use the translated columns hook to get localized columns
  const columns = useTranslatedColumns();

  console.log(data)
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <EmptyState />;
  }

  if (!data?.data || data === undefined || data?.data === null ) {
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