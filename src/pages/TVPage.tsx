import { useCallback, useContext, useEffect, useState } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { TMediaCategory, TPopulatedMediaItem } from '@/types'
import { useConfigureFavorites } from '@/hooks/useConfigureFavorites'
import { fetchTVMediaData } from '@/utils'
import { Banner, LoaderSpinner, MediaCarousel } from '@/components'

export default function TVPage() {
  const { TVPageMedia, setTVPageMedia, userAuth } = useContext(GlobalContext)
  const [bannerMedia, setBannerMedia] = useState<TPopulatedMediaItem | null>(null)
  const [pageLoader, setPageLoader] = useState<boolean>(true)

  const selectRandomBanner = useCallback((mediaList: TPopulatedMediaItem[]) => {
    return mediaList[Math.floor(Math.random() * mediaList.length)]
  }, [])

  const configureFavorites = useConfigureFavorites()

  useEffect(() => {
    setPageLoader(true)

    // Si ya tenemos los datos de la página TV, seleccionamos un banner aleatorio
    if (TVPageMedia.length > 0 && TVPageMedia[0].media.length > 0) {
      const newBanner = selectRandomBanner(TVPageMedia[0].media)
      setBannerMedia(newBanner)
      setPageLoader(false)
      return
    }

    ;(async () => {
      const newTVPageMedia = await fetchTVMediaData()

      const configuredMedia: TMediaCategory[] = newTVPageMedia.map((category) => ({
        ...category,
        media: configureFavorites(category.media),
      }))

      setTVPageMedia(configuredMedia)

      if (configuredMedia.length > 0 && configuredMedia[0].media.length > 0) {
        const newBanner = selectRandomBanner(configuredMedia[0].media)
        setBannerMedia(newBanner)
      }
    })()

    setTimeout(() => setPageLoader(false), 500)
  }, [configureFavorites])

  useEffect(() => {
    if (userAuth.favorites?.length) {
      setTVPageMedia((prev) =>
        prev.map((category) => ({
          ...category,
          media: configureFavorites(category.media),
        })),
      )
    }
  }, [configureFavorites, userAuth.favorites])

  if (pageLoader) return <LoaderSpinner />

  return (
    <section className="flex w-full flex-col space-y-2 pb-20 md:space-y-4">
      <Banner media={bannerMedia} />

      <section className="space-y-6 md:space-y-24">
        {TVPageMedia?.length &&
          TVPageMedia.map((categorie) => <MediaCarousel key={categorie.categoryName} mediaData={categorie} />)}
      </section>
    </section>
  )
}
