import { FaUsers, FaComments, FaHeart } from "react-icons/fa";

const JoinCommunity = () => {
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

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform"
            >
              <div className="flex flex-col items-center">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-10 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition">
          Join Now
        </button>
      </div>
    </section>
  );
};

export default JoinCommunity;
