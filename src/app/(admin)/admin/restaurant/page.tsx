'use client'

import { RestaurantI, getRestaurants } from '@/services/restaurant-service'
import { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState<RestaurantI[]>([])

  useEffect(() => {
    async function getData() {
      const data = await getRestaurants()
      if (data.status === 200) {
        setData(data.data as RestaurantI[])
      }
    }

    getData()
  }, [])

  console.log(data)
  return <p>restaurant admin</p>
}
