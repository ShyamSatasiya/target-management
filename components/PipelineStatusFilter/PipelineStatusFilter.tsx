import React from "react";
import { PipelineStatusFilterProps } from "./PipelineStatusFilter.types"; // Ensure it's imported if needed
const PipelineStatusFilter: React.FC<PipelineStatusFilterProps> = ({
  pipelineStatuses,
  selectedStatus,
  onFilterChange,
}) => {
  return (
    <div className="mb-4">
      <label className="text-white mr-2">Filter by Pipeline Status:</label>
      <select
        className="p-2 rounded bg-gray-700 text-white"
        value={selectedStatus}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">All</option>

        {pipelineStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PipelineStatusFilter;
