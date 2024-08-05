// hooks/useConfigureFavorites.ts
import { useCallback, useContext } from 'react'
import { GlobalContext } from '@/context/GlobalContext'
import { TPopulatedMediaItem } from '@/types'

export const useConfigureFavorites = () => {
  const { userAuth } = useContext(GlobalContext)

  const configureFavorites = useCallback(
    (mediaList: TPopulatedMediaItem[]): TPopulatedMediaItem[] => {
      if (!userAuth.favorites) return mediaList

      return mediaList.map((media) => ({
        ...media,
        isFavorite:
          userAuth.favorites?.some((fav) => fav.id === media.id && fav.media_type === media.media_type) || false,
      }))
    },
    [userAuth.favorites],
  )

  return configureFavorites
}
