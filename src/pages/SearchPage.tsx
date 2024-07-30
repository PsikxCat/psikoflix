import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { TMediaCategory } from '@/types'
import { LoaderSpinner } from '@/components'
import { fetchSearchMediaData } from '@/utils'

export default function SearchPage() {
  const [searchMedia, setSearchMedia] = useState<TMediaCategory[] | null>(null)
  const [pageLoader, setPageLoader] = useState<boolean>(true)
  const { query } = useParams<{ query: string }>()

  console.log('searchMedia', searchMedia)

  useEffect(() => {
    ;(async () => {
      const newSearchMedia = await fetchSearchMediaData(query!)
      setSearchMedia(newSearchMedia)
      setPageLoader(false)
    })()
  }, [query])

  if (pageLoader) return <LoaderSpinner />

  return <div>SearchPage</div>
}
