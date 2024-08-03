import { type Dispatch, type SetStateAction, createContext } from 'react'
import { TInfoModal, TMediaCategory, TUserAuth } from '@/types'

export interface GlobalContextType {
  homePageMedia: TMediaCategory[] | []
  setHomePageMedia: Dispatch<SetStateAction<TMediaCategory[]>>
  TVPageMedia: TMediaCategory[] | []
  setTVPageMedia: Dispatch<SetStateAction<TMediaCategory[]>>
  MoviesPageMedia: TMediaCategory[] | []
  setMoviesPageMedia: Dispatch<SetStateAction<TMediaCategory[]>>
  infoModalStats: TInfoModal
  setInfoModalStats: Dispatch<SetStateAction<TInfoModal>>
  userAuth: TUserAuth
  setUserAuth: Dispatch<SetStateAction<TUserAuth>>
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
