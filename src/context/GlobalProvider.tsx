import { useState } from 'react'
import { GlobalContext } from './GlobalContext'
import { TMediaCategory, TInfoModal, TUserAuth } from '@/types'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [homePageMedia, setHomePageMedia] = useState<TMediaCategory[] | []>([])
  const [TVPageMedia, setTVPageMedia] = useState<TMediaCategory[] | []>([])
  const [MoviesPageMedia, setMoviesPageMedia] = useState<TMediaCategory[] | []>([])
  const [userAuth, setUserAuth] = useState<TUserAuth>({
    isUserLogged: false,
    userId: null,
    favorites: null,
  })
  const [infoModalStats, setInfoModalStats] = useState<TInfoModal>({
    isOpen: false,
    mediaType: null,
    id: null,
  })

  return (
    <GlobalContext.Provider
      value={{
        homePageMedia,
        setHomePageMedia,
        TVPageMedia,
        setTVPageMedia,
        MoviesPageMedia,
        setMoviesPageMedia,
        infoModalStats,
        setInfoModalStats,
        userAuth,
        setUserAuth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
