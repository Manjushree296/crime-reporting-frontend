import React, { useState } from 'react';
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
  SelectItem
} from "@heroui/react";

const ReportForm =({ isOpen, onOpenChange }) => {
  const [victimType, setVictimType] = useState("self");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    incidentDate: "",
    location: "",
    victimName: ""
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onOpenChange(false);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="2xl"
      className="animate-fade-in"
    >
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
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Submit Report
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ReportForm;
