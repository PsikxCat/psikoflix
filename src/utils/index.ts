import { TMediaCategory, TMediaItem, TPopulatedMediaItem } from '@/types'
import { getMediaByGenre, getMediaList, getTrendingMedia } from './tmdbApi'

// | Función para truncar un texto a un número de palabras
export const truncateText = (text: string, wordsCount: number): string => {
  const words = text.split(' ')
  if (words.length <= wordsCount) return text

  return `${words.slice(0, wordsCount).join(' ')}...`
}

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

// | Función para obtener los datos de media en la página de series
export const fetchTVMediaData = async () => {
  try {
    const [trendingTvShows, topRatedTvShows, actionGenre, sciFiGenre, animationGenre, comedyGenre, crimeGenre] =
      await Promise.all([
        getTrendingMedia('tv', 'day'),
        getMediaList('tv', 'top_rated'),
        getMediaByGenre('tv', 10759),
        getMediaByGenre('tv', 10765),
        getMediaByGenre('tv', 16),
        getMediaByGenre('tv', 35),
        getMediaByGenre('tv', 80),
      ])

    return [
      createMediaCategory('En tendencia', trendingTvShows, 'tv'),
      createMediaCategory('Mejor valoradas', topRatedTvShows, 'tv'),
      createMediaCategory('Acción', actionGenre, 'tv'),
      createMediaCategory('Ciencia ficción', sciFiGenre, 'tv'),
      createMediaCategory('Animación', animationGenre, 'tv'),
      createMediaCategory('Comedia', comedyGenre, 'tv'),
      createMediaCategory('Crimen', crimeGenre, 'tv'),
    ]
  } catch (error) {
    console.error('Error fetching TV page media:', error)
    return []
  }
}

// | Función para obtener los datos de media en la página de películas
export const fetchMoviesMediaData = async () => {
  try {
    const [trendingMovies, topRatedMovies, actionGenre, sciFiGenre, animationGenre, thrillerGenre, comedyGenre] =
      await Promise.all([
        getTrendingMedia('movie', 'day'),
        getMediaList('movie', 'top_rated'),
        getMediaByGenre('movie', 28),
        getMediaByGenre('movie', 878),
        getMediaByGenre('movie', 16),
        getMediaByGenre('movie', 53),
        getMediaByGenre('movie', 35),
      ])

    return [
      createMediaCategory('En tendencia', trendingMovies, 'movie'),
      createMediaCategory('Mejor valoradas', topRatedMovies, 'movie'),
      createMediaCategory('Acción', actionGenre, 'movie'),
      createMediaCategory('Ciencia ficción', sciFiGenre, 'movie'),
      createMediaCategory('Animación', animationGenre, 'movie'),
      createMediaCategory('Thriller', thrillerGenre, 'movie'),
      createMediaCategory('Comedia', comedyGenre, 'movie'),
    ]
  } catch (error) {
    console.error('Error fetching Movies page media:', error)
    return []
  }
}
