'use client'

import { local } from '@/data'
import { Restaurtant } from '@/model/restaurant'
import { useState } from 'react'
import Card from './common/card'

export default function CardRestaurtant() {
  const [data] = useState<Restaurtant[]>(local)

  return (
    <div className='mt-3 pb-10'>
      <p className='text-xl capitalize text-gray-900'>All restaurant</p>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data.map((d) => (
          <Card
            key={d.id}
            id={d.id}
            name={d.name}
            rating={d.rating}
            catagory={d.catagory}
            isOpenNow={d.isOpenNow}
            rangePrice={d.rangePrice}
          />
        ))}
      </div>
    </div>
  )
}
