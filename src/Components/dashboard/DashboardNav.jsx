import { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { PuffLoader } from "react-spinners";

const DashboardNav = () => {
  const { user, signOutUser, loading } = use(AuthContext);
  return (
    <div className="bg-primary px-5 py-3 flex justify-between items-center shadow">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      {loading ? (
        <PuffLoader size={40} color="green" />
      ) : (
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
                <p className="font-medium text-gray-800">{user.displayName}</p>
                <p className="text-gray-500 text-xs mb-3">{user.email}</p>

                {/* Logout Button */}
                <button
                  onClick={signOutUser}
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
  );
};

export default DashboardNav;
