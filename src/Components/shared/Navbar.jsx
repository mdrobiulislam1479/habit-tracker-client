import { use, useRef, useState } from "react";
import Logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import ThemeToggle from "../theme/ThemeToggle";

export default function Header() {
  // mobile menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  // auth context load (user + signOut function)
  const { user, signOutUser, loading } = use(AuthContext);

  // dropdown element reference
  const dropdownRef = useRef(null);

  // logout handler
  const handleLogout = async () => {
    await signOutUser();
    toast.success("Logout successful!");
  };

  // close mobile menu when a nav item is clicked
  const handleNavClick = () => setMenuOpen(false);

  // reusable navigation links
  const list = (
    <>
      {/* Home */}
      <NavLink
        onClick={handleNavClick}
        to="/"
        className="hover:text-green-500 transition-colors"
      >
        Home
      </NavLink>

      {/* Browse Public Habits */}
      <NavLink
        onClick={handleNavClick}
        to="/browse-public-habits"
        className="hover:text-green-500 transition-colors"
      >
        Browse Public Habits
      </NavLink>

      {/* About */}
      <NavLink
        onClick={handleNavClick}
        to="/about"
        className="hover:text-green-500 transition-colors"
      >
        About
      </NavLink>

      {/* Contact */}
      <NavLink
        onClick={handleNavClick}
        to="/contact"
        className="hover:text-green-500 transition-colors"
      >
        Contact
      </NavLink>

      {/* Dashboard — Only for logged-in users */}
      {user && (
        <>
          {/*Dashboard*/}
          <NavLink
            onClick={handleNavClick}
            to="/dashboard"
            className="hover:text-green-500 transition-colors"
          >
            Dashboard
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="bg-primary/30 backdrop-blur-xl shadow-sm sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="flex items-center">
          <img src={Logo} alt="Logo" className="h-18 object-contain" />
          <p className="text-3xl font-bold">
            Habit<span className="text-secondary">Tracker</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-accent font-medium">
          {list}
        </nav>

        {/* Desktop Right Side — Theme + User Dropdown */}
        <div
          className="hidden lg:flex items-center gap-3 relative"
          ref={dropdownRef}
        >
          <ThemeToggle />

          {/* Loading Spinner */}
          {loading ? (
            <PuffLoader size={40} color="green" />
          ) : !user ? (
            // If NO user → Show Login + Signup
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
            // If user is logged in → Show User Avatar Dropdown
            <>
              <div className="dropdown">
                <div tabIndex={0} role="button">
                  {/* Avatar */}
                  <img
                    src={
                      user.photoURL ||
                      "https://img.icons8.com/glyph-neue/64/user-male-circle.png"
                    }
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-secondary/70 object-cover cursor-pointer"
                  />
                </div>

                {/* Dropdown Content */}
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <div className="absolute right-40 w-56 bg-white shadow-lg border border-gray-200 rounded-lg p-3 text-sm">
                    <p className="font-medium text-gray-800">
                      {user.displayName}
                    </p>
                    <p className="text-gray-500 text-xs mb-3">{user.email}</p>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md cursor-pointer"
                    >
                      Log out
                    </button>
                  </div>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex flex-col justify-center items-center w-8 h-8 border border-gray-300 rounded-md cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Hamburger Animation Lines */}
            <span
              className={`block w-5 h-0.5 bg-accent transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-accent my-1 transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-accent transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <nav className="lg:hidden bg-primary border-t border-secondary/50 py-3 px-4 flex flex-col gap-3 text-accent font-medium">
          {list}

          {/* Mobile User Section */}
          <div className="mt-3 flex flex-col gap-2 border-t border-secondary/50 pt-3">
            {!user ? (
              // If user not logged in → show login/signup
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
              // If logged in → Show profile + logout
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

                {/* Mobile Logout */}
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
