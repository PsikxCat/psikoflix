import { TMediaCategory } from '@/types'
import MediaCard from './MediaCard'

interface IMediaSwiperProps {
  mediaData: TMediaCategory
}

export default function MediaCarousel({ mediaData }: IMediaSwiperProps) {
  const { categoryName, media } = mediaData

  return (
    <section className="h-40 space-y-0.5 px-4 md:space-y-2">
      <h2 className="text_shadow text-fluid-subtitle font-semibold">{categoryName}</h2>

      <div className="relative md:ml-2">
        <div className="flex items-center space-x-0.5 overflow-x-scroll !scrollbar-track-transparent !scrollbar-thumb-[#DC262682] scrollbar-hide md:space-x-2.5 md:p-2 md:hover:!scrollbar-thin">
          {media &&
            media.length &&
            media
              .filter((item) => item.backdrop_path !== null && item.poster_path !== null)
              .map((item) => <MediaCard key={item.id} mediaItem={item} />)}
        </div>
      </div>
    </section>
  )
}
