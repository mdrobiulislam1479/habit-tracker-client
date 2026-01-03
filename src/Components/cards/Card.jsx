import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { IoMdPricetags } from "react-icons/io";
import { Link } from "react-router";

const Card = ({ habit, index }) => {
  return (
    <motion.div
      key={habit._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-primary shadow-md rounded-xl p-5 border border-accent/5 hover:shadow-lg transition group"
    >
      <div className="h-40 w-full overflow-hidden rounded-md mb-3">
        <img
          src={habit.image}
          alt={habit.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col justify-between h-42">
        <h3 className="text-lg font-semibold text-accent">{habit.title}</h3>
        <p className="text-sm text-accent/80 mt-2 line-clamp-3">
          {habit.description || "No description available."}
        </p>

        <div className="flex items-center justify-between mt-3 text-sm text-accent/60">
          {habit.userName && (
            <p className="flex items-center gap-1">
              <CgProfile />{" "}
              <span className="font-medium">{habit.userName}</span>
            </p>
          )}
          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <IoMdPricetags />
            {habit.category || "General"}
          </span>
        </div>

        <div className="mt-4">
          <Link
            to={`/habit/${habit._id}`}
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-secondary rounded-lg hover:bg-secondary/80 transition w-full text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
