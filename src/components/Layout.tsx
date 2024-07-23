import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components'

export default function Layout() {
  return (
    <section className="flex_center_col min-h-[100svh]">
      <Navbar />

      <section className="flex w-full flex-1 flex-col pb-20">
        {/* Outlet es un componente especial de react-router-dom que renderiza el componente correspondiente a la ruta actual */}
        <Outlet />
      </section>

      <section className="flex_center my-8 w-full text-xs">
        <span className="inline-block scale-x-[-1]">©</span>
        {new Date().getFullYear()} Psikocat. Ningún derecho reservado.
      </section>
    </section>
  )
}
