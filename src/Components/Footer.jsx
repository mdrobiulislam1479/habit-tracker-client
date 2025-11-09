import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { AiFillTwitterCircle } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <img src={Logo} alt="Logo" className="h-12 object-contain" />
            <p className="text-sm text-gray-600 mt-3">
              Build better habits, one day at a time.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Contact</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>Email: example@gmail.com</li>
              <li>Phone: +8801XXXXXXXXX</li>
              <li>Address: Khulna, Bangladesh</li>
            </ul>
          </div>

          <div>
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
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Follow Us</h3>
            <div className="flex gap-4 text-gray-700  text-2xl">
              <a className="hover:text-green-500 cursor-pointer">
                <FaFacebook />
              </a>
              <a className="hover:text-green-500 cursor-pointer  text-[28px]">
                <AiFillTwitterCircle />
              </a>
              <a className="hover:text-green-500 cursor-pointer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Habit Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
