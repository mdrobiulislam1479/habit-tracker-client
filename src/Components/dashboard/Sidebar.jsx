import { use, useState } from "react";
import { Link } from "react-router";
import Logo from "../../assets/logo.png";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../Context/AuthContext";
import MenuItem from "./MenuItem";
import { Fa42Group } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { GiProgression } from "react-icons/gi";
import { FiPlusCircle } from "react-icons/fi";

const Sidebar = () => {
  const { signOutUser } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar on mobile
  const handleToggle = () => setIsOpen(!isOpen);

  // Auto close after clicking a menu item (mobile)
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* ---------------- SMALL SCREEN NAV ---------------- */}
      <div className="bg-primary text-gray-800 flex justify-between lg:hidden shadow sticky top-0 z-30">
        {/* Logo */}
        <Link to={"/"} className="flex items-center">
          <img src={Logo} alt="Logo" className="h-18 object-contain" />
          <p className="text-3xl font-bold">
            Habit<span className="text-secondary">Tracker</span>
          </p>
        </Link>

        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none hover:bg-gray-200 transition cursor-pointer"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* ---------------- OVERLAY FOR MOBILE ---------------- */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 lg:hidden z-20"
        />
      )}

      {/* ---------------- SIDEBAR ---------------- */}
      <div
        className={`
    fixed top-0 left-0 z-50
    flex flex-col justify-between
    bg-primary w-64 shadow-lg
    h-screen 
    transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 
    transition-transform duration-300 ease-in-out
  `}
      >
        <div className="flex flex-col h-full">
          {/* -------- TOP SECTION -------- */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <Link to={"/"} className="flex items-center -ml-5 -mb-5">
              <img src={Logo} alt="Logo" className="h-18 object-contain" />
              <p className="text-2xl font-bold -ml-2">
                Habit<span className="text-secondary">Tracker</span>
              </p>
            </Link>

            {/* Close button only in mobile */}
            <button
              onClick={handleToggle}
              className="lg:hidden p-1 rounded hover:bg-gray-200 cursor-pointer"
            >
              <AiOutlineClose className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* -------- MENU SECTION -------- */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav onClick={closeSidebar}>
              <MenuItem
                icon={RxDashboard}
                label="Overview"
                address="/dashboard"
              />
              <MenuItem icon={CgProfile} label="Profile" address="profile" />
              <MenuItem
                icon={GiProgression}
                label="My Habits"
                address="my-habits"
              />
              <MenuItem
                icon={FiPlusCircle}
                label="Add Habit"
                address="add-habit"
              />
            </nav>
          </div>

          {/* -------- BOTTOM SECTION -------- */}
          <div className="pb-4">
            <hr className="my-2 text-accent" />

            <button
              onClick={signOutUser}
              className="flex w-full items-center px-4 py-3 mt-4 text-accent hover:bg-base-200 transition cursor-pointer"
            >
              <GrLogout className="w-5 h-5" />
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
