import { useState } from 'react'
import { GlobalContext } from './GlobalContext'
import { TMediaCategory } from '@/types'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [homePageMedia, setHomePageMedia] = useState<TMediaCategory[] | []>([])

  console.log('homePageMedia --->', homePageMedia)

  return (
    <GlobalContext.Provider
      value={{
        homePageMedia,
        setHomePageMedia,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
