type DetailItemProps = {
  label: string
  value: string
  onChange: (val: string) => void
}

const DetailItem = ({ label, value, onChange }: DetailItemProps) => (
  <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-500">{label}</span>
    <span
      className="font-medium text-right focus:outline-none"
      contentEditable={!!onChange}
      suppressContentEditableWarning
      onBlur={e => onChange?.(e.currentTarget.textContent || "")}
    >
      {value}
    </span>
  </div>
)

export default DetailItem
