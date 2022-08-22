import React from 'react'
import { useStateValue } from '../StateProvider'

function Farmer() {
  const [{user}, dispatch] = useStateValue()
  return (
    <div className='container m-auto h-fit my-4 py-4 flex flex-col items-center justify-center'>
        <div className='bg-white rounded-xl shadow-lg flex flex-col overflow-hidden'>
            <div className='w-full bg-[#24292f] flex items-center justify-center text-white text-2xl'>
              Hello {user}
            </div>
        </div>
    </div>
  )
}

export default Farmer