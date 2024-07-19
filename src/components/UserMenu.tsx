import { Dispatch, SetStateAction } from 'react'

interface UserMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  isScrolled: boolean
}

export default function UserMenu({ setIsMenuOpen, isScrolled }: UserMenuProps) {
  const handleClose = () => setIsMenuOpen(false)

  const handleSignOut = () => {
    // Cerrar sesión
    handleClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={handleClose} />

      <section
        className={`absolute top-[79px] z-50 bg-dark px-3 pb-4 pt-2 ${isScrolled ? 'rounded-b-md' : 'rounded-md'}`}
      >
        <p className="p-1 font-bold text-white">Usuario</p>

        <div className="flex-center flex flex-col gap-3">
          <button className="rounded-md bg-white px-4 py-2 text-sm text-black" onClick={handleSignOut}>
            Salir de Psikoflix
          </button>
        </div>
      </section>
    </>
  )
}
