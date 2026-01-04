import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { CiUser } from "react-icons/ci";
import { FaIdCard, FaCheck } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update name + photoURL directly
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      // Reload user to reflect changes
      await user.reload();

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
       <title>Dashboard | Profile</title>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-accent mb-2">User Profile</h1>
          <p className="text-accent/80">Manage your account information</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-primary shadow-xl rounded-2xl overflow-hidden border border-slate-100">
              <div className="h-32 bg-linear-to-br from-secondary to-blue-500"></div>
              <div className="px-8 pb-8 -mt-16">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={
                        user?.photoURL ||
                        "https://img.icons8.com/glyph-neue/64/user-male-circle.png"
                      }
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg bg-white"
                    />
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-accent mb-1">
                    {user?.displayName || "No Name"}
                  </h2>
                  <p className="text-accent/70 text-sm">{user?.email}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <MdMailOutline size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-accent/70 uppercase tracking-wider mb-1">
                        Email Address
                      </p>
                      <p className="text-sm text-accent truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-blue-600">
                      <FaIdCard size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-accent/70 uppercase tracking-wider mb-1">
                        User ID
                      </p>
                      <p className="text-sm text-accent font-mono truncate">
                        {user?.uid}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Update Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-primary shadow-xl rounded-2xl p-6 border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-accent mb-4">
              Edit Profile
            </h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-accent/80 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CiUser size={20} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 text-accent/90"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-semibold text-accent/80 mb-2">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 text-accent/90"
                />
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-3.5 bg-secondary text-white rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaCheck />
                Save Changes
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
