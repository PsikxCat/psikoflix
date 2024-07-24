import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { GlobalContext } from '@/context/GlobalContext'
import { Footer, Navbar } from '@/components'
import { LoginPage } from '@/pages'

export default function Layout() {
  const { isUserLogged } = useContext(GlobalContext)
  console.log('logueado?', isUserLogged)

  if (!isUserLogged) return <LoginPage />

  return (
    <section className="flex_center_col min-h-[100svh]">
      <Navbar />

      <section className="flex w-full flex-1 flex-col pb-20">
        {/* Outlet es un componente especial de react-router-dom que renderiza el componente correspondiente a la ruta actual */}
        <Outlet />
      </section>

      <Footer />
    </section>
  )
}
