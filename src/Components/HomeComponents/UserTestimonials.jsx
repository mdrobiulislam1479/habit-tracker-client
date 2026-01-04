import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "Habit Tracker helped me build tiny routines that added up — I finally finished my 60-day goal!",
    name: "Asha K.",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
  },
  {
    quote:
      "Simple, clear and motivating. The streaks keep me accountable and I love the weekly summaries.",
    name: "Marcus L.",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
  },
  {
    quote:
      "I switched to Premium for the analytics — best decision. The insights helped me focus my routines.",
    name: "Priya S.",
    role: "Freelancer",
    avatar: "https://i.pravatar.cc/100?img=8",
    rating: 4,
  },
];

const UserTestimonials = () => {
  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
          What our users say
        </h2>
        <p className="text-accent/80 mb-12">
          Real results from real people — short stories of progress and habit
          wins.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((tst, i) => (
            <div key={i} className="w-full">
              <div className="bg-primary rounded-xl shadow-md p-8 text-left md:text-center h-full flex flex-col">
                <div className="flex items-start gap-4 md:flex-col md:items-center">
                  <img
                    src={tst.avatar}
                    alt={tst.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="text-accent text-lg md:text-xl mt-2 md:mt-4">
                    “{tst.quote}”
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 md:justify-center">
                  <div className="text-sm font-semibold text-accent">
                    {tst.name}
                  </div>
                  <div className="text-sm text-accent/70">— {tst.role}</div>
                </div>

                <div className="mt-4 flex items-center md:justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <FaStar
                      key={s}
                      className={`${
                        s < tst.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
