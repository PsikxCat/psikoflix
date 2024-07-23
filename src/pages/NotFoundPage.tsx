import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="flex_center_col min-h-[100svh] pb-40">
      <h1 className="text-4xl font-bold text-accent">404</h1>
      <p className="text-center text-lg">Parece que esta página no existe</p>

      <Link to="/" className="mt-4 text-accent hover:underline">
        Volver al inicio
      </Link>
    </section>
  )
}
