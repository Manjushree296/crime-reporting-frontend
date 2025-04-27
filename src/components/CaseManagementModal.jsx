import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CreateCaseModal } from "./CreateCaseModal";
import { getAllCases } from "../services/api";
import toast from "react-hot-toast";

export const CaseManagementModal = ({ isOpen, onClose, report, onAssign }) => {
  const [cases, setCases] = useState([]);
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await getAllCases();
        setCases(response.data);
      } catch (error) {
        toast.error("Failed to load cases");
      }
    };
    if (isOpen) fetchCases();
  }, [isOpen]);

  const handleLinkToCase = (caseId) => {
    onAssign(report.id, caseId);
  };

  const handleCreateCase = (newCase) => {
    setCases([...cases, newCase]);
    toast.success(`New case #${newCase.id} created successfully`);
    onCreateClose();
    // Automatically assign the report to the new case
    onAssign(report.id, newCase.id);
  };

  const getStatusColor = (status) => {
    switch (status) {
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
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="3xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl">Case Management</h3>
                <p className="text-default-500 text-sm">Link report "{report.title}" to an existing case or create a new one</p>
              </ModalHeader>
              <ModalBody>
                <div className="mb-4">
                  <Button color="primary" startContent={<Icon icon="lucide:plus" />} onPress={onCreateOpen}>
                    Create New Case
                  </Button>
                </div>

                <Table aria-label="Cases table" removeWrapper>
                  <TableHeader>
                    <TableColumn>CASE ID</TableColumn>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {cases.map((caseItem) => {
                      const statusColor = getStatusColor(caseItem.status);
                      return (
                        <TableRow key={caseItem.id}>
                          <TableCell>#{caseItem.id}</TableCell>
                          <TableCell>{caseItem.title}</TableCell>
                          <TableCell>
                            <span className={`text-xs ${statusColor.bg} ${statusColor.text} px-2 py-1 rounded-full capitalize`}>
                              {caseItem.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              color="primary"
                              variant="flat"
                              onPress={() => handleLinkToCase(caseItem.id)}
                              disabled={caseItem.status === "resolved"}
                            >
                              Link to Case
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <CreateCaseModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onCreateCase={handleCreateCase}
        report={report}
      />
    </>
  );
};