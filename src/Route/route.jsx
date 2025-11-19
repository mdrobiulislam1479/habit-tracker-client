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
import LoadingSpinner from "../Components/LoadingSpinner";

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
        element: (
          <PrivateRoute>
            <HabitDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <ProgressDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
