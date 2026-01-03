import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

const FilterDrawer = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Filter Button - Mobile Only */}
      <button
        onClick={toggleDrawer}
        className="mr-2 p-2 border rounded text-gray-600 hover:text-gray-900 hover:border-gray-400 cursor-pointer lg:hidden transition"
        aria-label="Open filters"
      >
        <FiFilter size={20} />
      </button>

      {/* Drawer Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity lg:hidden ${
          isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleDrawer}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          aria-hidden="true"
        ></div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-primary shadow-xl transform transition-transform lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={toggleDrawer}
              className="p-2 rounded hover:bg-base-100 cursor-pointer"
              aria-label="Close filters"
            >
              ✕
            </button>
          </div>
          {/* Search */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Search</h4>
            <input
              type="text"
              placeholder="Search habits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
            />
          </div>

          {/* Category */}
          <div>
            <h4 className="font-semibold mb-2">Category</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat}
                    value={cat}
                    onChange={() =>
                      setSelectedCategory(
                        selectedCategory === cat ? "All Category" : cat
                      )
                    }
                    onClick={toggleDrawer}
                    className="cursor-pointer"
                  />
                  <label>{cat}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
