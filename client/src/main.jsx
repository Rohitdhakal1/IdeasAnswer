import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "../src/Context.jsx/AuthContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
