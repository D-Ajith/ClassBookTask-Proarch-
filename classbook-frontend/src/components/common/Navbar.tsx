import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <nav className="bg-[#6b8dd6] text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-tight">
            ClassBook
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {user ? (
              <>
                <span className="whitespace-nowrap">
                  Welcome, <span className="font-semibold">{user.email}</span>
                </span>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="hover:bg-white hover:text-[#6b8dd6] px-3 py-1 rounded transition"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/sessions"
                  className="hover:bg-white hover:text-[#6b8dd6] px-3 py-1 rounded transition"
                >
                  Sessions
                </Link>
                {/* Show My Bookings only if NOT admin */}
                {!isAdmin && (
                  <Link
                    to="/bookings"
                    className="hover:bg-white hover:text-[#6b8dd6] px-3 py-1 rounded transition"
                  >
                    My Bookings
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-white hover:text-[#6b8dd6] px-3 py-1 rounded transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:bg-white hover:text-[#6b8dd6] px-3 py-1 rounded transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white hover:text-[#6b8dd6] transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#6b8dd6] px-2 pt-2 pb-4 space-y-1 shadow-inner">
          {user ? (
            <>
              <span className="block px-3 py-2 text-sm">
                Welcome, <span className="font-semibold">{user.email}</span>
              </span>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded hover:bg-white hover:text-[#6b8dd6] transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Admin
                </Link>
              )}
              <Link
                to="/sessions"
                className="block px-3 py-2 rounded hover:bg-white hover:text-[#6b8dd6] transition"
                onClick={() => setMobileOpen(false)}
              >
                Sessions
              </Link>
              {/* Show My Bookings only if NOT admin */}
              {!isAdmin && (
                <Link
                  to="/bookings"
                  className="block px-3 py-2 rounded hover:bg-white hover:text-[#6b8dd6] transition"
                  onClick={() => setMobileOpen(false)}
                >
                  My Bookings
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded hover:bg-white hover:text-[#6b8dd6] transition"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded hover:bg-white hover:text-[#6b8dd6] transition"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
