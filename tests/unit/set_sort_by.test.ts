import { describe, it, expect } from "vitest"
import { sortPlayers } from "../../src/store/players.slice"
import { mockPlayers } from "../../src/mocks/mockPlayers"

describe("Sort my players", () => {
  it("should sort by rating", () => {
    const sorted = sortPlayers("rating", mockPlayers)
    const ratings = mockPlayers
      .map(player => player.rating)
      .sort((a: number, b: number) => b - a)

    expect(sorted[0].rating).toBe(ratings[0])
    expect(sorted[1].rating).toBe(ratings[1])
    expect(sorted[2].rating).toBe(ratings[2])
    expect(sorted[3].rating).toBe(ratings[3])

    expect(mockPlayers[0].rating).toBe(85)
    expect(mockPlayers[1].rating).toBe(92)
  })
})
