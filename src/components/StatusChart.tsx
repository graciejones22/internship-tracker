import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface StatusChartProps {
  statusCounts: {
    Interested: number;
    Applied: number;
    Interview: number;
    Offer: number;
    Rejected: number;
  };
}

function StatusChart({ statusCounts }: StatusChartProps) {
  const data = [
    {
      status: 'Interested',
      applications: statusCounts.Interested,
    },
    {
      status: 'Applied',
      applications: statusCounts.Applied,
    },
    {
      status: 'Interview',
      applications: statusCounts.Interview,
    },
    {
      status: 'Offer',
      applications: statusCounts.Offer,
    },
    {
      status: 'Rejected',
      applications: statusCounts.Rejected,
    },
  ];

  return (
    <div className="status-chart">
      <h2>Application Status</h2>
      <p>Overview of your internship applications.</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="applications" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusChart;