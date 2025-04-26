import React from 'react'
import { Icon } from '@iconify/react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Badge,
    Avatar,
    Tabs,
    Tab,
    Input,
    Textarea,
    Select,
    SelectItem,
    Accordion,
    AccordionItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@heroui/react";
const SafetyTips = () => {
  return (
    <div>
      <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Icon icon="lucide:info" className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="font-semibold text-lg">Safety Resources & Tips</h3>
                </div>
              </CardHeader>
              <CardBody>
                <Accordion>
                  <AccordionItem key="item-1" title="Home Security Tips">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Lock all doors and windows when leaving your home</li>
                      <li>Install motion-sensor lighting around your property</li>
                      <li>Consider a security system or doorbell camera</li>
                      <li>Don't hide spare keys outside</li>
                      <li>Keep valuables out of sight from windows</li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem key="item-2" title="Personal Safety When Out">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Stay aware of your surroundings</li>
                      <li>Keep valuables concealed</li>
                      <li>Walk in well-lit areas at night</li>
                      <li>Let someone know where you're going</li>
                      <li>Trust your instincts if something feels wrong</li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem key="item-3" title="Online Safety">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use strong, unique passwords</li>
                      <li>Be cautious about sharing personal information</li>
                      <li>Watch for phishing attempts</li>
                      <li>Keep software and devices updated</li>
                      <li>Use two-factor authentication when available</li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </CardBody>
            </Card>
    </div>
  )
}

export default SafetyTips
