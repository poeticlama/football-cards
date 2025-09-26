import type { Meta, StoryObj } from "@storybook/react-vite"
import CustomInput from "./CustomInput"

const meta: Meta<typeof CustomInput> = {
  title: "Components/CustomInput",
  component: CustomInput,
}

export default meta

type Story = StoryObj<typeof CustomInput>

export const Default: Story = {
  args: {
    id: "some",
    label: "Test",
    placeholder: "Test",
    type: "text",
    value: "",
    onChange: () => {},
  },
}
