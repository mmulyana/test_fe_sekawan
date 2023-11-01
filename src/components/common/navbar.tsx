import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='fixed top-0 left-0 h-12 w-full bg-white'>
      <div className='container mx-auto px-4 flex justify-between items-center h-full'>
        <Link href='/' className='text-amber-600'>
          My Restaurant
        </Link>
      </div>
    </div>
  )
}
