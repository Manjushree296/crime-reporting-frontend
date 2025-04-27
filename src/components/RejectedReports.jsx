import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { getRejectedReports } from "../services/api";
import toast from "react-hot-toast";

export const RejectedReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getRejectedReports();
        setReports(response.data);
      } catch (error) {
        toast.error("Failed to load rejected reports");
      }
    };
    fetchReports();
  }, []);

  const getReporterTypeDisplay = (report) => {
    const type = report.reporterType.charAt(0).toUpperCase() + report.reporterType.slice(1);
    switch (report.reporterType) {
      case "self":
        return "Self";
      case "witness":
        return report.victimName ? `Witness (Victim: ${report.victimName})` : "Witness";
      case "victim":
        return report.victimName ? `Victim (${report.victimName})` : "Victim";
      default:
        return type;
    }
  };

  return (
    <div className="py-4">
      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="bg-white shadow-sm">
              <CardBody className="gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{report.title}</h3>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Rejected</span>
                </div>
                <p className="text-default-500 text-sm line-clamp-2">{report.description}</p>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:map-pin" className="text-default-400" />
                    <span>Location: {report.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:calendar" className="text-default-400" />
                    <span>Date: {report.incidentDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:user" className="text-default-400" />
                    <span>Victim: {report.victimName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:users" className="text-default-400" />
                    <span>Reporter Type: {getReporterTypeDisplay(report)}</span>
                  </div>
                  {report.rejectionReason && (
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
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-default-400">
          <Icon icon="lucide:inbox" className="text-5xl mb-4" />
          <p className="text-lg">No rejected reports</p>
        </div>
      )}
    </div>
  );
};