import { Link } from "react-router";

const About = () => {
  const HabitsMatter = [
    {
      id: 1,
      icon: "📈",
      title: "Compound Growth",
      description:
        "Small habits compound over time. Just 1% improvement each day leads to 37x growth in a year.",
    },
    {
      id: 2,
      icon: "🎯",
      title: "Goal Achievement",
      description:
        "Transform big goals into manageable daily actions. Track your progress and stay motivated.",
    },
    {
      id: 3,
      icon: "💪",
      title: "Self Discipline",
      description:
        "Building habits strengthens your willpower and creates a positive identity.",
    },
    {
      id: 4,
      icon: "🌟",
      title: "Better Life Quality",
      description:
        "Positive habits improve your health, relationships, productivity, and overall well-being.",
    },
  ];

  const WeOffer = [
    {
      id: 1,
      title: "Easy Habit Tracking",
      description:
        "Create and track multiple habits with a user-friendly interface.",
    },
    {
      id: 2,
      title: "Progress Visualization",
      description:
        "See your progress at a glance with beautiful charts and statistics.",
    },
    {
      id: 3,
      title: "Community Support",
      description:
        "Share habits, inspire others, and get motivated by a supportive community.",
    },
    {
      id: 4,
      title: "Personalized Dashboard",
      description:
        "Customize your dashboard to focus on what matters most to you.",
    },
    {
      id: 5,
      title: "Goal Tracking",
      description:
        "Set long-term goals and break them down into daily actions.",
    },
    {
      id: 6,
      title: "Dark Mode Support",
      description: "Use Habit Tracker comfortably at any time of day.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-linear-to-br from-secondary  to-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Habit Tracker
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Transform your life through the power of consistent daily habits
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-accent mb-6">Our Mission</h2>
          <p className="text-lg text-accent/80 leading-relaxed mb-4">
            At Habit Tracker, we believe that small, consistent actions lead to
            remarkable transformations. Our mission is to empower individuals to
            build positive habits and achieve their personal goals through a
            simple, intuitive platform that tracks progress and celebrates
            success.
          </p>
          <p className="text-lg text-accent/80 leading-relaxed">
            We're dedicated to helping you develop the discipline and
            self-awareness needed to create lasting change in your life.
          </p>
        </section>

        {/* Why Habits Matter Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-accent mb-8">
            Why Habits Matter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HabitsMatter.map((matter) => {
              return (
                <div
                  key={matter.id}
                  className="bg-primary p-8 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-xl">{matter.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-accent mb-3">
                    {matter.title}
                  </h3>
                  <p className="text-gray-400">{matter.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-accent mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WeOffer.map((offer) => {
              return (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-accent mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-accent/70">{offer.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-linear-to-br from-secondary  to-blue-500 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Your Habit Journey Today
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of people who are transforming their lives through
            consistent, positive habits. Begin your journey to becoming the best
            version of yourself.
          </p>
          <Link
            to="/add-habit"
            className="inline-block bg-white text-secondary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Get Started Free
          </Link>
        </section>

        {/* Contact Section */}
        <section className="mt-16 bg-primary p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-accent mb-6">
            Have Questions?
          </h2>
          <p className="text-accent/70  mb-4">
            We'd love to hear from you. If you have any questions or
            suggestions, feel free to reach out to us.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-secondary/80 transition duration-300"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
