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
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-linear-to-br from-secondary to-blue-500">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Stay Connected
          </h2>
          <p className="text-base md:text-lg text-blue-100">
            Subscribe to get weekly tips, motivation, and success stories.
          </p>
        </div>

        {/* Newsletter Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3 justify-center w-full"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:max-w-sm px-5 py-4 rounded-lg bg-white bg-opacity-95 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white outline-none transition font-medium"
            required
          />

          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-secondary font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition shadow-lg"
          >
            Subscribe
          </button>
        </form>

        {/* Privacy Notice */}
        <p className="mt-6 text-blue-100 text-xs md:text-sm">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;
