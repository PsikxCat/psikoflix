import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import { NotFoundPage, HomePage, MoviesPage, MyListPage, TVPage } from '@/pages'
import { Layout } from '@/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tv', element: <TVPage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: 'my-list', element: <MyListPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
