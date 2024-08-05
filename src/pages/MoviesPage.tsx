import { useCallback, useContext, useEffect, useState } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { TMediaCategory, TPopulatedMediaItem } from '@/types'
import { useConfigureFavorites } from '@/hooks/useConfigureFavorites'
import { fetchMoviesMediaData } from '@/utils'
import { Banner, LoaderSpinner, MediaCarousel } from '@/components'

export default function MoviesPage() {
  const { MoviesPageMedia, setMoviesPageMedia, userAuth } = useContext(GlobalContext)
  const [bannerMedia, setBannerMedia] = useState<TPopulatedMediaItem | null>(null)
  const [pageLoader, setPageLoader] = useState<boolean>(true)

  const selectRandomBanner = useCallback((mediaList: TPopulatedMediaItem[]) => {
    return mediaList[Math.floor(Math.random() * mediaList.length)]
  }, [])

  const configureFavorites = useConfigureFavorites()

  useEffect(() => {
    setPageLoader(true)

    // Si ya tenemos los datos de la página de inicio, seleccionamos un banner aleatorio
    if (MoviesPageMedia.length > 0 && MoviesPageMedia[0].media.length > 0) {
      const newBanner = selectRandomBanner(MoviesPageMedia[0].media)
      setBannerMedia(newBanner)
      setPageLoader(false)
      return
    }

    ;(async () => {
      const newMoviesPageMedia = await fetchMoviesMediaData()

      const configureMedia: TMediaCategory[] = newMoviesPageMedia.map((category) => ({
        ...category,
        media: configureFavorites(category.media),
      }))

      setMoviesPageMedia(configureMedia)

      if (configureMedia.length > 0 && configureMedia[0].media.length > 0) {
        const newBanner = selectRandomBanner(configureMedia[0].media)
        setBannerMedia(newBanner)
      }
    })()

    setTimeout(() => setPageLoader(false), 500)
  }, [configureFavorites])

  useEffect(() => {
    if (userAuth.favorites?.length) {
      setMoviesPageMedia((prev) =>
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
        {MoviesPageMedia?.length &&
          MoviesPageMedia.map((categorie) => <MediaCarousel key={categorie.categoryName} mediaData={categorie} />)}
      </section>
    </section>
  )
}
