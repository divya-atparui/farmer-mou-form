import React from 'react'
import JsonDataKannadaView from '../components/JsonDataKannadaView'
import { mockLandDetailsResponse } from '@/mocks/mockLandDetails'

const TestPage = () => {
  return (
    <div className='max-w-5xl mx-auto'>
        <JsonDataKannadaView data={mockLandDetailsResponse} />
    </div>
  )
}

export default TestPage