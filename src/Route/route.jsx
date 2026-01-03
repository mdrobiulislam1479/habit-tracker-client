import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import AddHabit from "../Pages/AddHabit";
import MyHabits from "../Pages/MyHabits";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import BrowsePublicHabits from "../Pages/BrowsePublicHabits";
import PrivateRoute from "./PrivateRoute";
import HabitDetails from "../Pages/HabitDetails";
import NotFound from "../Pages/NotFound";
import ProgressDashboard from "../Components/ProgressDashboard";
import LoadingSpinner from "../Components/shared/LoadingSpinner";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-habit",
        element: (
          <PrivateRoute>
            <AddHabit />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-habits",
        element: (
          <PrivateRoute>
            <MyHabits />
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-public-habits",
        element: <BrowsePublicHabits />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/habit/:id",
        element: <HabitDetails />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <ProgressDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);
