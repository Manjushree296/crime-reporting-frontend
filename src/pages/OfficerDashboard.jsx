import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { PendingReports } from "../components/PendingReports";
import { InvestigatingCases } from "../components/InvestigatingCases";
import { RejectedReports } from "../components/RejectedReports";
import toast from "react-hot-toast";

const OfficerDashboard = () => {
  const [selected, setSelected] = useState("pending");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex justify-center">
        <div className="w-full max-w-7xl bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 md:px-6 lg:px-8">
          <Card className="bg-white rounded-lg p-6 border shadow-sm">
            <CardBody className="gap-2">
              <h1 className="text-2xl font-bold text-foreground">Officer Dashboard</h1>
              <p className="text-default-500">Manage and track crime reports efficiently</p>
            </CardBody>
          </Card>

          <Tabs
            aria-label="Report tabs"
            selectedKey={selected}
            onSelectionChange={setSelected}
            variant="underlined"
            color="primary"
            classNames={{
              base: "w-full",
              tabList: "gap-6",
              cursor: "w-full",
              tab: "max-w-fit px-0 h-12",
            }}
          >
            <Tab key="pending" title="Pending">
              <PendingReports />
            </Tab>
            <Tab key="investigating" title="Investigating">
              <InvestigatingCases />
            </Tab>
            <Tab key="rejected" title="Rejected">
              <RejectedReports />
            </Tab>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfficerDashboard;