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

const Faq = () => {
  return (
    <div>
      <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Icon icon="lucide:help-circle" className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>
                </div>
              </CardHeader>
              <CardBody>
                <Accordion>
                  <AccordionItem key="faq-1" title="What happens after I submit a report?">
                    <p className="text-default-500">
                      After submission, your report is reviewed by our staff and assigned a officer.
                    </p>
                  </AccordionItem>
                  <AccordionItem key="faq-2" title="Can I submit an anonymous report?">
                    <p className="text-default-500">
                      For now that options is not available.
                    </p>
                  </AccordionItem>
                  <AccordionItem key="faq-3" title="How do I update information on a report I've submitted?">
                    <p className="text-default-500">
                      You cannot, while submitting the report you have to be careful.
                    </p>
                  </AccordionItem>
                  <AccordionItem key="faq-4" title="When should I call 911 instead of using this portal?">
                    <p className="text-default-500">
                      Always call 911 for emergencies requiring immediate attention, such as crimes in progress,
                      medical emergencies, or situations where someone's safety is at risk. This portal is for
                      non-emergency reporting and information.
                    </p>
                  </AccordionItem>
                </Accordion>
              </CardBody>
            </Card>
    </div>
  )
}

export default Faq
