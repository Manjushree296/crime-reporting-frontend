import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import { getCurrentUser } from "./services/api";

function Root() {
  const navigate = useNavigate();

  

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await getCurrentUser();
        const user = response.data;
        // If user is authenticated, redirect based on role
        if (user.role === "CITIZEN") {
          localStorage.setItem("userRole", "CITIZEN"); // Store role for RoleRoute
          navigate("/dashboard/citizen");
        } else if (user.role === "POLICE") {
          localStorage.setItem("userRole", "POLICE");
          navigate("/dashboard/officer");
        }
      } catch (error) {
        // Not authenticated, stay on login page
        console.log("User not authenticated, showing login form");
      }
    };
    checkUser();
  }, [navigate]);

  return <LoginForm />;
}

export default Root;