'use client'

import CardRestaurtant from '@/components/card-restaurant'
import Filter from '@/components/filter'
import { useState } from 'react'

export default function Home() {
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(0)
  const [category, setCategory] = useState<string>('')
  return (
    <>
      <Filter
        isOpenNow={isOpenNow}
        setIsOpenNow={setIsOpenNow}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
      />
      <CardRestaurtant
        isOpenNow={isOpenNow}
        category={category}
        price={price}
      />
    </>
  )
}
