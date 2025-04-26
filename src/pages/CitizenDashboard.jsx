import { useState } from "react";
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
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReportForm from "../components/ReportForm";
import Faq from "../components/Faq";
import SafetyTips from "../components/SafetyTips";
import EmergencyContacts from "../components/EmergencyContacts";

export function CrimeReportDashboard() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <Header/>

      {/* Main content */}
      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col gap-8">
            {/* Welcome section */}
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <h2 className="text-2xl font-bold mb-2">Welcome to the Citizen Crime Report Portal</h2>
              <p className="text-default-500">
                Report incidents, track your submissions, and stay informed about safety in your community.
              </p>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                isPressable
                onPress={() => setIsOpen(true)}
                className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
              >
                <CardBody className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                    <Icon icon="lucide:plus" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Report an Incident</h3>
                  <p className="text-sm text-default-500">Submit a new crime report or suspicious activity</p>
                </CardBody>
              </Card>

              
              <Card isPressable className="hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors">
              <Link as={RouterLink} to="/dashboard/citizen/all-reports">
                <CardBody className="p-6 flex flex-col items-center text-center">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-4">
                    <Icon icon="lucide:eye" className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Track My Reports</h3>
                  <p className="text-sm text-default-500">View status and updates on your submitted reports</p>
                </CardBody>
                </Link>
              </Card>

              
            </div>

            {/* Emergency contacts */}
            <EmergencyContacts/>
            

            {/* Safety Tips */}
            
            <SafetyTips/>

            {/* FAQ */}
            <Faq/>
          </div>
        </div>
      </main>


      {/* Report Incident Modal */}
      <ReportForm  isOpen={isOpen} onOpenChange={setIsOpen} />

      
      {/* Footer */}
      <Footer/>
    </div>
  );
}



export default CrimeReportDashboard;
