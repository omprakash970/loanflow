import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-900 px-6 text-center text-slate-100">
      <p className="text-6xl font-bold text-slate-700">404</p>
      <h1 className="mt-3 text-xl font-semibold">Page not found</h1>
      <p className="mt-1 text-sm text-slate-400">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-5 rounded bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700"
      >
        Back to home
      </Link>
    </div>
  );
}
