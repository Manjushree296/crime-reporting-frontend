import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
import Header from "./Header";
import Footer from "./Footer";
import { Icon } from "@iconify/react";
import { getCitizenReports } from "../services/api";
import toast from "react-hot-toast";

function CaseCard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getCitizenReports();
        console.log("Fetched reports:", response.data);
        console.log("Officer",response.data[0].officerName)
        setReports(response.data);
      } catch (err) {
        console.error("Error fetching reports:", err.response?.data || err.message);
        const errorMessage = err.response?.data?.error || "Failed to load reports. Please try again later.";
        setError(errorMessage);
        if (err.response?.status === 401) {
          console.log("Session expired, redirecting to login...");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getReportStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { bg: "bg-amber-100", text: "text-amber-800" };
      case "accepted":
        return { bg: "bg-teal-100", text: "text-teal-800" };
      case "rejected":
        return { bg: "bg-red-100", text: "text-red-800" };
      case "investigating":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "resolved":
        return { bg: "bg-green-100", text: "text-green-800" };
      default:
        return { bg: "bg-default-100", text: "text-default-800" };
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
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
              ) : reports.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-default-400">
                  <Icon icon="lucide:inbox" className="text-5xl mb-4" />
                  <p className="text-lg">No reports submitted</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                  {reports.map((report) => (
                    <Card
                      key={report.id}
                      className="bg-white shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
                    >
                      <CardBody className="gap-2 p-5">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold">{report.title}</h3>
                          <span
                            className={`text-xs ${getReportStatusColor(report.status).bg} ${getReportStatusColor(report.status).text} px-2 py-1 rounded-full capitalize`}
                          >
                            {report.status}
                          </span>
                        </div>
                        <p className="text-default-500 text-sm line-clamp-2">
                          {report.description}
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:user" className="text-default-400" />
                            <span>Victim: {report.victimName || "Self"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:map-pin" className="text-default-400" />
                            <span>Location: {report.location}</span>
                          </div>
                          
                          
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:user-check" className="text-default-400" />
                              <span>Officer: {report.officerName}</span>
                              {report.officerName || "Not assigned"}
                            </div>
                          
                          {report.status === "rejected" && report.rejectionReason && (
                            <div className="mt-2 p-2 bg-red-50 rounded-md">
                              <p className="text-sm font-medium text-red-700">Rejection Reason:</p>
                              <p className="text-sm text-red-600">{report.rejectionReason}</p>
                            </div>
                          )}
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