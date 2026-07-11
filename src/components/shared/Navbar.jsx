import { LogOut, Menu, Wallet, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Firebase setup করার পর real user আসবে
  const user = null;
  const dbUser = null;

  const navLinkStyle = ({ isActive }) =>
    `text-sm font-semibold ${
      isActive
        ? "text-emerald-600"
        : "text-slate-600 hover:text-emerald-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E5DE] bg-[#FAF9F6]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-lg font-extrabold text-white shadow-sm">
            F
          </div>

          <span className="font-[Manrope] text-2xl font-extrabold tracking-tight text-slate-900">
            Fundora
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/explore-campaigns" className={navLinkStyle}>
            Explore Campaigns
          </NavLink>

          {user && (
            <NavLink to="/dashboard" className={navLinkStyle}>
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-[#E8F7F0] px-4 py-2.5">
                <Wallet size={17} className="text-emerald-600" />

                <span className="text-sm font-bold text-emerald-700">
                  {dbUser?.credits || 0} Credits
                </span>
              </div>

              <div className="group relative">
                <button type="button">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName || "Fundora user"}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                </button>

                <div className="invisible absolute right-0 top-14 w-56 translate-y-2 rounded-2xl border border-[#ECE9E2] bg-white p-3 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="border-b border-slate-100 px-3 py-2">
                    <p className="font-bold text-slate-900">
                      {user?.displayName}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {user?.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-600 hover:text-emerald-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Register
              </Link>
            </>
          )}

          <a
            href="https://github.com/sumaiya7-ops/fundora-client"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#DCD8CF] bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[17px] w-[17px]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.32c.98 0 1.95.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.04c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
            </svg>

            Join as Developer
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2DED5] bg-white text-slate-800 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#E8E5DE] bg-[#FAF9F6] px-5 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <NavLink
              to="/explore-campaigns"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-[#E8F7F0] hover:text-emerald-700"
            >
              Explore Campaigns
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-[#E8F7F0]"
                >
                  Dashboard
                </NavLink>

                <div className="flex items-center gap-2 rounded-xl bg-[#E8F7F0] px-4 py-3 font-bold text-emerald-700">
                  <Wallet size={18} />
                  {dbUser?.credits || 0} Credits
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-left font-semibold text-red-500 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-[#E8F7F0]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-emerald-600 px-4 py-3 text-center font-bold text-white"
                >
                  Register
                </Link>
              </>
            )}

            <a
              href="https://github.com/sumaiya7-ops/fundora-client"
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-xl border border-[#DDD9D0] bg-white px-4 py-3 text-center font-bold text-slate-800"
            >
              Join as Developer
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;