import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { submitReport, getCurrentUser } from "../services/api";
import toast from "react-hot-toast";

const ReportForm = ({ isOpen, onOpenChange }) => {
  const [victimType, setVictimType] = useState("self");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    incidentDate: "",
    location: "",
    victimName: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        setCurrentUser(response.data);
        if (victimType === "self" && response.data.fullName) {
          setFormData((prev) => ({
            ...prev,
            victimName: response.data.fullName,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        toast.error("Failed to load user details");
      }
    };
    if (isOpen) fetchCurrentUser();
  }, [isOpen, victimType]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const reporterType = victimType === "self" ? "victim" : "witness";

      const reportData = {
        title: formData.title,
        description: formData.description,
        incidentDate: formData.incidentDate,
        location: formData.location,
        reporterType: reporterType,
        victimName: victimType === "self" ? currentUser?.fullName : formData.victimName,
      };

      const response = await submitReport(reportData);
      console.log("Report submission response:", response.data);

      toast.success("Report submitted successfully!");

      setFormData({
        title: "",
        description: "",
        incidentDate: "",
        location: "",
        victimName: "",
      });
      setVictimType("self");
      onOpenChange(false);
    } catch (error) {
      console.error("Report submission error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || "Failed to submit report";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="2xl" className="animate-fade-in">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create New Crime Report</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Report Title"
                  placeholder="Enter a descriptive title"
                  value={formData.title}
                  onValueChange={(value) => handleChange("title", value)}
                  isRequired
                />

                <Textarea
                  label="Description"
                  placeholder="Provide details about the incident"
                  value={formData.description}
                  onValueChange={(value) => handleChange("description", value)}
                  isRequired
                />

                <Input
                  label="Incident Date"
                  type="date"
                  value={formData.incidentDate}
                  onValueChange={(value) => handleChange("incidentDate", value)}
                  isRequired
                />

                <Input
                  label="Location"
                  placeholder="Where did the incident occur?"
                  value={formData.location}
                  onValueChange={(value) => handleChange("location", value)}
                  isRequired
                />

                <Select
                  label="Victim Type"
                  placeholder="Select victim type"
                  selectedKeys={[victimType]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    setVictimType(selected);
                    if (selected === "self" && currentUser?.fullName) {
                      setFormData((prev) => ({
                        ...prev,
                        victimName: currentUser.fullName,
                      }));
                    } else if (selected === "other") {
                      setFormData((prev) => ({
                        ...prev,
                        victimName: "",
                      }));
                    }
                  }}
                >
                  <SelectItem key="self" value="self">Self</SelectItem>
                  <SelectItem key="other" value="other">Others</SelectItem>
                </Select>

                {victimType === "other" && (
                  <Input
                    label="Victim Name"
                    placeholder="Enter victim's name"
                    value={formData.victimName}
                    onValueChange={(value) => handleChange("victimName", value)}
                    isRequired
                  />
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReportForm;  