import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../Components/shared/LoadingSpinner";
import Card from "../Components/cards/Card";

export default function BrowsePublicHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");

  const categories = [
    "All Category",
    "Morning",
    "Work",
    "Fitness",
    "Evening",
    "Study",
  ];

  useEffect(() => {
    fetch("https://habit-tracker-sarver-1.vercel.app/habits")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching habits:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <LoadingSpinner />
      </div>
    );
  }

  const filteredHabits = habits.filter((habit) => {
    const matchesCategory =
      selectedCategory === "All Category" ||
      habit.category === selectedCategory;
    const matchesSearch =
      habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      habit.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.section
      className="py-12 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <title>Browse Public Habits</title>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center my-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Browse Public Habits
          </h2>
          <p className="text-gray-600">
            Explore and discover new habits to add to your routine.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Search habits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-40 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition select"
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="checked:bg-green-500 checked:text-white"
              >
                {cat}
              </option>
            ))}
          </select>
        </motion.div>

        {filteredHabits.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No habits found for your search/filter.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHabits.map((habit, index) => (
              <Card key={index} habit={habit} index={index} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
