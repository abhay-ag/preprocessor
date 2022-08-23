import React from 'react'

function Bidcard({_id ,qty, amt, status}) {
  return (
    <div className='w-64 h-96 rounded-lg space-y-5 bg-white flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold'>{qty}</h1>
        <h1 className='text-3xl font-thin'>Rs. {amt}</h1>
        <button className={`${status === "Open" ? 'bg-[#00B74A]' : 'bg-[#4f4f4f]'} rounded-lg text-2xl font-bold text-white px-4 py-1`}>
            {status === "Open" ? 'Open' : 'Closed'}
        </button>
    </div>
  )
}

export default Bidcard