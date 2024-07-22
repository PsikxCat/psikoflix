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

      <section className="flex w-full flex-1 flex-col border border-red-500">
        <RouterProvider router={router} />
      </section>

      <section className="flex_center w-full border">
        <span className="inline-block scale-x-[-1]">©</span> 2024. Ningun derecho reservado.
      </section>
    </section>
  )
}
