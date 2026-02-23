import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main className="flex min-h-screen w-full bg-slate-950 text-slate-100">
      <section className="flex w-full items-center justify-center px-6 py-12 text-center">
        <div className="flex w-full max-w-5xl flex-col items-center gap-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            LoanFlow
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            LoanFlow is alive
          </h1>
          <p className="text-base text-slate-300 sm:text-lg">
            A clean starting point with routing, auth context, and Tailwind.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Sign in
            </Link>
            <Link
              to="/app"
              className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Go to app
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
