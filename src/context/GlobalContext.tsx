import { type Dispatch, type SetStateAction, createContext } from 'react'
import { TMediaCategory } from '@/types'

export interface GlobalContextType {
  homePageMedia: TMediaCategory[] | []
  setHomePageMedia: Dispatch<SetStateAction<TMediaCategory[]>>
  TVPageMedia: TMediaCategory[] | []
  setTVPageMedia: Dispatch<SetStateAction<TMediaCategory[]>>
  MoviesPageMedia: TMediaCategory[] | []
  setMoviesPageMedia: Dispatch<SetStateAction<TMediaCategory[]>>
  isUserLogged: boolean
  setIsUserLogged: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
