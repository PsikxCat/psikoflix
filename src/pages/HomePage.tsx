import { useContext, useEffect } from 'react'
import { PlayCircle, InfoIcon } from 'lucide-react'

import { GlobalContext } from '@/context/GlobalContext'
import hardcoded_banner from '@/assets/banner.jpg'
import { getMediaList, getTrendingMedia } from '@/utils/tmdbApi'
import { TMediaCategory, TMediaItem, TPopulatedMediaItem } from '@/types'

export default function HomePage() {
  const { homePageMedia, setHomePageMedia } = useContext(GlobalContext)

  // Función de utilidad para poblar los items de media
  const populateMediaItem = (item: TMediaItem, defaultMediaType?: 'movie' | 'tv'): TPopulatedMediaItem => ({
    ...item,
    isFavorite: false,
    media_type: (item.media_type || defaultMediaType) as 'movie' | 'tv',
    title: item.title || item.name || '',
    original_title: item.original_title || item.original_name || '',
    release_date: item.release_date || item.first_air_date || '',
  })

  // Función para crear una categoría de media
  const createMediaCategory = (
    categoryName: string,
    media: TMediaItem[],
    defaultMediaType?: 'movie' | 'tv',
  ): TMediaCategory => ({
    categoryName,
    media: media.map((item) => populateMediaItem(item, defaultMediaType)),
  })

  useEffect(() => {
    if (homePageMedia.length) return
    ;(async () => {
      try {
        const [trendingAllShows, popularTvShows, topRatedTvShows, popularMovies, topRatedMovies] = await Promise.all([
          getTrendingMedia('all', 'week'),
          getMediaList('tv', 'popular'),
          getMediaList('tv', 'top_rated'),
          getMediaList('movie', 'popular'),
          getMediaList('movie', 'top_rated'),
        ])

        setHomePageMedia([
          createMediaCategory('En tendencia', trendingAllShows),
          createMediaCategory('Series populares', popularTvShows, 'tv'),
          createMediaCategory('Películas populares', popularMovies, 'movie'),
          createMediaCategory('Series mejor valoradas', topRatedTvShows, 'tv'),
          createMediaCategory('Películas mejor valoradas', topRatedMovies, 'movie'),
        ])
      } catch (error) {
        console.error('Error fetching home page media:', error)
      }
    })()
  }, [])

  return (
    <section className="flex w-full flex-col space-y-2 border border-green-500 pl-[6%] md:space-y-4 lg:h-[65hv] lg:pb-12">
      <div className="absolute left-0 top-0 -z-10 h-[95vh] w-full">
        <img src={hardcoded_banner} alt="banner" className="mask_gradient h-full w-full object-cover" />
      </div>

      <h1 className="text_shadow pt-10 text-fluid-title font-bold leading-none">Titulo de media</h1>

      <p className="text_shadow line-clamp-5 max-w-xs text-fluid-base md:max-w-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, aliquam dolore. Molestiae explicabo neque ullam
        commodi voluptatem tenetur, magnam sunt modi, et, asperiores ratione totam.
      </p>

      <div className="flex space-x-3 pt-1">
        <button className="flex cursor-pointer items-center space-x-2 rounded-md bg-accent px-4 py-2 text-fluid-btn text-white transition hover:opacity-75">
          <PlayCircle className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8" />
          <span className="pr-1">Play</span>
        </button>

        <button className="flex cursor-pointer items-center space-x-2 rounded-md bg-primary px-4 py-2 text-fluid-btn text-black transition hover:opacity-75">
          <InfoIcon className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8" />
          <span className="pr-1">Más Info</span>
        </button>
      </div>
    </section>
  )
}
