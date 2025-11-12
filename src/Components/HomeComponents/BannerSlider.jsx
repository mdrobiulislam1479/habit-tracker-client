import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { Link } from "react-router";

const BannerSlider = () => {
  const slides = [
    {
      image:
        "https://i.ibb.co.com/mr1VqshY/Group-ouseburn-walk-4-aspect-ratio-16-9.png",
      title: "Build Better Habits Every Day",
      description:
        "Stay consistent and track your progress toward becoming your best self.",
    },
    {
      image:
        "https://i.ibb.co.com/gZ9wNV8Y/The-Importance-of-Sustained-Growth.webp",
      title: "Visualize Your Growth",
      description:
        "See your streaks, milestones, and celebrate every achievement along the way.",
    },
    {
      image:
        "https://i.ibb.co.com/FbdDhwtS/Blog-Healthy-Community-feature-final-1.jpg",
      title: "Join a Community of Achievers",
      description:
        "Connect with others, share your journey, and stay inspired to keep going.",
    },
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="mt-16">
      <Swiper
        modules={[EffectFade, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[300px] lg:h-[500px] overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
                <motion.h2
                  className="text-2xl md:text-4xl font-bold mb-3"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  key={slide.title}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  className="text-sm md:text-lg max-w-2xl text-white/60"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2, duration: 0.8 }}
                  key={slide.description}
                >
                  {slide.description}
                </motion.p>
                <Link
                  className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-5 rounded-lg transition"
                  to="/add-habit"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
