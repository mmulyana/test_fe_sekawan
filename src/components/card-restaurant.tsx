'use client'

import { Restaurant } from '@/model/restaurant'
import { useEffect, useState } from 'react'
import Card from './common/card'
import { getRestaurants } from '@/services/restaurant-service'

type Props = {
  category: string
  price: number
  isOpenNow: boolean
}

export default function CardRestaurtant({ category, price, isOpenNow }: Props) {
  const [data, setData] = useState<Restaurant[]>([])
  const [filteredData, setFilteredData] = useState<Restaurant[]>([])

  useEffect(() => {
    async function getData() {
      const data = await getRestaurants(category)
      if (data.status === 200) {
        setData(data.data as Restaurant[])
      }
    }

    getData()
  }, [category])

  useEffect(() => {
    if (price == 0) return
    const newData = data.filter((d) => d.rangePrice == price)
    setFilteredData(newData)
  }, [price, data])

  return (
    <div className='mt-3 pb-10'>
      <p className='text-xl capitalize text-gray-900'>All restaurant</p>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {price > 0 ? (
          <RenderData data={filteredData} isOpenNow={isOpenNow} />
        ) : (
          <RenderData data={data} isOpenNow={isOpenNow} />
        )}
      </div>
    </div>
  )
}

function RenderData({
  data,
  isOpenNow,
}: {
  data: Restaurant[]
  isOpenNow: boolean
}) {
  if (!!isOpenNow) {
    return (
      <>
        {data
          .filter((d) => d.isOpenNow === true)
          .map((d) => (
            <Card
              id={d.id}
              key={d.id}
              url={d.url}
              name={d.name}
              rating={d.rating}
              category={d.category}
              isOpenNow={d.isOpenNow}
              rangePrice={d.rangePrice}
            />
          ))}
      </>
    )
  }

  return (
    <>
      {data.map((d) => (
        <Card
          id={d.id}
          key={d.id}
          url={d.url}
          name={d.name}
          rating={d.rating}
          category={d.category}
          isOpenNow={d.isOpenNow}
          rangePrice={d.rangePrice}
        />
      ))}
    </>
  )
}
