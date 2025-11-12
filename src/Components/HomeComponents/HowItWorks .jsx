import { FaClipboardList, FaCheckCircle, FaChartBar } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaClipboardList className="text-green-500 text-5xl mb-4" />,
      title: "1. Create Your Habits",
      description:
        "Set clear, specific goals for the habits you want to build or improve.",
    },
    {
      icon: <FaCheckCircle className="text-green-500 text-5xl mb-4" />,
      title: "2. Track Your Progress",
      description:
        "Log your daily actions and see your consistency improve over time.",
    },
    {
      icon: <FaChartBar className="text-green-500 text-5xl mb-4" />,
      title: "3. Celebrate Achievements",
      description:
        "View your streaks, milestones, and progress charts — and keep growing.",
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
  };

  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Build better habits in just three easy steps.
        </p>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform"
              variants={cardVariants}
            >
              <div className="flex flex-col items-center">
                {step.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
