import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { AiFillTwitterCircle } from "react-icons/ai";
import { motion } from "framer-motion";

export default function Footer() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const iconHover = {
    scale: 1.2,
    color: "#16a34a",
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <footer className="border-t border-gray-300 py-10 bg-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <motion.div
            className=""
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <img src={Logo} alt="Logo" className="h-12 object-contain" />
            <p className="text-sm text-gray-600 mt-3">
              Build better habits, one day at a time.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h3 className="text-lg font-medium mb-2">Contact</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>Email: example@gmail.com</li>
              <li>Phone: +8801XXXXXXXXX</li>
              <li>Address: Khulna, Bangladesh</li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h3 className="text-lg font-medium mb-2">Legal</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>
                <a className="hover:underline cursor-pointer">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Privacy Policy</a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h3 className="text-lg font-medium mb-2">Follow Us</h3>
            <div className="flex gap-4 text-gray-700 text-2xl">
              <motion.a whileHover={iconHover} className="cursor-pointer">
                <FaFacebook />
              </motion.a>
              <motion.a
                whileHover={iconHover}
                className="cursor-pointer text-[28px]"
              >
                <AiFillTwitterCircle />
              </motion.a>
              <motion.a whileHover={iconHover} className="cursor-pointer">
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          © {new Date().getFullYear()} Habit Tracker. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
