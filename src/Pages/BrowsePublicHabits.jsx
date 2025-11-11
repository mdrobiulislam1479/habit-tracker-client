import { useEffect, useState } from "react";
import { Link } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function BrowsePublicHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Morning", "Work", "Fitness", "Evening", "Study"];

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
      selectedCategory === "All" || habit.category === selectedCategory;
    const matchesSearch =
      habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      habit.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <title>Browse Public Habits</title>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center my-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Browse Public Habits
          </h2>
          <p className="text-gray-600">
            Explore and discover new habits to add to your routine.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <input
            type="text"
            placeholder="Search habits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {filteredHabits.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No habits found for your search/filter.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHabits.map((habit) => (
              <div
                key={habit._id}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {habit.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {habit.description || "No description available."}
                </p>

                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  {habit.userName && (
                    <p>
                      👤 <span className="font-medium">{habit.userName}</span>
                    </p>
                  )}
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {habit.category || "General"}
                  </span>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/habit/${habit._id}`}
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition w-full text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
