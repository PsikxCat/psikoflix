import { useCallback, useContext, useEffect, useState } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { TMediaCategory, TPopulatedMediaItem } from '@/types'
import { useConfigureFavorites } from '@/hooks/useConfigureFavorites'
import { fetchHomeMediaData } from '@/utils'
import { Banner, LoaderSpinner, MediaCarousel } from '@/components'

export default function HomePage() {
  const { homePageMedia, setHomePageMedia, userAuth } = useContext(GlobalContext)
  const [bannerMedia, setBannerMedia] = useState<TPopulatedMediaItem | null>(null)
  const [pageLoader, setPageLoader] = useState<boolean>(true)

  const selectRandomBanner = useCallback((mediaList: TPopulatedMediaItem[]) => {
    return mediaList[Math.floor(Math.random() * mediaList.length)]
  }, [])

  const configureFavorites = useConfigureFavorites()

  useEffect(() => {
    setPageLoader(true)

    // Si ya tenemos los datos de la página de inicio, seleccionamos un banner aleatorio
    if (homePageMedia.length > 0 && homePageMedia[0].media.length > 0) {
      const newBanner = selectRandomBanner(homePageMedia[0].media)
      setBannerMedia(newBanner)
      setPageLoader(false)
      return
    }

    ;(async () => {
      const newHomePageMedia = await fetchHomeMediaData()

      const configuredMedia: TMediaCategory[] = newHomePageMedia.map((category) => ({
        ...category,
        media: configureFavorites(category.media),
      }))

      setHomePageMedia(configuredMedia)

      if (configuredMedia.length > 0 && configuredMedia[0].media.length > 0) {
        const newBanner = selectRandomBanner(configuredMedia[0].media)
        setBannerMedia(newBanner)
      }
    })()

    setTimeout(() => setPageLoader(false), 300)
  }, [configureFavorites])

  useEffect(() => {
    if (userAuth.favorites?.length) {
      setHomePageMedia((prev) =>
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
        {homePageMedia?.length &&
          homePageMedia.map((categorie) => <MediaCarousel key={categorie.categoryName} mediaData={categorie} />)}
      </section>
    </section>
  )
}
