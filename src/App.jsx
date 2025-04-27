import React from "react";
import Root from "./Root";
import SignupForm from "./pages/SignupForm";
import CitizenDashboard from "./pages/CitizenDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CaseCard from "./components/CaseCard";
import { Toaster } from 'react-hot-toast';
import LoginForm from "./pages/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/dashboard/citizen",
    element: <CitizenDashboard />,
  },
  {
    path: "/dashboard/citizen/all-reports",
    element: <CaseCard/>,
  },
  {
    path: "/dashboard/officer",
    element: <OfficerDashboard />,
  },
]);

function App() {
  return (
    <>
    <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
