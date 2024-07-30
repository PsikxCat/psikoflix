import { useContext, useEffect, useState } from 'react'
import { CircleX } from 'lucide-react'
import ReactPlayer from 'react-player'

import { GlobalContext } from '@/context/GlobalContext'
import { TMediaCategory, TMediaVideo } from '@/types'
import { getMediaDetails } from '@/utils/tmdbApi'
import { LoaderSpinner, MediaCard } from '@/components'
import { fetchSimilarMediaData } from '@/utils'

export default function MoreInfoModal() {
  const { infoModalStats, setInfoModalStats } = useContext(GlobalContext)
  const [actualMediaVideo, setActualMediaVideo] = useState<TMediaVideo | null>(null)
  const [similarMedia, setSimilarMedia] = useState<TMediaCategory[] | null>(null)
  const [pageLoader, setPageLoader] = useState<boolean>(true)

  useEffect(() => {
    if (!infoModalStats.isOpen || !infoModalStats.mediaType || !infoModalStats.id) {
      setPageLoader(false)
      return
    }

    ;(async () => {
      setPageLoader(true)
      const { mediaType, id } = infoModalStats

      const mediaVideosById: TMediaVideo[] = await getMediaDetails(mediaType as string, id!.toString())

      if (mediaVideosById?.length) {
        const details =
          mediaVideosById.find((video) => video.type === 'Teaser') ||
          mediaVideosById[0] ||
          mediaVideosById.find((video) => video.type === 'Trailer')

        setActualMediaVideo(details)
      } else setActualMediaVideo(null)

      const newSimilarMedia = await fetchSimilarMediaData(mediaType as string, id!.toString())
      setSimilarMedia(newSimilarMedia)

      setTimeout(() => setPageLoader(false), 200)
    })()
  }, [infoModalStats])

  if (pageLoader) {
    return (
      <section className="flex_center_col fixed inset-0 z-50 overflow-hidden overflow-y-scroll bg-black bg-opacity-90 scrollbar-hide">
        <LoaderSpinner />
      </section>
    )
  }

  return (
    <section className="flex_center_col fixed inset-0 z-50 bg-black bg-opacity-90 p-5">
      <>
        {/* Overlay */}
        <div
          className="absolute inset-0 z-[60] cursor-pointer"
          onClick={() => setInfoModalStats({ isOpen: false, mediaType: null, id: null })}
        />
        {/* Boton cerrar modal */}
        <div className="absolute right-7 top-7 z-[70]">
          <CircleX
            className="h-8 w-8 cursor-pointer text-white hover:text-accent"
            onClick={() => setInfoModalStats({ isOpen: false, mediaType: null, id: null })}
          />
        </div>
      </>

      {/* Contenido */}
      <section className="z-[70] w-full max-w-[900px] overflow-hidden overflow-y-scroll scrollbar-hide">
        <h1 className="text_shadow my-3 cursor-pointer text-fluid-title font-semibold leading-[70px]">
          {actualMediaVideo?.name}
        </h1>

        {/* Video */}
        <div className="w-full max-w-[900px]">
          <div className="flex_center z-[70] aspect-video h-full max-h-[500px] w-full">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${actualMediaVideo?.key || 'cFS4Zcd_kb8'}`}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>

        {/* Similares */}
        <div className="z-[70] w-full max-w-[900px] rounded-b-md bg-dark-gray py-8 sm:p-8">
          <h2 className="text_shadow mt-3 cursor-pointer text-fluid-subtitle font-semibold">
            {similarMedia?.[0].categoryName}
          </h2>

          <div className="grid grid-cols-2 items-center gap-3 scrollbar-hide sm:grid-cols-3 md:p-2">
            {similarMedia?.[0].media.map((item) => <MediaCard key={item.id} mediaItem={item} isFromModal />)}

            {similarMedia?.[0].media?.length === 0 && (
              <div className="flex_center_col col-span-3">
                <h3 className="text_shadow text-fluid-subtitle font-semibold">No se encontraron resultados</h3>
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}
