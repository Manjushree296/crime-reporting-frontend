import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupForm from "./pages/SignupForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
]);

createRoot(document.getElementById("root")).render(

    <App />
  
);
