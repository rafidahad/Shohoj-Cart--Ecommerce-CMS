import React from "react";

/**
 * Reusable top header for ShohojCart.
 * Props:
 * - user: { name, email } | null
 * - onLogoClick: () => void
 * - onLogout: () => void
 */
export default function Header({ user, onLogoClick, onLogout }) {
  const initials = (name) =>
    (name || "")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-400 shadow flex items-center px-4 sm:px-6 lg:px-8 py-3 justify-between">
      {/* Brand / Logo */}
      <button
        type="button"
        onClick={onLogoClick}
        className="flex items-center gap-3 cursor-pointer"
      >
        <span className="inline-block h-9 w-9">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="url(#paint0_linear)" />
            <path d="M12 28V16a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H14a2 2 0 01-2-2z" fill="#fff" />
            <path d="M16 18h8v8h-8z" fill="#38bdf8" />
            <circle cx="20" cy="24" r="2" fill="#0ea5e9" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="font-extrabold text-xl sm:text-2xl text-white tracking-wide">
          shohojcart
        </span>
      </button>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {user ? (
          <>
            <div className="hidden sm:block text-white text-right leading-tight">
              <div className="font-semibold truncate max-w-[200px]">{user?.name}</div>
              <div className="text-white/80 text-xs truncate max-w-[200px]">{user?.email}</div>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-lime-400 text-white px-3 py-1 rounded-full font-bold shadow">
              {initials(user?.name)}
            </div>
            <button
              onClick={onLogout}
              className="ml-1 sm:ml-2 bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-lg text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="text-white/90 text-sm">Not signed in</div>
        )}
      </div>
    </header>
  );
}
