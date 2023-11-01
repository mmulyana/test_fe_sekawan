import Link from 'next/link'

export default function NavbarAdmin() {
  return (
    <div className='fixed top-0 left-0 h-12 w-full bg-white'>
      <div className='container mx-auto px-4 flex justify-between items-center h-full'>
        <Link href='/' className='text-amber-600'>
          My Restaurant
        </Link>

        <div className='flex items-center gap-10'>
          <Link className='text-sm hover:text-amber-600' href='/admin/restaurant'>Restaurant</Link>
          <Link className='text-sm hover:text-amber-600' href='/admin/category'>Category</Link>
        </div>
      </div>
    </div>
  )
}
