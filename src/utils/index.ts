import { TMediaCategory, TMediaItem, TPopulatedMediaItem } from '@/types'
import { getMediaList, getTrendingMedia } from './tmdbApi'

// | Función de utilidad para poblar los items de media
const populateMediaItem = (item: TMediaItem, defaultMediaType?: 'movie' | 'tv'): TPopulatedMediaItem => ({
  ...item,
  isFavorite: false,
  media_type: (item.media_type || defaultMediaType) as 'movie' | 'tv',
  title: item.title || item.name || '',
  original_title: item.original_title || item.original_name || '',
  release_date: item.release_date || item.first_air_date || '',
})

// | Función para crear una categoría de media
export const createMediaCategory = (
  categoryName: string,
  media: TMediaItem[],
  defaultMediaType?: 'movie' | 'tv',
): TMediaCategory => ({
  categoryName,
  media: media.map((item) => populateMediaItem(item, defaultMediaType)),
})

// | Función para obtener los datos de media en la página de inicio
export const fetchHomeMediaData = async () => {
  try {
    const [trendingAllShows, popularTvShows, topRatedTvShows, popularMovies, topRatedMovies] = await Promise.all([
      getTrendingMedia('all', 'week'),
      getMediaList('tv', 'popular'),
      getMediaList('tv', 'top_rated'),
      getMediaList('movie', 'popular'),
      getMediaList('movie', 'top_rated'),
    ])

    return [
      createMediaCategory('En tendencia', trendingAllShows),
      createMediaCategory('Series populares', popularTvShows, 'tv'),
      createMediaCategory('Películas populares', popularMovies, 'movie'),
      createMediaCategory('Series mejor valoradas', topRatedTvShows, 'tv'),
      createMediaCategory('Películas mejor valoradas', topRatedMovies, 'movie'),
    ]
  } catch (error) {
    console.error('Error fetching home page media:', error)
    return []
  }
}
