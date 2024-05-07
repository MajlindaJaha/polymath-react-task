import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Login from "../views/login";

import AuthGuard from "./auth-gard";
import Signup from "../views/signup";
import ProfilePage from "../views/profile";
import Tasks from "../views/tasks";
import Lists from "../views/lists";
import EditTask from "../views/edit-task";

const router = createBrowserRouter([
  {
    path: "/profile",
    element: (
      <AuthGuard>
        <ProfilePage />
      </AuthGuard>
    ),
    errorElement: <h1>error page</h1>,
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
    path: "/tasks",
    element: (
      <AuthGuard>
        <Tasks />
      </AuthGuard>
    ),
  },
  {
    path: "/lists",
    element: (
      <AuthGuard>
        <Lists />
      </AuthGuard>
    ),
  },
  {
    path: "/tasks/edit/:id",
    element: (
      <AuthGuard>
        <EditTask />
      </AuthGuard>
    ),
  },
]);

export default router;
