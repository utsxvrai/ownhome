import React from 'react'
import spinner from '../assests/svg/spinner.svg'

export default function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0'>
        <div>
            <img src={spinner} alt='loading' className='w-60 h-40 mx-auto mt-10 '/>
        </div>
    </div>
  )
}
