import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (userData) => {
  return api.post("/api/user/register", userData);
};

export const loginUser = (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  return api.post("/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(response => {
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.error || "Login failed");
    }
  }).catch(error => {
    if (error.response && error.response.status === 401) {
      throw new Error(error.response.data.error || "Invalid username or password");
    }
    throw error;
  });
};

export const getCitizenReports = () => {
  return api.get("/api/reports/all");
};

export const getOfficerDashboard = () => {
  return api.get("/api/cases/dashboard");
};

export const getCurrentUser = () => {
  return api.get("/api/user/current");
};

export default api;       