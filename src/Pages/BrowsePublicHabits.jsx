import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../Components/shared/LoadingSpinner";
import Card from "../Components/cards/Card";
import FilterDrawer from "../Components/buttons/FilterDrawer";
import Pagination from "../Components/buttons/Pagination";

export default function BrowsePublicHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Static categories
  const categories = ["Morning", "Work", "Fitness", "Evening", "Study"];

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://habit-tracker-sarver-1.vercel.app/habits?page=${page}&limit=9`
    )
      .then((res) => res.json())
      .then((data) => {
        setHabits(data.habits);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <LoadingSpinner />
      </div>
    );
  }

  // Filter + Sort Logic
  const filteredHabits = habits
    .filter((habit) => {
      // Category match OR All Category allowed
      const matchesCategory =
        selectedCategory === "All Category" ||
        habit.category === selectedCategory;

      // Search match (title or description)
      const matchesSearch =
        habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      // Sort newest first (latest date first)
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      // Sort oldest first
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <motion.section
      className="pb-12 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <title>Browse Public Habits</title>

      <div>
        {/* Header Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Browse Public Habits
          </h2>
          <p className="text-accent/80">
            Explore and discover new habits to add to your routine.
          </p>
        </motion.div>

        {/* Layout Area */}
        <div className="flex gap-8 py-10 px-4 lg:px-6 max-w-7xl mx-auto">
          {/* Sidebar (Desktop Only) */}
          <aside className="w-64 hidden lg:block px-5 py-10 bg-primary rounded-xl border-2 border-accent/5 h-fit">
            {/* Search Input */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Search</h4>
              <input
                type="text"
                placeholder="Search habits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
              />
            </div>

            {/* Category Filter */}
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
                      className="cursor-pointer"
                    />
                    <label>{cat}</label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar: Showing Count + Sort Dropdown + Mobile Drawer */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm">
                Showing {filteredHabits?.length || 0} of {total || 0} habits
              </p>

              <div className="flex items-center">
                {/* Mobile Drawer */}
                <FilterDrawer
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                {/* Sort Dropdown */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border rounded px-3 py-2 select w-30 cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div
              className="
                grid 
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {/* If No Result */}
              {filteredHabits.length === 0 ? (
                <p className="text-gray-500 text-center mt-10 col-span-4">
                  No habits found matching your criteria.
                </p>
              ) : (
                <div className="col-span-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Map through habits */}
                  {filteredHabits.map((habit, index) => (
                    <Card key={index} habit={habit} index={index} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          </main>
        </div>
      </div>
    </motion.section>
  );
}
