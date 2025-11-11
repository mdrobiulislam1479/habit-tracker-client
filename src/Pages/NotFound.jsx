import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-8xl font-extrabold text-green-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
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
