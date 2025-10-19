import type { Meta, StoryObj } from "@storybook/react-vite"
import PlayerCard from "./PlayerCard"
import examplePlayer from "../../constants/examplePlayer"

const meta: Meta<typeof PlayerCard> = {
  title: "Components/PlayerCard",
  component: PlayerCard,
}

export default meta

type Story = StoryObj<typeof PlayerCard>

export const Default: Story = {
  args: {
    player: { id: "exampleId", ...examplePlayer },
  },
}
