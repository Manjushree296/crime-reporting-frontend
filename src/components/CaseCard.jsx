import React from "react";
import { Card, CardBody } from "@heroui/react";
import Header from "./Header";
import Footer from "./Footer";

function CaseCard() {
  const reports = [
    {
      id: 1,
      title: "Bike Theft Reported",
      description: "A black mountain bike was reported stolen near City Park.",
      status: "Pending",
      victimName: "Alice Johnson",
      location: "City Park",
      assignedOfficer: "Officer Brown",
    },
    {
      id: 2,
      title: "Suspicious Activity Investigation",
      description:
        "Investigating multiple reports of suspicious activity at the old warehouse.",
      status: "Investigating",
      victimName: "Community Residents",
      location: "Old Warehouse District",
      assignedOfficer: "Detective Lee",
    },
    {
      id: 3,
      title: "Burglary Case Closed",
      description:
        "A recent burglary case has been resolved with an arrest made.",
      status: "Resolved",
      victimName: "Mark Stevens",
      location: "Sunset Boulevard",
      assignedOfficer: "Officer Patel",
    },
  ];

  const getBorderColor = (status) => {
    switch (status) {
      case "Pending":
        return "border-l-4 border-yellow-400";
      case "Investigating":
        return "border-l-4 border-blue-400";
      case "Resolved":
        return "border-l-4 border-green-400";
      default:
        return "border-l-4 border-gray-400";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Investigating":
        return "text-blue-500";
      case "Resolved":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusDotColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400";
      case "Investigating":
        return "bg-blue-400";
      case "Resolved":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <>
     <div className="min-h-screen flex flex-col  bg-gradient-to-b from-slate-50 to-slate-10"> 
    <Header/>
    <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
    <div className="container mx-auto max-w-7xl">
      <div className=" mb-6 bg-white rounded-lg p-6 border shadow-sm">
        <h1 className="text-2xl font-bold">All Submitted Reports</h1>
        <p className="text-default-500">Monitor and report crimes with ease.</p>
      </div>
      <div className="bg-white rounded-lg p-6 border shadow-sm">
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
                    {report.status}
                  </span>
                </div>
              </div>

              <p className="text-default-500 text-sm mb-4 line-clamp-2">
                {report.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Victim:</span>{" "}
                  {report.victimName}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium">Location:</span>{" "}
                  {report.location}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium">Officer:</span>{" "}
                  {report.assignedOfficer}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
        </div>

      </div>
      </main>
      <Footer /> {/* 👈 Now Footer will stick nicely at bottom */}
      </div>
    </>
  );
}

export default CaseCard;
