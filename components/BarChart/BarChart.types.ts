interface Target {
  pipelineStatus: string | null; // Allow null
}

interface BarChartProps {
  targets: Target[];
}

export type { BarChartProps };
