import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  getInvestigatingCases,
  getOfficers,
  reassignCase,
  updateCaseStatus,
} from "../services/api";
import toast from "react-hot-toast";

export const InvestigatingCases = () => {
  const [cases, setCases] = useState([]);
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await getInvestigatingCases();
        console.log(response)
        setCases(response.data);
      } catch (error) {
        toast.error("Failed to load investigating cases");
      }
    };
    const fetchOfficers = async () => {
      try {
        const response = await getOfficers();
        setOfficers(response.data);
      } catch (error) {
        toast.error("Failed to load officers");
      }
    };
    fetchCases();
    fetchOfficers();
  }, []);

  const handleStatusChange = async (caseId, newStatus) => {
    if (newStatus === "resolved") {
      try {
        await updateCaseStatus(caseId, newStatus);
        setCases(
          cases.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c))
        );
        toast.success(`Case status changed to ${newStatus}`);
      } catch (error) {
        toast.error("Failed to update case status");
      }
    }
  };

  const handleReassign = async (caseId, officerId) => {
    try {
      await reassignCase(caseId, officerId);
      setCases(
        cases.map((c) =>
          c.id === caseId
            ? {
                ...c,
                assignedOfficerId: officerId,
                officerName: officers.find((o) => o.id === officerId)?.fullName,
              }
            : c
        )
      );
      toast.success("Case reassigned successfully");
    } catch (error) {
      toast.error("Failed to reassign case");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { bg: "bg-amber-100", text: "text-amber-800" };
      case "investigating":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "resolved":
        return { bg: "bg-green-100", text: "text-green-800" };
      default:
        return { bg: "bg-default-100", text: "text-default-800" };
    }
  };

  const getVictimNamesDisplay = (reports) => {
    if (!reports || reports.length === 0) return "N/A";
    return (
      reports
        .map((report) => report.victimName || "Unknown")
        .filter((name) => name !== "Unknown")
        .join(", ") || "N/A"
    );
  };

  return (
    <div className="py-4">
      {cases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((caseItem) => {
            const statusColor = getStatusColor(caseItem.status);
            const isResolved = caseItem.status === "resolved";
            return (
              <Card key={caseItem.id} className="bg-white shadow-sm">
                <CardBody className="gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{caseItem.title}</h3>
                    <span
                      className={`text-xs ${statusColor.bg} ${statusColor.text} px-2 py-1 rounded-full capitalize`}
                    >
                      {caseItem.status}
                    </span>
                  </div>
                  <p className="text-default-500 text-sm line-clamp-2">
                    {caseItem.description}
                  </p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:folder" className="text-default-400" />
                      <span>Case ID: {caseItem.caseNumber || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:file-text"
                        className="text-default-400"
                      />
                      <span>
                        Number of Reports:{" "}
                        {caseItem.reports ? caseItem.reports.length : 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:user-check"
                        className="text-default-400"
                      />
                      <span>
                        Officer: {caseItem.officerName || "Not assigned"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:users" className="text-default-400" />
                      <span>
                        Victims: {getVictimNamesDisplay(caseItem.reports)}
                      </span>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="flat"
                        startContent={<Icon icon="lucide:edit-3" />}
                        className="flex-1"
                        disabled={isResolved}
                      >
                        Change Status
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Status options"
                      disabledKeys={isResolved ? ["resolved"] : []}
                    >
                      {caseItem.status === "investigating" && (
                        <DropdownItem
                          key="resolved"
                          onPress={() =>
                            handleStatusChange(caseItem.id, "resolved")
                          }
                        >
                          Resolved
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        color="primary"
                        variant="flat"
                        startContent={<Icon icon="lucide:users" />}
                        className="flex-1"
                      >
                        Reassign
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Officer options">
                      {officers.map((officer) => (
                        <DropdownItem
                          key={officer.id}
                          onPress={() =>
                            handleReassign(caseItem.id, officer.id)
                          }
                        >
                          {officer.fullName}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-default-400">
          <Icon icon="lucide:inbox" className="text-5xl mb-4" />
          <p className="text-lg">No investigating cases</p>
        </div>
      )}
    </div>
  );
};
