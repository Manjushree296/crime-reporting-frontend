import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CaseManagementModal } from "./CaseManagementModal";
import { getPendingReports, rejectReport, acceptReport } from "../services/api";
import toast from "react-hot-toast";

export const PendingReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isRejectOpen, onOpen: onRejectOpen, onClose: onRejectClose } = useDisclosure();
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getPendingReports();
        setReports(response.data);
      } catch (error) {
        toast.error("Failed to load pending reports");
      }
    };
    fetchReports();
  }, []);

  const handleAccept = (report) => {
    setSelectedReport(report);
    onOpen();
  };

  const handleReject = (report) => {
    setSelectedReport(report);
    onRejectOpen();
  };

  const confirmReject = async () => {
    if (selectedReport && rejectionReason) {
      try {
        await rejectReport(selectedReport.id, rejectionReason);
        setReports(reports.filter((r) => r.id !== selectedReport.id));
        toast.success("Report rejected successfully");
        onRejectClose();
        setRejectionReason("");
      } catch (error) {
        toast.error("Failed to reject report");
      }
    }
  };

  const handleCaseAssignment = async (reportId, caseId) => {
    try {
      await acceptReport(reportId, caseId);
      setReports(reports.filter((r) => r.id !== reportId));
      toast.success(`Report assigned to case #${caseId || "new"}`);
      onClose();
    } catch (error) {
      toast.error("Failed to assign report to case");
    }
  };

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
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Pending</span>
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
                </div>
              </CardBody>
              <CardFooter className="gap-2">
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="lucide:check" />}
                  className="flex-1"
                  onPress={() => handleAccept(report)}
                >
                  Accept
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  startContent={<Icon icon="lucide:x" />}
                  className="flex-1"
                  onPress={() => handleReject(report)}
                >
                  Reject
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-default-400">
          <Icon icon="lucide:inbox" className="text-5xl mb-4" />
          <p className="text-lg">No pending reports</p>
        </div>
      )}

      {selectedReport && (
        <CaseManagementModal
          isOpen={isOpen}
          onClose={onClose}
          report={selectedReport}
          onAssign={handleCaseAssignment}
        />
      )}

      <Modal isOpen={isRejectOpen} onClose={onRejectClose} backdrop="blur">
        <ModalContent>
          <ModalHeader>Reject Report</ModalHeader>
          <ModalBody>
            <Input
              label="Rejection Reason"
              placeholder="Enter reason for rejection"
              value={rejectionReason}
              onValueChange={setRejectionReason}
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onRejectClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={confirmReject} disabled={!rejectionReason}>
              Confirm Reject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};