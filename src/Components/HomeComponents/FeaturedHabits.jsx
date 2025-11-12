import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BeatLoader } from "react-spinners";
import { CgProfile } from "react-icons/cg";
import { IoMdPricetags } from "react-icons/io";
import { motion } from "framer-motion";

export default function FeaturedHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://habit-tracker-sarver-1.vercel.app/habits/featured")
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
      <div className="flex items-center justify-center h-32 bg-gray-50">
        <BeatLoader color="green" />
      </div>
    );
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center my-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Habits
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most popular and recently added habits from our
            community.
          </p>
        </div>

        {habits.length === 0 ? (
          <p className="text-gray-500 text-center">No habits found.</p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {habits.map((habit) => (
              <motion.div
                key={habit._id}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
                variants={cardVariants}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {habit.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {habit.description || "No description available."}
                </p>

                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  {habit.userName && (
                    <p className="flex items-center gap-1">
                      <CgProfile />{" "}
                      <span className="font-medium">{habit.userName}</span>
                    </p>
                  )}
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <IoMdPricetags />
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
