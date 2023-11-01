import { Star } from 'lucide-react'

export default function Page() {
  return (
    <div className='pt-4 grid grid-cols-[400px_1fr] gap-6'>
      <div className='p-5 bg-white'>
        <div className='h-40 bg-gray-300'></div>
        <div className='mt-4'>
          <p className='text-xl font-medium text-slate-800'>Name</p>
          <p className='mt-2 text-sm text-slate-400'>Rating</p>
          <div className='mt-1'>
            <Star />
          </div>
        </div>
      </div>
      <div className='p-5 bg-white'>
        <p className='font-medium text-slate-800'>Reviews</p>
      </div>
    </div>
  )
}
