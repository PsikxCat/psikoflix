import { useEffect, useState } from 'react'
import { BellIcon, SearchIcon, User, ChevronDown, ChevronUp } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { UserMenu } from '@/components'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const menuItems = [
    {
      label: 'Inicio',
      href: '/',
    },
    {
      label: 'TV',
      href: '/tv',
    },
    {
      label: 'Películas',
      href: '/movies',
    },
    {
      label: 'Mi lista',
      href: '/my-list',
    },
  ]

  // Actualizar el estado de isScrolled cuando el usuario haga scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
        setIsMenuOpen(false)
      } else setIsScrolled(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className={`sticky top-0 flex h-20 w-full justify-between px-[6%] py-5 text-primary transition-all duration-200 ease-in-out ${isScrolled ? 'bg-dark' : 'hover:bg-black/40'} z-10 h-20`}
    >
      {/* left side */}
      <div className="flex items-center gap-12">
        <img src="/psikoflix-logo.svg" alt="psikoflix logo" width={120} className="svg_shadow" />

        <ul className="flex gap-5">
          {menuItems.map(({ label, href }) => (
            <li
              className="text_shadow cursor-pointer font-medium transition-all duration-200 ease-in-out hover:text-accent"
              key={href}
            >
              <NavLink to={href} className={({ isActive }) => (isActive ? 'text-accent' : '')}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* right side */}
      <div className="flex items-center gap-5">
        <BellIcon className="cursor-pointer" size={24} />
        <SearchIcon className="cursor-pointer" size={24} />

        {/* menu */}
        <div className="flex items-center">
          <User className="cursor-pointer" size={30} />

          {isMenuOpen ? (
            <ChevronUp className="z-50 cursor-pointer" size={24} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <ChevronDown className="z-50 cursor-pointer" size={24} onClick={() => setIsMenuOpen(true)} />
          )}
        </div>

        {isMenuOpen && <UserMenu setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />}
      </div>
    </section>
  )
}
