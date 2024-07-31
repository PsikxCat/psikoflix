import { useState } from 'react'
import { GlobalContext } from './GlobalContext'
import { TMediaCategory, TInfoModal } from '@/types'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [homePageMedia, setHomePageMedia] = useState<TMediaCategory[] | []>([])
  const [TVPageMedia, setTVPageMedia] = useState<TMediaCategory[] | []>([])
  const [MoviesPageMedia, setMoviesPageMedia] = useState<TMediaCategory[] | []>([])
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false)
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
        isUserLogged,
        setIsUserLogged,
        infoModalStats,
        setInfoModalStats,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
