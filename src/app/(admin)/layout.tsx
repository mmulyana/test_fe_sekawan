import NavbarAdmin from '@/components/common/navbar-admin'

export default function AdminLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavbarAdmin />
      <div className='pt-12 container mx-auto px-4'>{children}</div>
    </>
  )
}
