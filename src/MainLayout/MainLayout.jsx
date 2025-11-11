import Navbar from "../Components/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer";

const MainLayout = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
