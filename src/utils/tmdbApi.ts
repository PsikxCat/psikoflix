import { TMediaItem } from '@/types'

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBlMDIxYzIzMDBhNzQzODRiOTRlZWU4YTUyYzM0ZSIsIm5iZiI6MTcyMTYxOTE3My42NDEwMDUsInN1YiI6IjYyNTk4YjdjZjU0ODM2MTQyNmE2MmIwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IbWSm63tSAwK3VpZirxLeIoEZ5YRccv6ag5XAL5z2Xk',
  },
}

export const getTrendingMedia = async (mediaType: string, timeframe: string): Promise<TMediaItem[]> => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/trending/${mediaType}/${timeframe}?language=es-MX`, options)

    const trendingMedia = await response.json()
    return trendingMedia && trendingMedia.results
  } catch (error) {
    throw new Error('Error fetching trending media ' + error)
  }
}

export const getMediaList = async (mediaType: string, list: string): Promise<TMediaItem[]> => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/${mediaType}/${list}?language=es-MX`, options)

    const mediaList = await response.json()
    return mediaList && mediaList.results
  } catch (error) {
    throw new Error(`Error fetching ${list} media ` + error)
  }
}

export const getMediaByGenre = async (mediaType: string, genreId: number) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/${mediaType}?with_genres=${genreId}&sort_by=popularity.desc&language=es-MX`,
      options,
    )

    const mediaList = await response.json()
    return mediaList && mediaList.results
  } catch (error) {
    throw new Error(`Error fetching ${mediaType} media by genre ` + error)
  }
}

export const getMediaVideosById = async (mediaType: string, id: string) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/${mediaType}/${id}/videos?language=es-MX`, options)

    const mediaVideos = await response.json()
    return mediaVideos && mediaVideos.results
  } catch (error) {
    throw new Error('Error fetching media videos' + error)
  }
}

export const getSimilarMedia = async (mediaType: string, id: string) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/${mediaType}/${id}/similar?language=es-MX`, options)

    const similarMedia = await response.json()
    return similarMedia && similarMedia.results
  } catch (error) {
    throw new Error('Error fetching media videos' + error)
  }
}

export const getSearchMedia = async (query: string) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/search/multi?query=${query}&language=es-MX`, options)
    const searchMedia = await response.json()

    return searchMedia
  } catch (error) {
    throw new Error('Error fetching media videos' + error)
  }
}

// const genresIds = [
//   { id: 28, name: 'Action' },
//   { id: 12, name: 'Adventure' },
//   { id: 16, name: 'Animation' },
//   { id: 35, name: 'Comedy' },
//   { id: 80, name: 'Crime' },
//   { id: 99, name: 'Documentary' },
//   { id: 18, name: 'Drama' },
//   { id: 10751, name: 'Family' },
//   { id: 14, name: 'Fantasy' },
//   { id: 36, name: 'History' },
//   { id: 27, name: 'Horror' },
//   { id: 10402, name: 'Music' },
//   { id: 9648, name: 'Mystery' },
//   { id: 10749, name: 'Romance' },
//   { id: 878, name: 'Science Fiction' },
//   { id: 10770, name: 'TV Movie' },
//   { id: 53, name: 'Thriller' },
//   { id: 10752, name: 'War' },
//   { id: 37, name: 'Western' },
//   { id: 10759, name: 'Action & Adventure' },
//   { id: 10762, name: 'Kids' },
//   { id: 10763, name: 'News' },
//   { id: 10764, name: 'Reality' },
//   { id: 10765, name: 'Sci-Fi & Fantasy' },
//   { id: 10766, name: 'Soap' },
//   { id: 10767, name: 'Talk' },
//   { id: 10768, name: 'War & Politics' }
// ]
