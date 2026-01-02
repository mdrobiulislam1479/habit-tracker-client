import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import Card from "../cards/Card";

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
            {habits.map((habit, index) => (
              <Card key={index} habit={habit} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
