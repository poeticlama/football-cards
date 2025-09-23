import type { Middleware } from "@reduxjs/toolkit"
import rollbar from "../../../rollbar"
import type { PlayersStateType } from "../../types"

let previousError: string | null = null

export const rollbarErrorLogger: Middleware = store => next => action => {
  const result = next(action)

  const currentState = store.getState()
  const playersState: PlayersStateType = currentState.players
  const currentError = playersState.error

  if (currentError && currentError !== previousError) {
    rollbar.error(`Players Error: ${currentError}`)
    previousError = currentError
  } else if (!currentError) {
    previousError = null
  }

  return result
}
