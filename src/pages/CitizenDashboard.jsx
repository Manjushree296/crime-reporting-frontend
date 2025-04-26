import React, { useState } from 'react';
import { Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import CardComponent from '../components/CaseCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportForm from '../components/ReportForm';

const CitizenDashboard= ()=> {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">All Submitted Reports</h1>
            <p className="text-default-500">Monitor and report crimes with ease.</p>
          </div>
          <Button 
            color="primary" 
            startContent={<Icon icon="lucide:plus" />}
            onPress={() => setIsOpen(true)}
            className="animate-fade-in"
          >
            Create Report
          </Button>
        </div>
        
        <CardComponent/>
        <ReportForm isOpen={isOpen} onOpenChange={setIsOpen} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CitizenDashboard;
