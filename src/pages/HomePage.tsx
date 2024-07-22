import { useCallback, useContext, useEffect, useState } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { TPopulatedMediaItem } from '@/types'
import { fetchHomeMediaData } from '@/utils'
import { Banner } from '@/components'

export default function HomePage() {
  const { homePageMedia, setHomePageMedia } = useContext(GlobalContext)
  const [bannerMedia, setBannerMedia] = useState<TPopulatedMediaItem | null>(null)

  const selectRandomBanner = useCallback((mediaList: TPopulatedMediaItem[]) => {
    return mediaList[Math.floor(Math.random() * mediaList.length)]
  }, [])
  // # Podemos poner un timeout para que se cambie el banner cada cierto tiempo #####

  // > Pendiente algo aquí
  useEffect(() => {
    // Si ya tenemos los datos de la página de inicio, seleccionamos un banner aleatorio
    if (homePageMedia.length > 0 && homePageMedia[0].media.length > 0) {
      const newBanner = selectRandomBanner(homePageMedia[0].media)
      setBannerMedia(newBanner)
      // > Se debe revisar la funcionalidad real de este bloque de código
      return
    }

    ;(async () => {
      const newHomePageMedia = await fetchHomeMediaData()
      setHomePageMedia(newHomePageMedia)

      if (newHomePageMedia.length > 0 && newHomePageMedia[0].media.length > 0) {
        const newBanner = selectRandomBanner(newHomePageMedia[0].media)
        setBannerMedia(newBanner)
      }
    })()
  }, [fetchHomeMediaData, selectRandomBanner])

  return (
    <section className="flex w-full flex-col space-y-2 border border-green-500 pl-[6%] md:space-y-4 lg:h-[65hv] lg:pb-12">
      <Banner media={bannerMedia} />
    </section>
  )
}
