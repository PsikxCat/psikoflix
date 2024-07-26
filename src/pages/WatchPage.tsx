import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { LoaderSpinner } from '@/components'
import { getMediaVideosById } from '@/utils/tmdbApi'
import { TMediaVideo } from '@/types'

export default function WatchPage() {
  const [pageLoader, setPageLoader] = useState<boolean>(true)
  const [mediaVid, setMediaVid] = useState<TMediaVideo | null>(null)
  const { mediaType, id, imgUrl } = useParams<{ mediaType: string; id: string; imgUrl: string }>()

  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

  useEffect(() => {
    if (!mediaType || !id) return
    ;(async () => {
      const mediaVideosById: TMediaVideo[] = await getMediaVideosById(mediaType, id)

      if (mediaVideosById?.length) {
        const video =
          mediaVideosById.find((video) => video.type === 'Trailer') ||
          mediaVideosById.find((video) => video.type === 'Teaser') ||
          mediaVideosById[0]

        setMediaVid(video)
      } else setMediaVid(null)
    })()

    setTimeout(() => setPageLoader(false), 200)
  }, [])

  if (pageLoader) return <LoaderSpinner />

  return (
    <section className="flex_center min-h-[600px] w-full flex-1">
      <div className="flex_center aspect-video h-full max-h-[600px] w-full max-w-[1200px]">
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <img src={`${BASE_URL}/${imgUrl}`} alt="banner" className="mask_gradient h-full w-full object-cover" />
        </div>

        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${mediaVid?.key || 'cFS4Zcd_kb8'}`}
          controls
          width="100%"
          height="100%"
          style={{ maxWidth: '1200px' }}
        />
      </div>
    </section>
  )
}
