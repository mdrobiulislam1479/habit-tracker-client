import { useState } from "react";
import Logo from "../assets/logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-10 object-contain" />
        </div>

        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <a
            href="/add-habit"
            className="hover:text-blue-600 transition-colors"
          >
            Add Habit
          </a>
          <a
            href="/my-habits"
            className="hover:text-blue-600 transition-colors"
          >
            My Habits
          </a>
          <a href="/browse" className="hover:text-blue-600 transition-colors">
            Browse Public Habits
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </a>
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 border border-gray-300 rounded-md"
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
        <div className="md:hidden bg-gray-50 border-t border-gray-200 py-3 px-4 flex flex-col gap-3 text-gray-700 font-medium">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <a href="/add-habit" className="hover:text-blue-600">
            Add Habit
          </a>
          <a href="/my-habits" className="hover:text-blue-600">
            My Habits
          </a>
          <a href="/browse" className="hover:text-blue-600">
            Browse Public Habits
          </a>

          <div className="mt-3 flex flex-col gap-2 border-t border-gray-200 pt-3">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-center"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition text-center"
            >
              Signup
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
