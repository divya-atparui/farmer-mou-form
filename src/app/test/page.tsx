import React from 'react'
import JsonDataKannadaView from '../../modules/JsonDataKannadaView'
import { mockLandDetailsResponse } from '@/mocks/mockLandDetails'

const TestPage = () => {
  return (
    <div className='max-w-5xl mx-auto'>
        <JsonDataKannadaView data={mockLandDetailsResponse} />
    </div>
  )
}

export default TestPage