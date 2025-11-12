import { Link } from "react-router";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Error404 from "../animations/Error 404.json";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        className="w-64 h-64 md:w-96 md:h-96"
      >
        <Lottie animationData={Error404} loop={true} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-gray-500 mb-4 max-w-md"
      >
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </section>
  );
}
