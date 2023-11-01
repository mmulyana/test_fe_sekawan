'use client'

import { Restaurtant } from '@/model/restaurant'
import { Star } from 'lucide-react'
import Link from 'next/link'

export default function Card({
  name,
  rating,
  catagory,
  rangePrice,
  isOpenNow,
  id,
}: Restaurtant) {
  return (
    <div className='h-fit w-full'>
      <div className='h-40 bg-gray-200'></div>
      <p className='text-lg font-medium text-gray-900 mt-1'>{name}</p>
      <div className='mt-1 flex gap-1'>
        {[1, 2, 3, 4, 5].map((r) => {
          if (r <= rating) {
            return <Star key={r} width={12} height={12} fill='#f59e0b' stroke='#f59e0b' />
          }
          return (
            <Star
              key={r}
              width={12}
              height={12}
              className='text-gray-400'
            />
          )
        })}
      </div>
      <div className='flex justify-between items-center mt-1'>
        <div className='flex gap-2 items-center'>
          <span className='text-sm text-gray-400'>{catagory}</span>
          <div className='w-1.5 h-1.5 rounded-full bg-gray-800' />
          <span className='text-sm text-gray-400'>{rangePrice} k</span>
        </div>
        {isOpenNow ? (
          <div className='flex gap-1 items-center'>
            <div className='w-2 h-2 rounded-full bg-green-500' />
            <span className='text-xs uppercase text-gray-400'>open now</span>
          </div>
        ) : (
          <div className='flex gap-1 items-center'>
            <div className='w-2 h-2 rounded-full bg-red-500' />
            <span className='text-xs uppercase text-gray-400'>closed</span>
          </div>
        )}
      </div>
      <Link
        className='block mt-1.5 w-full py-3 bg-slate-900 text-white uppercase text-center text-sm'
        href={`/detail/${id}`}
      >
        learn more
      </Link>
    </div>
  )
}
