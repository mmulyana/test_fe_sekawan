import { Review, createReview } from '@/services/review-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

type State = {
  name: string
  text: string
  rating: number
}

const schema = z.object({
  name: z.string().min(1),
  rating: z.number().min(1),
  text: z.string().min(1),
})

export default function FormReview({
  id,
  setIsOpen,
  setData,
}: {
  id: string
  setIsOpen: (value: boolean) => void
  setData: (prev: any) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<State>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      rating: 1,
      text: '',
    },
  })

  const onSubmit: SubmitHandler<State> = async (data) => {
    try {
      const payload = {
        ...data,
        id_res: id,
      }
      const res = await createReview(payload as Review)
      if (res.status === 200) {
        setData((prev: any) => [...prev, data])
        setIsOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pt-5'>
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
          <label className='text-sm text-gray-700'>message</label>
          <textarea
            {...register('text')}
            className='px-2.5 py-1.5 rounded bg-gray-100 w-full'
          ></textarea>
          {errors.text && (
            <p className='absolute text-xs text-red-500 -bottom-[18px]'>
              *{errors.text.message}
            </p>
          )}
        </div>
        <button
          className='bg-amber-600 text-white rounded py-1.5 w-full'
          type='submit'
        >
          Send Review
        </button>
      </form>
    </div>
  )
}
