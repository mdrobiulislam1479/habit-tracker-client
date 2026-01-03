import Swal from "sweetalert2";

const NewsletterSignup = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Successful!",
      text: "Thank you! You have successfully subscribed.",
      icon: "success",
    });
    e.target.reset();
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-linear-to-br from-secondary  to-blue-500">
      {/* Decorative elements */}

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Connected
          </h2>
          <p className="text-lg text-blue-100 mb-2">
            Subscribe to get weekly tips, motivation, and success stories.
          </p>
        </div>

        {/* Newsletter Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <div className="flex-1 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 bg-white bg-opacity-95 text-gray-800 placeholder-gray-500 font-medium transition"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-white text-secondary font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition transform  shadow-lg cursor-pointer"
          >
            Subscribe
          </button>
        </form>

        {/* Privacy Notice */}
        <p className="mt-8 text-blue-100 text-xs md:text-sm">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;
