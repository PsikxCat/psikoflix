import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { TMediaCategory } from '@/types'
import { LoaderSpinner, MediaCard } from '@/components'
import { fetchSearchMediaData } from '@/utils'

export default function SearchPage() {
  const [searchMedia, setSearchMedia] = useState<TMediaCategory[] | null>(null)
  const [pageLoader, setPageLoader] = useState<boolean>(true)
  const { query } = useParams<{ query: string }>()

  useEffect(() => {
    ;(async () => {
      const newSearchMedia = await fetchSearchMediaData(query!)
      setSearchMedia(newSearchMedia)
      setPageLoader(false)
    })()
  }, [query])

  if (pageLoader) return <LoaderSpinner />

  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-9">
      <h2 className="text_shadow mb-5 mt-3 cursor-pointer text-fluid-subtitle font-semibold">
        {`${searchMedia?.[0].categoryName} para "${query}"`}
      </h2>

      <div className="grid grid-cols-2 items-center gap-3 scrollbar-hide sm:grid-cols-3 md:p-2">
        {searchMedia?.[0].media
          .filter((item) => item.backdrop_path || item.poster_path)
          .map((item) => <MediaCard key={item.id} mediaItem={item} />)}

        {searchMedia?.[0].media?.length === 0 && (
          <div className="flex_center_col col-span-3">
            <h3 className="text_shadow text-fluid-subtitle font-semibold">No se encontraron resultados</h3>
          </div>
        )}
      </div>
    </section>
  )
}
