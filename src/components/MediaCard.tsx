import { TPopulatedMediaItem } from '@/types'

interface IMediaCardProps {
  mediaItem: TPopulatedMediaItem
}

export default function MediaCard({ mediaItem }: IMediaCardProps) {
  return (
    <div className="cardWrapper relative h-28 min-w-[180px] max-w-[440px] transform cursor-pointer rounded-md transition duration-500 hover:z-[9] hover:scale-110 md:h-36 md:min-w-[260px]">
      <h3 className="text_shadow absolute left-0 right-0 top-0 flex rounded-t-md bg-gradient-to-l from-[#14141499] to-transparent p-2 text-sm font-bold text-white group-hover:hidden">
        {mediaItem.title}
      </h3>

      <img
        src={`https://image.tmdb.org/t/p/w500/${mediaItem.poster_path}`}
        alt={mediaItem.title}
        className="no_drag h-full w-full rounded-md object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-md bg-gradient-to-t from-[#141414cc] to-transparent" />
    </div>
  )
}
