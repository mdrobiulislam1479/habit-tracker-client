import { Link } from "react-router";
import Lottie from "lottie-react";
import Error404 from "../animations/Error 404.json";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4">
      <Lottie animationData={Error404} loop={true} />
      <p className="text-gray-500 mb-4 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Go Home
      </Link>
    </section>
  );
}
