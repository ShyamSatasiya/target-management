import React from "react";
import { Target } from "./TargetTable.types";
import { TargetTableProps } from "./TargetTable.types";
const TargetTable: React.FC<TargetTableProps> = ({
  targets,
  onStatusChange,
}) => {
  // Sort the targets by lastUpdated descending
  const sortedTargets = React.useMemo(
    () =>
      [...targets].sort(
        (a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      ),
    [targets]
  );

  // Group the targets by pipelineStatus
  const groupedTargets = React.useMemo(() => {
    const groups: { [key: string]: Target[] } = {};

    sortedTargets.forEach((target) => {
      const status = target.pipelineStatus || "Uncategorized";
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(target);
    });

    return groups;
  }, [sortedTargets]);

  const pipelineStatusOptions = [
    "Hot",
    "Active",
    "Cold",
    "Passed",
    "Uncategorized",
  ];

  return (
    <div className="max-w-full">
      <table className="table-auto w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg text-sm md:text-base">
        <thead className="bg-gray-700 text-white sticky top-0 z-50">
          <tr>
            <th className="px-4 py-2 text-left">Pipeline Status</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="hidden md:table-cell px-4 py-2 text-left">
              Description
            </th>
            <th className="px-4 py-2 text-left">Last Updated</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {Object.entries(groupedTargets).map(([pipelineStatus, targets]) => (
            <React.Fragment key={pipelineStatus}>
              {targets.map((target) => (
                <tr
                  key={target.id}
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="border-b border-gray-600 px-4 py-2">
                    <select
                      value={target.pipelineStatus || "Uncategorized"}
                      onChange={(e) =>
                        onStatusChange(target.id, e.target.value)
                      }
                      className="bg-gray-800 text-white border border-gray-600 rounded-md p-2"
                    >
                      {pipelineStatusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border-b border-gray-600 px-4 py-2">
                    {target.name}
                  </td>
                  <td className="hidden md:table-cell border-b border-gray-600 px-4 py-2">
                    {target.description}
                  </td>
                  <td className="border-b border-gray-600 px-4 py-2">
                    {new Date(target.lastUpdated).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TargetTable;
