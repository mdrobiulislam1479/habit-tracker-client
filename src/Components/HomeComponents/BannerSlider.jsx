import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css/effect-fade";

const BannerSlider = () => {
  const slides = [
    {
      image:
        "https://i.ibb.co.com/rKjhWYjD/marten-bjork-6d-W3xy-Qvc-YE-unsplash.jpg",
      title: "Build Better Habits Every Day",
      description:
        "Stay consistent and track your progress toward becoming your best self.",
    },
    {
      image:
        "https://i.ibb.co.com/vCgQcX9r/tim-van-der-kuip-CPs2-X8-JYm-S8-unsplash.jpg",
      title: "Visualize Your Growth",
      description:
        "See your streaks, milestones, and celebrate every achievement along the way.",
    },
    {
      image:
        "https://i.ibb.co.com/PZN2R72c/marius-christensen-h-WZP-MRo-T6-I-unsplash.jpg",
      title: "Join a Community of Achievers",
      description:
        "Connect with others, share your journey, and stay inspired to keep going.",
    },
  ];

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
                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg max-w-2xl text-white/60">
                  {slide.description}
                </p>
                <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-5 rounded-lg transition">
                  Get Started
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
