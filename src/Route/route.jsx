import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import AddHabit from "../Pages/AddHabit";
import MyHabits from "../Pages/MyHabits";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import BrowsePublicHabits from "../Pages/BrowsePublicHabits";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-habit",
        element: <AddHabit />,
      },
      {
        path: "/my-habits",
        element: <MyHabits />,
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
    ],
  },
]);
