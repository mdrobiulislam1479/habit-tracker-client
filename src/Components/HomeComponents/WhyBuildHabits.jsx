import { FaBullseye, FaSmile, FaBrain, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyBuildHabits = () => {
  const benefits = [
    {
      icon: <FaBullseye className="text-green-500 text-5xl mb-4" />,
      title: "Better Focus",
      description:
        "Building good habits helps you stay focused and consistent, avoiding distractions in your daily routine.",
    },
    {
      icon: <FaSmile className="text-green-500 text-5xl mb-4" />,
      title: "Reduced Stress",
      description:
        "A predictable routine reduces stress and anxiety by creating structure in your day-to-day life.",
    },
    {
      icon: <FaBrain className="text-green-500 text-5xl mb-4" />,
      title: "Stronger Discipline",
      description:
        "Practicing good habits builds mental strength and self-control, helping you achieve long-term success.",
    },
    {
      icon: <FaChartLine className="text-green-500 text-5xl mb-4" />,
      title: "Continuous Growth",
      description:
        "By tracking and improving habits, you create a clear path toward ongoing personal development.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
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
    <section className="py-16 bg-gray-50" id="why-build-habits">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Build Habits?
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Building strong habits is the foundation of personal growth and
          success.
        </p>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex flex-col items-center">
                {benefit.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBuildHabits;
