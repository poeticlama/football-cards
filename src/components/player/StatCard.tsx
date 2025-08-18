type StatCardProps = {
  label: string;
  value: number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="bg-gray-50 p-4 rounded-lg text-center">
    <div className="text-gray-500 text-sm font-medium">{label}</div>
    <div className="mt-1 text-2xl font-bold text-green-600">{value}</div>
  </div>
);

export default StatCard;
