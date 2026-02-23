import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full bg-slate-950 text-slate-100">
      <section className="flex w-full items-center justify-center px-6 py-12 text-center">
        <div className="flex w-full max-w-4xl flex-col items-center gap-4">
          <h1 className="text-4xl font-semibold">404</h1>
          <p className="text-slate-300">We couldn't find that page.</p>
          <Link
            to="/"
            className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  )
}
