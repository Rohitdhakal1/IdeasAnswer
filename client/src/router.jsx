import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Notepage from "./pages/notepage";
import ChatPage from "./pages/Chatpage";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/notes",
        element: (
          <ProtectedRoutes>
            <Notepage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoutes>
            <ChatPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
