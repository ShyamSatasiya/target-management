interface PipelineStatusFilterProps {
  pipelineStatuses: string[];
  selectedStatus: string;
  onFilterChange: (status: string) => void;
}

export type { PipelineStatusFilterProps };
