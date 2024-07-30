import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon } from 'lucide-react'

export default function Search() {
  const [showExpandSearch, setShowExpandSearch] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery === undefined || searchQuery.trim() === '') {
      setShowExpandSearch(false)
      return
    }

    navigate(`/search/${encodeURIComponent(searchQuery.trim())}`)
    setSearchQuery('')
    setShowExpandSearch(false)
  }

  return (
    <section>
      {showExpandSearch === false ? (
        <SearchIcon
          className="svg_shadow hidden cursor-pointer sm:mr-[9px] sm:inline"
          size={24}
          onClick={() => setShowExpandSearch((prev) => !prev)}
        />
      ) : (
        <div className="sm:flex-center text-center">
          <form className="relative" onSubmit={(e) => handleSubmit(e)}>
            <input
              className="h-[40px] w-[230px] rounded-md bg-dark-gray px-4 outline-none"
              type="text"
              autoFocus
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-0 top-0 flex h-full w-[40px] items-center justify-center rounded-l-none bg-accent text-sm">
              Ir
            </button>
          </form>
        </div>
      )}
    </section>
  )
}
