import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function BrowsePublicHabits() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetch("https://habit-tracker-sarver-1.vercel.app/habits")
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center my-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Browse Public Habits
          </h2>
        </div>

        {habits.length === 0 ? (
          <p className="text-gray-500 text-center">No habits found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit) => (
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

                {habit.userName && (
                  <p className="text-xs text-gray-500 mt-3">
                    👤 <span className="font-medium">{habit.userName}</span>
                  </p>
                )}

                <div className="mt-4">
                  <Link
                    to={`/habit/${habit._id}`}
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
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
