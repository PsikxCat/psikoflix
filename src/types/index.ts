export type TMediaItem = {
  adult: boolean
  backdrop_path: string
  first_air_date?: string | null // solo para series
  release_date?: string | null // solo para películas
  genre_ids: number[]
  id: number
  media_type: string // Este valor no viene en las respuestas de peticiones tv y movie, solo en all. Por lo cual se debe agregar manualmente de ser necesario
  name?: string | null // solo para series
  title?: string | null // solo para películas
  original_name?: string | null // solo para series
  original_title?: string | null // solo para películas
  origin_country?: string[] | null // solo para series
  original_language: string
  overview: string
  popularity: number
  poster_path: string
  video: boolean | null // solo para películas
  vote_average: number
  vote_count: number
}

// Especificamente para los valores que se agregan manualmente
type TCustomData = {
  isFavorite: boolean
}

// Ademas de hacer el merge de los tipos, para este punto, fusionamos los valores similares entre series y películas
export type TPopulatedMediaItem = TMediaItem &
  TCustomData & {
    media_type: 'movie' | 'tv'
    title: string
    original_title: string
    release_date: string
  }

export type TMediaCategory = {
  categoryName: string
  media: TPopulatedMediaItem[]
}

export type TMediaVideo = {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  official: boolean
  published_at: string
  site: string
  size: number
  type: string
}

export type TInfoModal = {
  isOpen: boolean
  mediaType: string | null
  id: number | null
}
