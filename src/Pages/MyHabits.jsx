import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

export default function MyHabits() {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://habit-tracker-sarver-1.vercel.app/my-habits?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setHabits(data))
        .catch((err) => console.error("Error fetching habits:", err));
    }
  }, [user]);

  return (
    <section className="py-22 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Habits
        </h2>

        {habits.length === 0 ? (
          <p className="text-center text-gray-500">
            No habits found. Add one to get started!
          </p>
        ) : (
          <>
            <div className="hidden md:block bg-white rounded-xl shadow border border-green-500 overflow-hidden">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-green-500 text-white text-xs sm:text-sm uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-center">Streak</th>
                    <th className="py-3 px-4">Created Date</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {habits.map((habit) => (
                    <tr
                      key={habit._id}
                      className="border-t border-green-500 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {habit.title}
                      </td>
                      <td className="py-3 px-4">{habit.category}</td>
                      <td className="py-3 px-4 text-center">
                        {habit.streak || 0}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(habit.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap justify-center gap-2">
                          <Link
                            to={`/update-habit/${habit._id}`}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs sm:text-sm"
                          >
                            Update
                          </Link>
                          <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs sm:text-sm">
                            Delete
                          </button>
                          <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs sm:text-sm">
                            Complete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {habits.map((habit) => (
                <div
                  key={habit._id}
                  className="bg-white rounded-lg shadow border border-green-500 p-4 flex flex-col justify-between"
                >
                  <div className="border-b border-green-500 pb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {habit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Category: {habit.category}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Streak:{" "}
                      <span className="font-semibold">{habit.streak || 0}</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Created: {new Date(habit.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Link
                      to={`/update-habit/${habit._id}`}
                      className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-center rounded-md text-sm"
                    >
                      Update
                    </Link>
                    <button className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm">
                      Delete
                    </button>
                    <button className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm">
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
