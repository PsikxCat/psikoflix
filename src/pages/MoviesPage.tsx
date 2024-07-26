import { useCallback, useContext, useEffect, useState } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { TPopulatedMediaItem } from '@/types'
import { fetchHomeMediaData, fetchMoviesMediaData } from '@/utils'
import { Banner, LoaderSpinner, MediaCarousel } from '@/components'

export default function MoviesPage() {
  const { MoviesPageMedia, setMoviesPageMedia } = useContext(GlobalContext)
  const [bannerMedia, setBannerMedia] = useState<TPopulatedMediaItem | null>(null)
  const [pageLoader, setPageLoader] = useState<boolean>(true)

  const selectRandomBanner = useCallback((mediaList: TPopulatedMediaItem[]) => {
    return mediaList[Math.floor(Math.random() * mediaList.length)]
  }, [])

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
      setMoviesPageMedia(newMoviesPageMedia)

      if (newMoviesPageMedia.length > 0 && newMoviesPageMedia[0].media.length > 0) {
        const newBanner = selectRandomBanner(newMoviesPageMedia[0].media)
        setBannerMedia(newBanner)
      }
    })()

    setTimeout(() => setPageLoader(false), 500)
  }, [fetchHomeMediaData, selectRandomBanner])

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
