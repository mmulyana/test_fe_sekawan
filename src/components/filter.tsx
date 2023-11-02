'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'

type Props = {
  isOpenNow: boolean
  setIsOpenNow: (param: boolean) => void
  price: number
  setPrice: (val: number) => void
  category: string
  setCategory: (val: string) => void
}
export default function Filter({
  isOpenNow,
  setIsOpenNow,
  price,
  setPrice,
  category,
  setCategory,
}: Props) {
  function handleOpenNow() {
    setIsOpenNow(!isOpenNow)
  }

  function reset() {
    setIsOpenNow(false)
    setPrice(0)
    setCategory('')
  }

  return (
    <div className='flex justify-between items-center py-3 border-b border-gray-300 flex-wrap'>
      <div className='flex items-center gap-4 flex-wrap'>
        <p className='text-gray-600 text-sm w-full lg:w-fit'>Filter By :</p>
        <div className='flex gap-1 items-center ml-2 flex-1 md:flex-auto'>
          <div
            className={[
              'h-4 w-4 rounded-md border cursor-pointer flex items-center justify-center',
              isOpenNow
                ? 'bg-amber-600 border-amber-600 text-white'
                : 'bg-gray-100 border-gray-400/50',
            ].join(' ')}
            onClick={handleOpenNow}
          >
            {!!isOpenNow && <Check height={12} width={12} fontWeight={800} />}
          </div>
          <span
            className='text-sm text-gray-800 cursor-pointer'
            onClick={handleOpenNow}
          >
            Open now
          </span>
        </div>
        <div className=' flex-1 md:flex-auto'>
          <select
            className='px-2 py-1.5 bg-gray-200/90 rounded-md w-24 text-sm'
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          >
            <option value=''>Price</option>
            <option value={10}>{'>'} 10k</option>
            <option value={20}>{'>'} 20k</option>
            <option value={30}>{'>'} 30k</option>
            <option value={40}>{'>'} 40k</option>
            <option value={50}>{'>'} 50k</option>
            <option value={100}>{'>'} 100k</option>
          </select>
        </div>
        <div className=' flex-1 md:flex-auto'>
          <select
            className='px-2 py-1.5 bg-gray-200/90 rounded-md w-32 text-sm'
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value=''>Categories</option>
            <option value=''>Select option</option>
            <option value='javanese'>javanese</option>
            <option value='sundanese'>sundanese</option>
            <option value='chinese'>chinese</option>
            <option value='padang'>padang</option>
            <option value='modern'>modern</option>
          </select>
        </div>
      </div>
      <button
        onClick={reset}
        className='mt-4 md:mt-0 ml-auto md:ml-0 px-4 py-1.5 rounded bg-gray-100 border border-gray-200 text-xs hover:bg-gray-300'
      >
        CLEAR ALL
      </button>
    </div>
  )
}
