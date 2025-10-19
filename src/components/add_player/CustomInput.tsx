import type { ChangeEventHandler } from "react"

type CustomInputProps = {
  id: string
  label: string
  placeholder: string
  type: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const CustomInput = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
}: CustomInputProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        required
        className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  )
}

export default CustomInput
