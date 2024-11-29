"use client"
import { useGetUserLandDetails } from '@/api/data/use-get-user-land-details'
import React from 'react'
import { DataTable } from './land-details/data-table'
import { columns } from './land-details/columns'

const Dashboard = () => {
  const{data} = useGetUserLandDetails()
  if (data === undefined) {
    return null;
  }
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export default Dashboard