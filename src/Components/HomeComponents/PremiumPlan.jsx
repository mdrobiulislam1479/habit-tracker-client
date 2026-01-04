import { FaCheck } from "react-icons/fa";
import { Link } from "react-router";

const PremiumPlan = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Get started with basic features",
      features: [
        "Up to 5 habits",
        "Basic tracking",
        "Progress dashboard",
        "Community access",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "9.99",
      description: "Perfect for serious habit builders",
      features: [
        "Unlimited habits",
        "Advanced analytics",
        "Custom themes",
        "Priority support",
        "Export reports",
        "Ad-free experience",
      ],
      buttonText: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Team",
      price: "19.99",
      description: "For teams and organizations",
      features: [
        "Everything in Premium",
        "Team collaboration",
        "Admin dashboard",
        "Bulk analytics",
        "Custom branding",
        "API access",
      ],
      buttonText: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Premium Plan
          </h2>
          <p className="text-accent/80 max-w-2xl mx-auto">
            Choose the perfect plan for your habit tracking journey
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg overflow-hidden transition-all transform hover:scale-[1.03] flex flex-col
                ${
                  plan.highlighted
                    ? "bg-linear-to-br from-secondary to-blue-500 text-white order-first lg:order-0"
                    : "bg-primary text-accent"
                }`}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <div className="bg-yellow-400 text-gray-800 text-center py-2 font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Header */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.highlighted
                      ? "text-blue-100"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  {plan.price !== "0" && (
                    <span
                      className={`text-sm ml-1 ${
                        plan.highlighted
                          ? "text-blue-100"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      /month
                    </span>
                  )}
                </div>

                {/* Button */}
                <Link
                  to="/contact"
                  className={`w-full py-4 rounded-lg font-bold text-center mb-8 transition border-0 ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-secondary text-white hover:bg-secondary/80"
                  }`}
                >
                  {plan.buttonText}
                </Link>

                {/* Features */}
                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheck
                        className={`text-lg ${
                          plan.highlighted ? "text-green-200" : "text-green-500"
                        }`}
                      />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-accent/60">
            All plans include a 30-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumPlan;
