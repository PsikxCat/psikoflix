import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import { HomePage } from '@/pages'
import { Navbar } from '@/components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
])

export default function App() {
  return (
    <section className="flex_center_col min-h-[100svh]">
      <Navbar />

      <div className="flex_center flex-1">
        <RouterProvider router={router} />
      </div>

      <div className="flex_center w-full border">
        <span className="inline-block scale-x-[-1]">©</span> 2024. Ningun derecho reservado.
      </div>
    </section>
  )
}
