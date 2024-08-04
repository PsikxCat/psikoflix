import { useContext } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { MediaCard } from '@/components'

export default function MyListPage() {
  const { userAuth } = useContext(GlobalContext)

  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-9">
      {/* <h2 className="text_shadow mb-5 mt-3 cursor-pointer text-fluid-subtitle font-semibold">
        {`${searchMedia?.[0].categoryName} para "${query}"`}
      </h2> */}

      <div className="grid grid-cols-2 items-center gap-3 scrollbar-hide sm:grid-cols-3 md:p-2">
        {userAuth.favorites?.map((item) => <MediaCard key={item.id} mediaItem={item} />)}

        {userAuth.favorites?.length === 0 && (
          <div className="flex_center_col col-span-3">
            <h3 className="text_shadow text-fluid-subtitle font-semibold">
              Aún no tienes nada en tu lista, agrega algo!
            </h3>
          </div>
        )}
      </div>
    </section>
  )
}
