'use client'

import { Restaurant } from '@/model/restaurant'
import {
  RestaurantRequest,
  createRestaurant,
  uploadImageRestaurant,
} from '@/services/restaurant-service'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

type State = Omit<Restaurant, 'id'>

const schema = z.object({
  name: z.string().min(1),
  rating: z.number().min(1).max(5),
  category: z.string().min(1),
  rangePrice: z.number().min(1),
  isOpenNow: z.boolean().default(false),
})

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<State>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      rating: 1,
      category: '',
      isOpenNow: false,
      rangePrice: 1,
    },
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit: SubmitHandler<State> = async (data) => {
    try {
      if (!file) {
        alert('image required')
        return
      }
      const url = await uploadImageRestaurant(file)
      if (!url) return
      const payload = {
        ...data,
        url,
      } as RestaurantRequest

      await createRestaurant(payload)

        router.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (file) {
      const newPreview = URL.createObjectURL(file)
      setPreview(newPreview)
    }
  }, [file])

  return (
    <div className='mt-12 p-4 rounded bg-white max-w-[400px] mx-auto mb-10'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div className='h-fit relative'>
          <label className='text-sm text-gray-700'>name</label>
          <input
            {...register('name')}
            type='text'
            className='px-2.5 py-1.5 rounded bg-gray-100 w-full'
          />
          {errors.name && (
            <p className='absolute text-xs text-red-500 -bottom-[18px]'>
              *{errors.name.message}
            </p>
          )}
        </div>
        <div className='h-fit relative'>
          <label className='text-sm text-gray-700'>range price</label>
          <input
            {...register('rangePrice', {
              setValueAs: (value) => Number(value),
            })}
            type='number'
            className='px-2.5 py-1.5 rounded bg-gray-100 w-full'
          />
          {errors.rangePrice && (
            <p className='absolute text-xs text-red-500 -bottom-[18px]'>
              *{errors.rangePrice.message}
            </p>
          )}
        </div>
        <div className='h-fit relative'>
          <label className='text-sm text-gray-700'>rating</label>
          <input
            {...register('rating', {
              setValueAs: (value) => Number(value),
            })}
            type='number'
            className='px-2.5 py-1.5 rounded bg-gray-100 w-full'
          />
          {errors.rating && (
            <p className='absolute text-xs text-red-500 -bottom-[18px]'>
              *{errors.rating.message}
            </p>
          )}
        </div>
        <div className='h-fit relative'>
          <label className='text-sm text-gray-700'>category</label>
          <select
            {...register('category')}
            className='px-2.5 py-1.5 rounded bg-gray-100 w-full'
          >
            <option value=''>Select option</option>
            <option value='javanese'>javanese</option>
          </select>
          {errors.category && (
            <p className='absolute text-xs text-red-500 -bottom-[18px]'>
              *{errors.category.message}
            </p>
          )}
        </div>
        <div className='h-fit relative'>
          <input type='file' onChange={handleChange} />
          {!!file && (
            <img src={preview} className='block mx-auto w-40 h-auto' />
          )}
        </div>
        <div className='h-fit relative flex items-center gap-2'>
          <input
            {...register('isOpenNow')}
            type='checkbox'
            id='isOpenNow'
            className='h-4 w-4 rounded bg-gray-100'
          />
          <label htmlFor='isOpenNow' className='text-sm text-gray-400'>
            is restaurant open?
          </label>
        </div>
        <button
          className='bg-amber-600 text-white rounded py-1.5 w-full'
          type='submit'
        >
          Save
        </button>
      </form>
    </div>
  )
}
