import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Plus, Check, InfoIcon, PlayCircle } from 'lucide-react'

import { GlobalContext } from '@/context/GlobalContext'
import { TFavoriteMedia, TPopulatedMediaItem } from '@/types'
import { addFavorite, removeFavorite } from '@/utils/firebase'

interface IMediaCardProps {
  mediaItem: TPopulatedMediaItem | TFavoriteMedia
  isFromModal?: boolean
}

export default function MediaCard({ mediaItem, isFromModal }: IMediaCardProps) {
  const { setInfoModalStats, userAuth, setUserAuth } = useContext(GlobalContext)
  const navigate = useNavigate()
  const mediaType = mediaItem?.media_type as string

  const handlePlayClick = () => {
    navigate(`/watch/${mediaType}/${mediaItem?.id}${mediaItem?.backdrop_path || mediaItem?.poster_path}`)

    setInfoModalStats({
      isOpen: false,
      mediaType: null,
      id: null,
    })
  }

  const handleFavoriteClick = async () => {
    if (!userAuth.isUserLogged) return

    if (!mediaItem.isFavorite) {
      setUserAuth((prev) => ({
        ...prev,
        favorites: [
          ...prev.favorites!,
          {
            id: mediaItem.id,
            isFavorite: true,
            media_type: mediaItem.media_type,
            title: mediaItem.title,
            backdrop_path: mediaItem.backdrop_path,
            poster_path: mediaItem.poster_path,
          },
        ],
      }))
      toast.success('Agregado a favoritos')

      await addFavorite(userAuth.userId!, mediaItem)
    } else {
      setUserAuth((prev) => ({
        ...prev,
        favorites: prev.favorites!.filter((fav) => fav.id !== mediaItem.id),
      }))

      toast.error('Eliminado de favoritos')

      await removeFavorite(userAuth.userId!, mediaItem.id)
    }
  }

  return (
    <section className="group relative h-28 min-w-[180px] max-w-[440px] cursor-pointer rounded-md transition-all duration-500 hover:z-[9] hover:scale-110 md:h-36 md:min-w-[260px]">
      <h3 className="text_shadow absolute left-0 right-0 top-0 flex cursor-default rounded-t-md bg-gradient-to-l from-[#14141499] to-transparent p-2 text-sm font-bold text-white group-hover:hidden">
        {mediaItem.title}
      </h3>

      {/* Imagen */}
      {!isFromModal ? (
        <Link
          to={`/watch/${mediaType}/${mediaItem.id}${mediaItem.poster_path || mediaItem.backdrop_path}`}
          className="no_drag"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${mediaItem.backdrop_path || mediaItem.poster_path}`}
            alt={mediaItem.title}
            className="no_drag h-full w-full rounded-md object-cover"
          />
        </Link>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500/${mediaItem.poster_path || mediaItem.backdrop_path}`}
          alt={mediaItem.title}
          className="no_drag h-full w-full rounded-md object-cover"
          onClick={handlePlayClick}
        />
      )}

      {/* Botones */}
      <div className="flex_center absolute bottom-0 hidden w-full pb-2">
        {mediaItem.isFavorite ? (
          <Check
            className="svg_shadow z-10 hidden h-11 w-11 cursor-pointer p-1 text-green-500 opacity-50 group-hover:flex hover:opacity-100"
            onClick={() => handleFavoriteClick()}
          />
        ) : (
          <Plus
            className="svg_shadow z-10 hidden h-11 w-11 cursor-pointer p-1 text-white/50 group-hover:flex hover:text-primary"
            onClick={() => handleFavoriteClick()}
          />
        )}

        {!isFromModal ? (
          <Link
            to={`/watch/${mediaType}/${mediaItem?.id}${mediaItem?.poster_path || mediaItem?.backdrop_path}`}
            className="z-10"
          >
            <PlayCircle className="svg_shadow z-10 mr-1 hidden h-11 w-11 cursor-pointer p-1 text-white/50 group-hover:flex hover:text-primary" />
          </Link>
        ) : (
          <PlayCircle
            className="svg_shadow z-10 mr-1 hidden h-11 w-11 cursor-pointer p-1 text-white/50 group-hover:flex hover:text-primary"
            onClick={handlePlayClick}
          />
        )}

        <InfoIcon
          className="svg_shadow z-10 hidden h-11 w-11 cursor-pointer p-1 text-white/50 group-hover:flex hover:text-primary"
          onClick={() =>
            setInfoModalStats({
              isOpen: true,
              mediaType: mediaType,
              id: mediaItem?.id as number,
            })
          }
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-md bg-gradient-to-t from-[#141414cc] to-transparent" />
    </section>
  )
}
