interface Target {
  id: number;
  name: string;
  description: string;
  pipelineStatus: string | null;
  markets: string[];
  lastUpdated: string;
}

interface TargetTableProps {
  targets: Target[];
  onStatusChange: (id: number, newStatus: string) => void;
}

export type { TargetTableProps };
export type { Target };
