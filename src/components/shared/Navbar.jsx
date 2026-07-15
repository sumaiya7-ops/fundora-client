import { useEffect, useState } from "react";
import { Link, NavLink} from "react-router-dom";
import {
  Bell,
  LogOut,
  Menu,
  Search,
  Wallet,
  X,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
 
const closeMenu = () => setMenuOpen(false);
  const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);

  // Firebase setup হলে real user use করব
const user = null;
const dbUser = null;

useEffect(() => {
  if (!user?.email) return;

  fetch(`http://localhost:5000/notifications/${user.email}`)
    .then((res) => res.json())
    .then((data) => setNotifications(data));
}, [user]);

  const navLinkStyle = ({ isActive }) =>
    `text-[13px] font-medium transition ${
      isActive
        ? "text-[#008A5A]"
        : "text-[#344054] hover:text-[#008A5A]"
    }`;

  const menuLinks = (
    <>
      <NavLink
        to="/explore-campaigns"
        className={navLinkStyle}
        onClick={closeMenu}
      >
        Explore Campaigns
      </NavLink>

      <a
        href="/#how-it-works"
        className="text-[13px] font-medium text-[#344054] transition hover:text-[#008A5A]"
        onClick={closeMenu}
      >
        How It Works
      </a>

      <a
        href="/#categories"
        className="text-[13px] font-medium text-[#344054] transition hover:text-[#008A5A]"
        onClick={closeMenu}
      >
        Categories
      </a>

      <a
        href="/#about"
        className="text-[13px] font-medium text-[#344054] transition hover:text-[#008A5A]"
        onClick={closeMenu}
      >
        About Us
      </a>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E7E1] bg-[#FBFAF7]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#008A5A]">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="currentColor"
            >
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 4.2 5.2 2.9-2.3 1.3L12 8.8l-2.9 1.6-2.3-1.3L12 6.2Zm-5 5.2 3 1.7v4.4l-3-1.7v-4.4Zm5 7.2v-4.4l3-1.7v4.4l-3 1.7Z" />
            </svg>
          </div>

          <span className="text-xl font-bold tracking-tight text-[#102A2A]">
            Fundora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {menuLinks}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
       <button
  type="button"
  className="flex h-9 w-9 items-center justify-center text-[#344054] transition hover:text-[#008A5A]"
  aria-label="Search"
>
  <Search size={18} strokeWidth={1.8} />
</button>

<div className="relative">
  <button
    type="button"
    onClick={() => setShowNotifications(!showNotifications)}
    className="flex h-9 w-9 items-center justify-center text-[#344054] transition hover:text-[#008A5A]"
  >
    <Bell size={18} />

    {notifications.length > 0 && (
      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
    )}
  </button>

  {showNotifications && (
    <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-white p-4 shadow-lg">
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className="border-b py-2 text-sm"
          >
            {notification.message}
          </div>
        ))
      )}
    </div>
  )}
</div>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-[13px] font-medium text-[#344054] hover:text-[#008A5A]"
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#344054]">
                <Wallet size={15} className="text-[#008A5A]" />
                {dbUser?.credits || 0} Credits
              </div>

              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-2"
                >
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName || "Fundora user"}
                    className="h-8 w-8 rounded-full object-cover"
                  />

                  <div className="text-left">
                    <p className="max-w-24 truncate text-[12px] font-semibold text-[#101828]">
                      {user?.displayName}
                    </p>

                    <p className="text-[10px] capitalize text-[#667085]">
                      {dbUser?.role}
                    </p>
                  </div>
                </button>

                <div className="invisible absolute right-0 top-12 w-48 translate-y-2 rounded-lg border border-[#E9E7E1] bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md border border-[#D0D5DD] bg-white px-4 py-2 text-[12px] font-semibold text-[#344054] transition hover:border-[#008A5A] hover:text-[#008A5A]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-[#008A5A] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#00754C]"
              >
                Register
              </Link>
            </>
          )}

          <a
            href="https://github.com/sumaiya7-ops/fundora-client"
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-[#006B4F] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#005C44]"
          >
            Join as Developer
          </a>

 
          </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-9 w-9 items-center justify-center text-[#344054] lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-[#E9E7E1] bg-[#FBFAF7] lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6">
            {menuLinks}

            <div className="border-t border-[#E9E7E1] pt-5">
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="text-sm font-medium text-[#344054]"
                  >
                    Dashboard
                  </Link>

                  <div className="flex items-center gap-2 text-sm font-semibold text-[#344054]">
                    <Wallet size={16} className="text-[#008A5A]" />
                    {dbUser?.credits || 0} Credits
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-medium text-red-500"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-md border border-[#D0D5DD] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#344054]"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-md bg-[#008A5A] px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              )}

              <a
                href="https://github.com/sumaiya7-ops/fundora-client"
                target="_blank"
                rel="noreferrer"
                className="mt-3 block rounded-md bg-[#006B4F] px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Join as Developer
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;