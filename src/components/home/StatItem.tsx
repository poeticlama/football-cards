const StatItem = ({ value, label }: { value: number; label: string }) => (
  <div>
    <div className="text-white font-bold">{value}</div>
    <div className="text-green-200 text-xs">{label}</div>
  </div>
);

export default StatItem;