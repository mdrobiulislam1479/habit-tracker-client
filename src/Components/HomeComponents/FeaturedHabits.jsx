import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../cards/Card";
import CardSkeleton from "../cards/CardSkeleton";

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center my-12">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Featured Habits
          </h2>
          <p className="text-accent/80 max-w-2xl mx-auto">
            Discover the most popular and recently added habits from our
            community.
          </p>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="col-span-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))
              : habits.map((habit, index) => (
                  <Card key={habit._id || index} habit={habit} index={index} />
                ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
