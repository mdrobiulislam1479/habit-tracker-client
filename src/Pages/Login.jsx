import { use, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle, setLoading } = use(AuthContext);
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
        navigate(location.state || "/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (!error?.code) {
          toast.error("An unknown error occurred.");
          return;
        }

        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address.");
        } else if (error.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet connection.");
        } else if (error.code === "auth/invalid-credential") {
          toast.error("The login credential is invalid. Please try again.");
        } else {
          toast.error(`${error.message}`);
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google sign in successful!");
        navigate(location?.state || "/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("Sign-in popup was closed before completing.");
        } else if (error.code === "auth/cancelled-popup-request") {
          toast.error("Cancelled previous popup request. Try again.");
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          toast.error(
            "An account already exists with the same email but different sign-in method."
          );
        } else {
          toast.error(`${error.message}`);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <title>Habit Tracker | Log In</title>
      <div
        className="w-full max-w-md sm:bg-white rounded-lg sm:shadow-md p-8"
        data-aos="zoom-in"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4 " onSubmit={handleLogIn}>
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

          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>
        <div className="divider">or</div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />
            <span>Login with Google</span>
          </button>
        </div>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
