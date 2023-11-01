import Navbar from '@/components/common/navbar'

export default function RestaruantLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className='pt-12 container mx-auto px-4'>{children}</div>
    </>
  )
}
