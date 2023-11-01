import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='fixed top-0 left-0 h-12 w-full bg-white'>
      <div className='container mx-auto px-4 flex justify-between items-center h-full'>
        <Link href='/' className='text-amber-600'>
          My Restaurant
        </Link>
        <Link
          href='/create'
          className='px-4 py-1.5 rounded bg-amber-100/60 text-amber-700 text-xs hover:bg-amber-600 hover:text-white'
        >
          Create
        </Link>
      </div>
    </div>
  )
}
