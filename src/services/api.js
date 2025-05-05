import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "https://crime-reporting-system-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => {
  return api.post("/api/user/register", userData);
};

export const loginUser = (username, password) => {
  return api
    .post("/api/auth/login", { username, password })
    .then((response) => {
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        return response;
      } else {
        throw new Error("No token received from server");
      }
    })
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Invalid username or password"
      );
    });
};

export const getCitizenReports = () => {
  return api.get("/api/reports/all");
};

export const submitReport = (reportData) => {
  return api.post("/api/reports", reportData);
};

export const getPendingReports = () => {
  return api.get("/api/reports/pending");
};

export const getRejectedReports = () => {
  return api.get("/api/reports/rejected");
};

export const getInvestigatingCases = () => {
  return api.get("/api/cases/dashboard");
};

export const getAllCases = () => {
  return api.get("/api/cases/all");
};

export const getOfficers = () => {
  return api.get("/api/user/officers");
};

export const reassignCase = (caseId, officerId) => {
  return api.put(`/api/cases/${caseId}/reassign`, null, {
    params: { officerId },
  });
};

export const rejectReport = (reportId, rejectionReason) => {
  return api.post(`/api/cases/reports/${reportId}/reject`, null, {
    params: { rejectionReason },
  });
};

export const acceptReport = (reportId, caseId) => {
  return api.post(`/api/cases/reports/${reportId}/accept`, null, {
    params: { caseId: caseId || null },
  });
};

export const createCase = (caseData) => {
  return api.post("/api/cases", caseData);
};

export const getCurrentUser = () => {
  return api.get("/api/user/current");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  return api.post("/api/user/logout").finally(() => {
    window.location.href = "/login";
  });
};

export const updateCaseStatus = (caseId, status) => {
  return api.put(`/api/cases/${caseId}/status`, null, {
    params: { status },
  });
};

export default api;