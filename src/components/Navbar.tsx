import { useEffect, useState } from 'react'
import { User, ChevronDown, ChevronUp } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { Search, UserMenu } from '@/components'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const location = useLocation()
  const isWatchPage = location.pathname.includes('watch')

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
      className={`sticky top-0 z-10 flex h-20 w-full justify-between px-[6%] py-5 text-primary transition-all duration-200 ease-in-out ${
        isWatchPage ? 'bg-black/40' : isScrolled ? 'bg-dark' : 'hover:bg-black/40'
      }`}
    >
      {/* left side */}
      <div className="flex items-center gap-12">
        <Link to="/" className="cursor-pointer">
          <img src="/psikoflix-logo.svg" alt="psikoflix logo" width={120} className="svg_shadow" />
        </Link>

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
        <Search />

        {/* menu */}
        <div className="flex items-center">
          <User className="svg_shadow cursor-pointer" size={30} />

          {isMenuOpen ? (
            <ChevronUp className="svg_shadow z-50 cursor-pointer" size={24} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <ChevronDown className="svg_shadow z-50 cursor-pointer" size={24} onClick={() => setIsMenuOpen(true)} />
          )}
        </div>

        {isMenuOpen && <UserMenu setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />}
      </div>
    </section>
  )
}
