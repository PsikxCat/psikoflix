import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import { NotFoundPage, HomePage, MoviesPage, MyListPage, TVPage, WatchPage, SearchPage } from '@/pages'
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
      { path: 'watch/:mediaType/:id/:imgUrl', element: <WatchPage /> },
      { path: 'search/:query', element: <SearchPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
