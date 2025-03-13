"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/components/BarChart/BarChart";
import TargetTable from "@/components/TargetTable/TargetTable";
import PipelineStatusFilter from "@/components/PipelineStatusFilter/PipelineStatusFilter";

interface Target {
  id: number;
  name: string;
  description: string;
  pipelineStatus: string;
  markets: string[];
  lastUpdated: string;
}

const Dashboard: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [pipelineStatuses, setPipelineStatuses] = useState<string[]>([]);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const response = await fetch("/api/targets");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTargets(data);

        // Extract unique pipeline statuses
        const statuses = Array.from(
          new Set(
            data.map(
              (target: Target) => target.pipelineStatus || "Uncategorized"
            )
          )
        );
        setPipelineStatuses(statuses as string[]);
      } catch (error) {
        console.error("Error fetching targets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTargets();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      // Update the local state
      setTargets((prevTargets) =>
        prevTargets.map((target) =>
          target.id === id ? { ...target, pipelineStatus: newStatus } : target
        )
      );

      // Send the update to the server
      await fetch("/api/targets", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, pipelineStatus: newStatus }),
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  const filteredTargets = targets.filter((target) => {
    const status = target.pipelineStatus || "Uncategorized"; // Default to "Uncategorized" if null
    return selectedStatus === "" || status === selectedStatus;
  });

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        Acquisition Target Dashboard
      </h1>
      <PipelineStatusFilter
        pipelineStatuses={pipelineStatuses}
        selectedStatus={selectedStatus}
        onFilterChange={setSelectedStatus}
      />

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 h-full">
        {/* Bar Chart Section */}
        <div className="bg-gray-600 shadow-lg rounded-lg p-4 flex-1 h-72 lg:h-full">
          <h2 className="text-lg font-semibold text-white mb-4">
            Acquisition Targets by Status
          </h2>
          <div className="relative h-72 lg:h-full border border-gray-300 ">
            <BarChart targets={filteredTargets} />
          </div>
        </div>

        {/* Target Table Section */}
        <div className="bg-gray-600 shadow-lg rounded-lg p-4 flex-1 lg:h-full">
          <h2 className="text-lg font-semibold text-white mb-4">
            Acquisition Target Details
          </h2>
          <div className="h-64 lg:h-full max-h-[400px] overflow-y-auto border border-gray-300">
            <TargetTable
              targets={filteredTargets}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
