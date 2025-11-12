import { use, useRef, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser, loading } = use(AuthContext);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await signOutUser();
    toast.success("Logout successful!");
  };

  const handleNavClick = () => setMenuOpen(false);

  const list = (
    <>
      <NavLink to="/" className="hover:text-green-500 transition-colors">
        Home
      </NavLink>
      <NavLink
        to="/add-habit"
        className="hover:text-green-500 transition-colors"
      >
        Add Habit
      </NavLink>
      <NavLink
        to="/my-habits"
        className="hover:text-green-500 transition-colors"
      >
        My Habits
      </NavLink>
      {user ? (
        <NavLink
          to="/dashboard"
          className="hover:text-green-500 transition-colors"
        >
          Dashboard
        </NavLink>
      ) : (
        ""
      )}
      <NavLink
        to="/browse-public-habits"
        className="hover:text-green-500 transition-colors"
      >
        Browse Public Habits
      </NavLink>
    </>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-10 object-contain" />
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          {list}
        </nav>

        <div
          className="hidden lg:flex items-center gap-3 relative"
          ref={dropdownRef}
        >
          {loading ? (
            <PuffLoader size={40} color="green" />
          ) : !user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div className="dropdown">
                <div tabIndex={0} role="button">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.icons8.com/glyph-neue/64/user-male-circle.png"
                    }
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                  />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu  rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <div className="absolute right-40  w-56 bg-white shadow-lg border border-gray-200 rounded-lg p-3 text-sm">
                    <p className="font-medium text-gray-800">
                      {user.displayName}
                    </p>
                    <p className="text-gray-500 text-xs mb-3">{user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md"
                    >
                      Log out
                    </button>
                  </div>
                </ul>
              </div>
            </>
          )}
        </div>

        <button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 border border-gray-300 rounded-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-gray-700 my-1 transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-gray-50 border-t border-gray-200 py-3 px-4 flex flex-col gap-3 text-gray-700 font-medium">
          {list}
          <div className="mt-3 flex flex-col gap-2 border-t border-gray-200 pt-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-center"
                  onClick={handleNavClick}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition text-center"
                  onClick={handleNavClick}
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.icons8.com/glyph-neue/64/user-male-circle.png"
                    }
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-medium">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    handleNavClick();
                  }}
                  className="text-white bg-green-500 hover:bg-green-600 py-1 px-3 rounded-full"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
