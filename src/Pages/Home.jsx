import BannerSlider from "../Components/HomeComponents/BannerSlider";
import HowItWorks from "../Components/HomeComponents/HowItWorks ";
import JoinCommunity from "../Components/HomeComponents/JoinCommunity";
import WhyBuildHabits from "../Components/HomeComponents/WhyBuildHabits";

const Home = () => {
  return (
    <div>
      <title>Habit Tracker | Home</title>
      <BannerSlider />
      <WhyBuildHabits />
      <HowItWorks />
      <JoinCommunity />
    </div>
  );
};

export default Home;
