import { Dispatch, SetStateAction, useContext } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { logoutUser } from '@/utils/firebase'

interface UserMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  isScrolled: boolean
}

export default function UserMenu({ setIsMenuOpen, isScrolled }: UserMenuProps) {
  const { setUserAuth } = useContext(GlobalContext)

  const handleClose = () => setIsMenuOpen(false)

  const handleSignOut = () => {
    logoutUser()
    setUserAuth({
      isUserLogged: false,
      userId: null,
      favorites: null,
    })
    handleClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={handleClose} />

      <section
        className={`absolute top-[80px] z-50 rounded-b-md px-3 pb-4 pt-2 ${isScrolled ? 'bg-dark' : 'bg-black/40'}`}
      >
        {/* <p className="p-1 font-bold text-white">Usuario</p>  */}

        <div className="flex-center flex flex-col gap-3">
          <button className="rounded-md bg-white px-4 py-2 text-sm text-black" onClick={handleSignOut}>
            Salir de Psikoflix
          </button>
        </div>
      </section>
    </>
  )
}
