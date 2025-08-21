type StatCardProps = {
  label: string
  value: number
  onChange: (val: string) => void
}

const StatCard = ({ label, value, onChange }: StatCardProps) => (
  <div className="bg-gray-50 p-4 rounded-lg text-center">
    <div className="text-gray-500 text-sm font-medium">{label}</div>
    <div
      className="mt-1 text-2xl font-bold text-green-600 focus:outline-none"
      contentEditable={!!onChange}
      suppressContentEditableWarning
      onBlur={e => onChange?.(e.currentTarget.textContent || "")}
    >
      {value}
    </div>
  </div>
)

export default StatCard
