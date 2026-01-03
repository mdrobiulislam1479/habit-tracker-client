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
import LoadingSpinner from "../Components/shared/LoadingSpinner";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import Progress from "../Pages/Progress";
import Profile from "../Pages/Profile";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Progress />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-habit",
        element: (
          <PrivateRoute>
            <AddHabit />
          </PrivateRoute>
        ),
      },
      {
        path: "my-habits",
        element: (
          <PrivateRoute>
            <MyHabits />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
