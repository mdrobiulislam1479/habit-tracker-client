import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            {/* Logo */}
            <Link to={"/"} className="flex items-center -ml-3 -mb-5">
              <img src={Logo} alt="Logo" className="h-18 object-contain" />
              <p className="text-3xl font-bold text-[#222831]">
                Habit<span className="text-secondary">Tracker</span>
              </p>
            </Link>

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
            <h3 className="text-lg font-medium mb-2 text-[#222831]">Contact</h3>
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
            <h3 className="text-lg font-medium mb-2 text-[#222831]">Legal</h3>
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
            <h3 className="text-lg font-medium mb-2 text-[#222831]">
              Follow Us
            </h3>
            <div className="flex gap-4 text-gray-700 text-2xl">
              <motion.a whileHover={iconHover} className="cursor-pointer">
                <FaFacebook />
              </motion.a>
              <motion.a whileHover={iconHover} className="cursor-pointer">
                <FaSquareXTwitter />
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
