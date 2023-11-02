'use client'

import { Restaurant } from '@/model/restaurant'
import { getDetailRestaurant } from '@/services/restaurant-service'
import { Review, getReviews } from '@/services/review-service'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import FormReview from './form-review'

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Restaurant>()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isOpenReview, setIsOpenReview] = useState<boolean>(false)

  useEffect(() => {
    async function getData() {
      const data = await getDetailRestaurant(params.id)
      if (data.status === 200) {
        setData(data.data as Restaurant)
      }
      const reviews = await getReviews(params.id)
      if (reviews.status === 200) {
        setReviews(reviews.data as Review[])
      }
    }

    getData()
  }, [])

  console.log(reviews)

  return (
    <div className='pt-4 grid grid-cols-[400px_1fr] gap-6'>
      <div className='p-5 bg-white'>
        <div className='h-56 w-full'>
          <img
            src={data?.url}
            alt='image'
            className='w-full h-full object-cover object-center'
          />
        </div>
        <div className='mt-4'>
          <p className='text-lg font-medium text-slate-800'>{data?.name}</p>
          <p className='mt-2 text-sm text-slate-400'>Rating</p>
          <div className='mt-1 flex gap-2'>
            {data?.rating &&
              data.rating !== null &&
              [1, 2, 3, 4, 5].map((r) => {
                if (r <= data.rating) {
                  return (
                    <Star
                      key={r}
                      width={18}
                      height={18}
                      fill='#f59e0b'
                      stroke='#f59e0b'
                    />
                  )
                }
                return (
                  <Star
                    key={r}
                    width={18}
                    height={18}
                    className='text-gray-400'
                  />
                )
              })}
          </div>
        </div>
      </div>
      <div className='p-5 bg-white h-fit'>
        <p className='font-medium text-slate-800'>Reviews</p>

        <div className='mt-4'>
          {reviews.length > 0 &&
            reviews.map((review) => (
              <div key={review.id} className='border-b border-gray-300 py-2'>
                <div className='flex gap-2 items-center'>
                  <p className='text-slate-800'>{review.name}</p>
                  <div className='w-1.5 h-1.5 rounded-full bg-gray-400' />
                  <div className='flex gap-2 items-center'>
                    {[1, 2, 3, 4, 5].map((r) => {
                      if (r <= review.rating) {
                        return (
                          <Star
                            key={r}
                            width={16}
                            height={16}
                            fill='#f59e0b'
                            stroke='#f59e0b'
                          />
                        )
                      }
                      return (
                        <Star
                          key={r}
                          width={16}
                          height={16}
                          className='text-gray-400'
                        />
                      )
                    })}
                  </div>
                </div>
                <p className='mt-1 text-slate-600'>
                  &quot;{review.text}&quot;
                </p>
              </div>
            ))}
        </div>
        {isOpenReview ? (
          <FormReview
            id={params.id}
            setIsOpen={setIsOpenReview}
            setData={setReviews}
          />
        ) : (
          <button
            className='mt-4 bg-amber-200 text-amber-700 rounded px-2 py-0.5 block mx-auto'
            onClick={() => setIsOpenReview(true)}
          >
            Make Review
          </button>
        )}
      </div>
    </div>
  )
}
