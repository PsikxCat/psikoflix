import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { PlayCircle, InfoIcon } from 'lucide-react'

import { GlobalContext } from '@/context/GlobalContext'
import { TPopulatedMediaItem } from '@/types'
import { truncateText } from '@/utils'

interface IBannerProps {
  media: TPopulatedMediaItem | null
}

export default function Banner({ media }: IBannerProps) {
  const { setInfoModalStats } = useContext(GlobalContext)
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

  return (
    <section className="mb-24 flex flex-col space-y-6 pl-[6%] lg:h-[65hv]">
      {/* imagen */}
      <div className="absolute left-0 top-0 -z-10 h-[95vh] w-full">
        <img
          src={`${BASE_URL}${media?.backdrop_path || media?.poster_path}`}
          alt="banner"
          className="mask_gradient h-full w-full object-cover"
        />
      </div>

      <h1 className="text_shadow pt-10 text-fluid-title font-bold leading-none">{media?.title}</h1>

      <p className="text_shadow max-w-xs text-fluid-base md:max-w-lg">
        {media?.overview && truncateText(media.overview as string, 80)}
      </p>

      {/* botones */}
      <div className="flex space-x-3 pt-1">
        <Link to={`/watch/${media?.media_type}/${media?.id}${media?.poster_path || media?.backdrop_path}`}>
          <button className="flex cursor-pointer items-center space-x-2 rounded-md bg-accent px-4 py-2 text-fluid-btn text-white transition hover:opacity-75">
            <PlayCircle className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8" />
            <span className="pr-1">Play</span>
          </button>
        </Link>

        <button
          className="flex cursor-pointer items-center space-x-2 rounded-md bg-primary px-4 py-2 text-fluid-btn text-black transition hover:opacity-75"
          onClick={() =>
            setInfoModalStats({
              isOpen: true,
              mediaType: media?.media_type as string,
              id: media?.id as number,
            })
          }
        >
          <InfoIcon className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8" />
          <span className="pr-1">Más Info</span>
        </button>
      </div>
    </section>
  )
}
