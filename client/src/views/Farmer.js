import React from 'react'
import { useStateValue } from '../StateProvider'
import {AiOutlinePlus} from 'react-icons/ai'

function Farmer() {
  const [{user}, dispatch] = useStateValue()
  return (
    <div className='container m-auto h-fit my-4 py-4 flex flex-col items-center justify-center'>
        <div className='w-3/4 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden'>
            <div className='w-full bg-[#24292f] flex items-center justify-center text-white text-4xl font-bold py-5'>
              Hello, {user}
            </div>
            <div className='flex flex-row w-full justify-center px-8 py-5 items-center'>
              <button className='w-96 h-96 rounded-lg bg-white shadow-xl flex flex-col items-center justify-center text-5xl font-thin'>
                  Add Produce
                  <AiOutlinePlus className='text-5xl font-thin mt-5' size={50}/>
              </button>
            </div>
        </div>
    </div>
  )
}

export default Farmer