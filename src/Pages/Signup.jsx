import { useState, useContext } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Register from "../animations/register.json";

export default function Signup() {
  const { createUser, signInWithGoogle, setLoading } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const allValid = hasUppercase && hasLowercase && hasMinLength;

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        });
        setLoading(false);
        e.target.reset();
        navigate("/");
        toast.success("Registration successful!");
      })
      .catch((error) => {
        setLoading(false);
        const messages = {
          "auth/email-already-in-use":
            "Email is already in use. Try logging in instead.",
          "auth/invalid-email": "Invalid email address.",
          "auth/operation-not-allowed":
            "Email/password accounts are not enabled.",
          "auth/weak-password":
            "Password is too weak. Please use at least 6 characters.",
          "auth/network-request-failed":
            "Network error. Check your internet connection.",
        };
        toast.error(messages[error.code] || error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google sign in successful!");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const messages = {
          "auth/popup-closed-by-user":
            "Sign-in popup was closed before completing.",
          "auth/cancelled-popup-request":
            "Cancelled previous popup request. Try again.",
          "auth/account-exists-with-different-credential":
            "An account already exists with the same email but different sign-in method.",
        };
        toast.error(messages[error.code] || error.message);
      });
  };

  return (
    <div className="min-h-screen lg:px-10 pt-16 flex items-center justify-center bg-gray-100">
      <title>Habit Tracker | Register</title>

      <motion.div
        className="w-1/2 hidden lg:block"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, type: "spring", bounce: 0.5 }}
      >
        <Lottie animationData={Register} loop={true} />
      </motion.div>

      <motion.div
        className="w-full max-w-md sm:bg-white rounded-lg sm:shadow-md p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="Enter photo URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>

            <div className="mt-2 text-sm">
              <p
                className={`flex items-center gap-2 ${
                  hasUppercase ? "text-green-600" : "text-gray-500"
                }`}
              >
                {hasUppercase ? <FaCircleCheck /> : <RxCross2 />} Must have an
                uppercase letter
              </p>
              <p
                className={`flex items-center gap-2 ${
                  hasLowercase ? "text-green-600" : "text-gray-500"
                }`}
              >
                {hasLowercase ? <FaCircleCheck /> : <RxCross2 />} Must have a
                lowercase letter
              </p>
              <p
                className={`flex items-center gap-2 ${
                  hasMinLength ? "text-green-600" : "text-gray-500"
                }`}
              >
                {hasMinLength ? <FaCircleCheck /> : <RxCross2 />} At least 6
                characters long
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className={`w-full py-2 rounded-md font-semibold text-white transition ${
              allValid
                ? "bg-green-500 hover:bg-green-600"
                : "bg-green-300 cursor-not-allowed"
            }`}
            disabled={!allValid}
          >
            Register
          </motion.button>
        </form>

        <div className="divider">or</div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4"
        >
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>
        </motion.div>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
