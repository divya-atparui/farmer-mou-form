"use client"

import { EmptyState, LoadingState } from '@/modules/land-details/state-components';
import { useGetUserLandDetails } from '@/api/data/use-get-user-land-details';

import React from 'react'
import { DataTable } from '@/modules/land-details/data-table';
import { columns } from './column';
import DigilockerAuthTrigger from '@/modules/digilocker-auth-trigger';

const UpdatedDashboard = () => {

    const { data, isLoading, error } = useGetUserLandDetails();
  // Use the translated columns hook to get localized columns
//   const columns = useTranslatedColumns();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>
       <div className="flex justify-end p-3">
        <DigilockerAuthTrigger />
      </div>
      <EmptyState />
    </div>
  }

  if (!data?.data || data === undefined || data?.data === null ) {
    return (
      <div>
        <div className="flex justify-end p-3">
          <DigilockerAuthTrigger />
        </div>
        <EmptyState />
      </div>
    )
  }

  const landDetails = data.data;

  

  return (
    <div>
      <div className="flex justify-end p-3">
        <DigilockerAuthTrigger />
      </div>

      <DataTable data={landDetails} columns={columns} />
    </div>
  )
}

export default UpdatedDashboard