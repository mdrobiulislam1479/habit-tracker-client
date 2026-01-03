import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaRegSmileBeam, FaRocket, FaHeadset } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Successful!",
      text: "Your message has been sent successfully.",
      icon: "success",
    });
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* HERO SECTION */}
      <section className="py-16 px-4 bg-linear-to-br from-secondary  to-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl opacity-90">
            Have a question or feedback? We're always here to help!
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* CONTACT FORM */}
            <div className="lg:col-span-2">
              <div className="bg-primary text-primary-content p-8 md:p-10 rounded-2xl shadow-xl border border-base-300">
                <h2 className="text-3xl font-bold mb-8 text-accent">
                  Send Us a Message
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-accent/80">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-base-300 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-accent/80">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-base-300 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-accent/80">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-base-300 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-accent/80">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-3 border border-base-300 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-secondary focus:border-transparent outline-none resize-none transition"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-secondary text-white font-bold py-4 rounded-lg hover:bg-green-600 transform  transition duration-300 shadow-lg cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* CONTACT INFO SIDEBAR */}
            <div className="space-y-8">
              <div className="bg-primary text-primary-content p-8 rounded-2xl shadow-xl border border-base-300">
                <h3 className="text-2xl font-bold mb-8 text-accent">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <FiMail className="text-secondary text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent">Email</h4>
                      <a
                        href="mailto:support@habittracker.com"
                        className="text-base-content/80 hover:text-secondary transition"
                      >
                        support@habittracker.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <FiPhone className="text-secondary text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent">Phone</h4>
                      <a
                        href="tel:+1234567890"
                        className="text-base-content/80 hover:text-secondary transition"
                      >
                        +8801900000000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <FiMapPin className="text-secondary text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent">Location</h4>
                      <p className="text-base-content/80 leading-relaxed">
                        Khulna, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CONTACT US SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Why Reach Out to Us?
          </h2>
          <p className="text-lg text-base-content/80 mb-12 max-w-3xl mx-auto">
            We're committed to providing exceptional support to help you build
            better habits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRegSmileBeam className="text-5xl text-secondary" />,
                title: "Friendly & Human Support",
                text: "Our team is patient, empathetic, and truly cares about your success.",
              },
              {
                icon: <FaRocket className="text-5xl text-secondary" />,
                title: "Lightning Fast Responses",
                text: "Most inquiries are answered within hours — we move fast!",
              },
              {
                icon: <FaHeadset className="text-5xl text-secondary" />,
                title: "Always Available",
                text: "Reach out anytime. We're here for you around the clock.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-primary text-primary-content p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-base-300"
              >
                <div className="mb-6 flex justify-center">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-accent">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-base-content/90">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
