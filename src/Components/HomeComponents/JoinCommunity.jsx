import { FaUsers, FaComments, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";

const JoinCommunity = () => {
  const { user } = use(AuthContext);
  const features = [
    {
      icon: <FaUsers className="text-green-500 text-5xl mb-4" />,
      title: "Connect with Others",
      description:
        "Join like-minded individuals who are also working on improving themselves every day.",
    },
    {
      icon: <FaComments className="text-green-500 text-5xl mb-4" />,
      title: "Share Motivation",
      description:
        "Exchange ideas, celebrate achievements, and support each other’s journeys.",
    },
    {
      icon: <FaHeart className="text-green-500 text-5xl mb-4" />,
      title: "Grow Together",
      description:
        "Stay inspired by seeing how others achieve their goals — and inspire them in return.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className="py-16 bg-gray-50" id="community">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Stay motivated by connecting with people who share your passion for
          self-improvement.
        </p>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex flex-col items-center">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {user ? (
          ""
        ) : (
          <div className="mt-10">
            <Link
              to="/login"
              className=" bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default JoinCommunity;
