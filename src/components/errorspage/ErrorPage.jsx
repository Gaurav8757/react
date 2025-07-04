
import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  
  return (
    <section className="relative z-10 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-blue-500 to-blue-600 overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 opacity-10 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center border border-white/20">
        <div className="flex flex-col items-center">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 animate-bounce">
            <circle cx="50" cy="50" r="48" stroke="#fff" strokeWidth="4" fill="#f87171"/>
            <path d="M35 60 Q50 75 65 60" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <circle cx="40" cy="45" r="5" fill="#fff"/>
            <circle cx="60" cy="45" r="5" fill="#fff"/>
          </svg>
          <h2 className="mb-2 text-[60px] font-extrabold leading-none text-white drop-shadow-lg">
            {error.status || 404}
          </h2>
          <h4 className="mb-3 text-[26px] font-semibold leading-tight text-white drop-shadow">
            Oops! {error.statusText || 'Page Not Found'}
          </h4>
          <p className="mb-8 text-lg text-white/90">
            {error.message || 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
          </p>
          <a
            href="/"
            className="inline-block rounded-lg bg-white/90 px-8 py-3 text-center text-base font-bold text-blue-700 shadow-lg transition hover:bg-blue-700 hover:text-white hover:scale-105 duration-200">
            ⬅ Go To Home
          </a>
        </div>
      </div>
    </section>
  );
}
