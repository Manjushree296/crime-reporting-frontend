import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
import Header from "./Header";
import Footer from "./Footer";
import { getCitizenReports } from "../services/api";

function CaseCard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getCitizenReports();
        console.log("Fetched reports:", response.data);
        setReports(response.data);
      } catch (err) {
        console.error("Error fetching reports:", err.response?.data || err.message);
        const errorMessage = err.response?.data?.error || "Failed to load reports. Please try again later.";
        setError(errorMessage);
        if (err.response?.status === 401) {
          // Optionally redirect to login page if session expired
          console.log("Session expired, redirecting to login...");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getBorderColor = (status) => {
    switch (status) {
      case "pending":
        return "border-l-4 border-yellow-400";
      case "investigating":
        return "border-l-4 border-blue-400";
      case "resolved":
        return "border-l-4 border-green-400";
      default:
        return "border-l-4 border-gray-400";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "investigating":
        return "text-blue-500";
      case "resolved":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusDotColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400";
      case "investigating":
        return "bg-blue-400";
      case "resolved":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-10">
        <Header />
        <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-6 bg-white rounded-lg p-6 border shadow-sm">
              <h1 className="text-2xl font-bold">All Submitted Reports</h1>
              <p className="text-default-500">Monitor and report crimes with ease.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              {loading ? (
                <p>Loading reports...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : reports.length === 0 ? (
                <p>No reports submitted yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {reports.map((report) => (
                    <Card
                      key={report.id}
                      className={`shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in ${getBorderColor(
                        report.status
                      )}`}
                    >
                      <CardBody className="p-4 bg-content1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">{report.title}</h3>
                          <div className="flex items-center gap-1">
                            <span
                              className={`w-3 h-3 rounded-full ${getStatusDotColor(
                                report.status
                              )} animate-pulse`}
                            />
                            <span
                              className={`text-l font-semibold ${getStatusTextColor(
                                report.status
                              )}`}
                            >
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <p className="text-default-500 text-sm mb-4 line-clamp-2">
                          {report.description}
                        </p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Victim:</span>{" "}
                            {report.victimName || "Self"}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-medium">Location:</span>{" "}
                            {report.location}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-medium">Officer:</span>{" "}
                            {report.officerName || "Not assigned"}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default CaseCard;