import { useState, useContext } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Register from "../animations/register.json";

const Login = () => {
  const { signInUser, signInWithGoogle, setLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Log In successful!");
        e.target.reset();
        navigate(location.state?.from || "/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (!error?.code) {
          toast.error("An unknown error occurred.");
          return;
        }
        const messages = {
          "auth/invalid-email": "Invalid email address.",
          "auth/user-disabled": "This user account has been disabled.",
          "auth/user-not-found": "No account found with this email.",
          "auth/wrong-password": "Incorrect password. Please try again.",
          "auth/network-request-failed":
            "Network error. Check your internet connection.",
          "auth/invalid-credential":
            "The login credential is invalid. Please try again.",
        };
        toast.error(messages[error.code] || error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google sign in successful!");
        navigate(location.state?.from || "/");
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
    <div className="min-h-screen lg:px-10 flex items-center justify-center bg-gray-100">
      <title>Habit Tracker | Log In</title>

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
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleLogIn}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your email"
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
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>

            <div className="text-right mt-1">
              <button
                type="button"
                className="text-sm text-green-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition"
          >
            Login
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
            <span>Login with Google</span>
          </button>
        </motion.div>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
