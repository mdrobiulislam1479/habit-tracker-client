import { use, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { IoMdPricetags } from "react-icons/io";
import { FiCheckCircle, FiTrendingUp, FiUser, FiMail } from "react-icons/fi";
import LoadingSpinner from "../Components/shared/LoadingSpinner";
import { AuthContext } from "../Context/AuthContext";

export default function HabitDetails() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

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
    if (!user) {
      navigate("/login", { state: location.pathname });
      return;
    }
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-accent mb-2">
            Habit not found
          </h2>
          <p className="text-accent/70">
            The habit you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const streakGoal = 30;
  const progress = Math.min(
    100,
    Math.round(((habit.currentStreak || 0) / streakGoal) * 100)
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <title>{habit.title}</title>

        {/* Header Section */}
        <motion.div
          className="bg-primary rounded-2xl shadow-xl overflow-hidden border border-secondary/10"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Image Section */}
            {habit.image && (
              <motion.div
                className="lg:col-span-2 relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src={habit.image}
                  alt={habit.title}
                  className="w-full h-full object-cover min-h-[300px] lg:min-h-[500px]"
                />
              </motion.div>
            )}

            {/* Content Section */}
            <motion.div
              className={`${
                habit.image ? "lg:col-span-3" : "lg:col-span-5"
              } p-8 lg:p-10`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Title & Category */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                    <IoMdPricetags className="text-base" />
                    {habit.category}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-accent mb-3 leading-tight">
                  {habit.title}
                </h1>
                <p className="text-accent/80 text-lg leading-relaxed">
                  {habit.description}
                </p>
              </div>

              {/* Streak Badge */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-sm text-amber-700 font-medium">
                      Current Streak
                    </p>
                    <p className="text-2xl font-bold text-amber-900">
                      {habit.currentStreak || 0} Days
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Progress Section */}
              <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FiTrendingUp className="text-secondary text-xl" />
                    <span className="font-semibold text-slate-800">
                      30-Day Progress
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-secondary">
                    {progress}%
                  </span>
                </div>
                <div className="relative w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-secondary rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {habit.currentStreak || 0} of {streakGoal} days completed
                </p>
              </div>

              {/* Creator Info */}
              <div className="mb-8 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                  Created By
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-slate-700">
                    <FiUser className="text-secondary shrink-0" />
                    <span className="font-medium">{habit.userName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <FiMail className="text-secondary shrink-0" />
                    <span className="text-sm">{habit.userEmail}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={handleMarkComplete}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 bg-secondary hover:bg-secondary/80 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
              >
                <FiCheckCircle className="text-xl" />
                Mark as Complete Today
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
