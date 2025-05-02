import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://crime-reporting-system-backend.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => {
  return api.post("/api/user/register", userData);
};

export const loginUser = (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  return api
    .post("/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      if (response.data.success) {
        return response;
      } else {
        throw new Error(response.data.error || "Login failed");
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data.error || "Invalid username or password");
      }
      throw error;
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
  return api.post("/api/user/logout");
};

export const updateCaseStatus = (caseId, status) => {
  return api.put(`/api/cases/${caseId}/status`, null, {
      params: { status },
  });
};

export default api;