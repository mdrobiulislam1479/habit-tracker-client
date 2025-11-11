import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function MyHabits() {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://habit-tracker-sarver-1.vercel.app/my-habits?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setHabits(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching habits:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleUpdateHabit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedHabit = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,
      image: form.image.value || selectedHabit.image,
    };

    const res = await fetch(
      `https://habit-tracker-sarver-1.vercel.app/habits/${selectedHabit._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHabit),
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success("Habit updated successfully!");
      setSelectedHabit(null);

      fetch(
        `https://habit-tracker-sarver-1.vercel.app/my-habits?email=${user.email}`
      )
        .then((res) => res.json())
        .then(setHabits);
    } else {
      toast.error("No changes made or update failed.");
    }
  };

  const handleDeleteHabit = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This habit will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `https://habit-tracker-sarver-1.vercel.app/habits/${id}`,
            { method: "DELETE" }
          );
          const data = await res.json();

          if (data.deletedCount > 0) {
            setHabits(habits.filter((h) => h._id !== id));
            Swal.fire("Deleted!", "Your habit has been removed.", "success");
          } else {
            Swal.fire("Error", "Failed to delete habit.", "error");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  const handleMarkComplete = async (habitId) => {
    try {
      const res = await fetch(
        `https://habit-tracker-sarver-1.vercel.app/habits/complete/${habitId}`,
        { method: "PATCH" }
      );
      const data = await res.json();

      if (res.ok) {
        Swal.fire("Completed!", "Habit marked complete for today!", "success");

        setHabits((prev) =>
          prev.map((h) =>
            h._id === habitId
              ? {
                  ...h,
                  currentStreak: data.currentStreak,
                  completionHistory: data.completionHistory,
                }
              : h
          )
        );
      } else {
        Swal.fire(
          "Already Done",
          data.message || "You already completed this habit today.",
          "info"
        );
      }
    } catch (error) {
      console.error("Error marking complete:", error);
      Swal.fire(
        "Error",
        "Something went wrong while marking complete.",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <section className="py-22 px-4 sm:px-6 lg:px-8">
      <title>Habit Tracker | My Habits</title>
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
                          <button
                            onClick={() => setSelectedHabit(habit)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs sm:text-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteHabit(habit._id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs sm:text-sm"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleMarkComplete(habit._id)}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs sm:text-sm"
                          >
                            Mark Complete
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
                    <button
                      onClick={() => setSelectedHabit(habit)}
                      className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-center rounded-md text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteHabit(habit._id)}
                      className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleMarkComplete(habit._id)}
                      className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {selectedHabit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative mx-3">
              <h2 className="text-2xl font-bold mb-4 text-green-500 text-center">
                Update Habit
              </h2>

              <form onSubmit={handleUpdateHabit} className="space-y-3">
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedHabit.title}
                  placeholder="Habit Title"
                  className="w-full border p-2 rounded-lg"
                  required
                />
                <textarea
                  name="description"
                  defaultValue={selectedHabit.description}
                  placeholder="Description"
                  className="w-full border p-2 rounded-lg"
                ></textarea>

                <select
                  name="category"
                  defaultValue={selectedHabit.category}
                  className="w-full border p-2 rounded-lg"
                  required
                >
                  <option>Morning</option>
                  <option>Work</option>
                  <option>Fitness</option>
                  <option>Evening</option>
                  <option>Study</option>
                </select>

                <input
                  type="time"
                  name="reminderTime"
                  defaultValue={selectedHabit.reminderTime}
                  className="w-full border p-2 rounded-lg"
                />

                <input
                  type="text"
                  name="image"
                  placeholder="ImgBB Image URL (optional)"
                  defaultValue={selectedHabit.image}
                  className="w-full border p-2 rounded-lg"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={selectedHabit.userName}
                    readOnly
                    className="border p-2 rounded-lg bg-gray-100"
                  />
                  <input
                    type="email"
                    value={selectedHabit.userEmail}
                    readOnly
                    className="border p-2 rounded-lg bg-gray-100"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedHabit(null)}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
