import { useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Outlet } from 'react-router-dom'

import { GlobalContext } from '@/context/GlobalContext'
import { auth, getFavorites } from '@/utils/firebase'
import { LoginPage } from '@/pages'
import { Footer, LoaderSpinner, MoreInfoModal, Navbar } from '@/components'

export default function Layout() {
  const { userAuth, setUserAuth, infoModalStats } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cancelAuthListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const favorites = await getFavorites(user.uid)

        setUserAuth({
          isUserLogged: true,
          userId: user.uid,
          favorites,
        })
      } else {
        setUserAuth({
          isUserLogged: false,
          userId: null,
          favorites: [],
        })
      }

      setIsLoading(false)
    })

    // Limpieza del efecto
    return () => cancelAuthListener()
  }, [])

  if (isLoading) {
    return <LoaderSpinner />
  }
  if (!userAuth.isUserLogged) return <LoginPage />

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
