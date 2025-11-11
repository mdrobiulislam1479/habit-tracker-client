import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

export default function HabitDetails() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://habit-tracker-sarver-1.vercel.app/habits/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHabit(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleMarkComplete = async () => {
    try {
      const res = await fetch(
        `https://habit-tracker-sarver-1.vercel.app/habits/complete/${id}`,
        { method: "PATCH" }
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success!", "Habit marked complete!", "success");
        setHabit((prev) => ({
          ...prev,
          currentStreak: data.currentStreak,
          completionHistory: [
            ...(prev.completionHistory || []),
            new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
          ],
        }));
      } else {
        Swal.fire("Oops!", data.message || "Already completed today!", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong.", error);
    }
  };

  const calculateProgress = () => {
    if (!habit?.completionHistory) return 0;
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const count = habit.completionHistory.filter((date) => {
      const [d, m, y] = date.split("-").map(Number);
      const dt = new Date(y, m - 1, d);
      return dt >= thirtyDaysAgo && dt <= today;
    }).length;

    return Math.round((count / 30) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-lg text-gray-500">
        Loading habit details...
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="flex items-center justify-center h-64 text-lg text-gray-500">
        Habit not found.
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="max-w-7xl mx-5  xl:mx-auto p-6 mt-24  mb-10 rounded-2xl shadow-lg border border-green-500 ">
      <div className="flex flex-col sm:flex-row gap-6">
        {habit.image && (
          <img
            src={habit.image}
            alt={habit.title}
            className="w-full sm:w-1/3 max-h-78 rounded-lg object-cover border border-green-400"
          />
        )}

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {habit.title}
          </h2>

          <p className="text-gray-600 mb-3">{habit.description}</p>

          <p className="text-sm text-gray-700 font-medium mb-2">
            🏷️ Category:{" "}
            <span className="text-green-600">{habit.category}</span>
          </p>

          <div className="flex items-center gap-3 mb-3">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
              🔥 {habit.currentStreak || 0} Day Streak
            </span>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-sm font-semibold text-gray-600 mb-1">
              <span>Progress (Last 30 Days)</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-5">
            <p>
              <strong>Creator:</strong> {habit.userName}
            </p>
            <p>
              <strong>Email:</strong> {habit.userEmail}
            </p>
          </div>

          <button
            onClick={handleMarkComplete}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg"
          >
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
}
