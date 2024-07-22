import { type Dispatch, type SetStateAction, createContext } from 'react'
import { TMediaCategory } from '@/types'

export interface GlobalContextType {
  // tipar correctamente los siguientes valores
  homePageMedia: TMediaCategory[] | []
  setHomePageMedia: Dispatch<SetStateAction<TMediaCategory[]>>
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
