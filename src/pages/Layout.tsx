import { useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Outlet } from 'react-router-dom'

import { GlobalContext } from '@/context/GlobalContext'
import { Footer, LoaderSpinner, MoreInfoModal, Navbar } from '@/components'
import { LoginPage } from '@/pages'
import { auth } from '@/utils/firebase'

export default function Layout() {
  const { setIsUserLogged, isUserLogged, infoModalStats } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLogged(!!user)
      setIsLoading(false)
    })

    // Limpieza del efecto
    return () => unsubscribe()
  }, [setIsUserLogged])

  if (isLoading) {
    return <LoaderSpinner />
  }
  if (!isUserLogged) return <LoginPage />

  return (
    <section className="flex_center_col min-h-[100svh]">
      <Navbar />

      <section className="flex w-full flex-1 flex-col">
        {/* Outlet es un componente especial de react-router-dom que renderiza el componente correspondiente a la ruta actual */}
        <Outlet />
      </section>

      <Footer />

      {infoModalStats.isOpen && <MoreInfoModal />}
    </section>
  )
}
