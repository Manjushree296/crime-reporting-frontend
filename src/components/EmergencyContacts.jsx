import React from 'react'
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
  import { Icon } from '@iconify/react';

const EmergencyContacts = () => {
  return (
    <div>
      <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Icon icon="lucide:phone" className="h-5 w-5 mr-2 text-red-500" />
                  <h3 className="font-semibold text-lg">Emergency Contacts</h3>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-default-100">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                      <Icon icon="lucide:phone" className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Emergency</h4>
                      <p className="text-2xl font-bold">911</p>
                      <p className="text-xs text-default-500 mt-1">For immediate emergencies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-default-100">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <Icon icon="lucide:shield" className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Police (Non-Emergency)</h4>
                      <p className="text-lg font-bold">555-123-4567</p>
                      <p className="text-xs text-default-500 mt-1">For non-urgent matters</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-default-100">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                      <Icon icon="lucide:alert-triangle" className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Crime Stoppers</h4>
                      <p className="text-lg font-bold">1-800-222-TIPS</p>
                      <p className="text-xs text-default-500 mt-1">Anonymous reporting</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
    </div>
  )
}

export default EmergencyContacts
