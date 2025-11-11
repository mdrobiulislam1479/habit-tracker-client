import BannerSlider from "../Components/HomeComponents/BannerSlider";
import FeaturedHabits from "../Components/HomeComponents/FeaturedHabits";
import HowItWorks from "../Components/HomeComponents/HowItWorks ";
import JoinCommunity from "../Components/HomeComponents/JoinCommunity";
import WhyBuildHabits from "../Components/HomeComponents/WhyBuildHabits";
import LoadingSpinner from "../Components/LoadingSpinner";

const Home = () => {
  return (
    <div>
      <title>Habit Tracker | Home</title>
      <BannerSlider />
      <FeaturedHabits />
      <WhyBuildHabits />
      <HowItWorks />
      <JoinCommunity />
    </div>
  );
};

export default Home;
