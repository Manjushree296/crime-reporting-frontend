import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { createCase } from "../services/api";
import toast from "react-hot-toast";

export const CreateCaseModal = ({ isOpen, onClose, onCreateCase, report }) => {
  const [title, setTitle] = useState(report.title || "");
  const [description, setDescription] = useState(report.description || "");

  const handleSubmit = async () => {
    if (!title) return;

    try {
      const newCase = {
        title,
        description,
        status: "investigating",
      };
      const response = await createCase(newCase);
      onCreateCase(response.data);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to create case");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-xl">Create New Case</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Case Title"
                  placeholder="Enter case title"
                  value={title}
                  onValueChange={setTitle}
                  isRequired
                  startContent={<Icon icon="lucide:folder" className="text-default-400" />}
                />
                <Textarea
                  label="Case Description"
                  placeholder="Enter case details"
                  value={description}
                  onValueChange={setDescription}
                  minRows={3}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit} isDisabled={!title}>
                Create Case
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};