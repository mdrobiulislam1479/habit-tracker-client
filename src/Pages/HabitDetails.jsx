import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import LoadingSpinner from "../Components/LoadingSpinner";
import { IoMdPricetags } from "react-icons/io";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
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

  const streakGoal = 30;
  const progress = Math.min(
    100,
    Math.round(((habit.currentStreak || 0) / streakGoal) * 100)
  );

  return (
    <motion.div
      className="max-w-7xl mx-5 xl:mx-auto p-6 mt-24 mb-10 rounded-2xl shadow-lg border border-green-500 bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <title>{habit.title}</title>

      <motion.div
        className="flex flex-col sm:flex-row gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {habit.image && (
          <motion.img
            src={habit.image}
            alt={habit.title}
            className="w-full sm:w-1/3 max-h-78 rounded-lg object-cover border border-green-400"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {habit.title}
          </h2>

          <p className="text-gray-600 mb-3">{habit.description}</p>

          <p className="text-sm text-gray-700 font-medium mb-2 flex items-center gap-2">
            <IoMdPricetags /> Category:{" "}
            <span className="text-green-600">{habit.category}</span>
          </p>

          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
              🔥 {habit.currentStreak || 0} Day Streak
            </span>
          </motion.div>

          <div className="mb-5">
            <div className="flex justify-between text-sm font-semibold text-gray-600 mb-1">
              <span>Progress (Last 30 Days)</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-green-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
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

          <motion.button
            onClick={handleMarkComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm"
          >
            Mark Complete
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
