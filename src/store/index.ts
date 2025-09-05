import { configureStore } from "@reduxjs/toolkit"
import playersReducer from "./players.slice"
import authReducer from "./auth.slice"

export const store = configureStore({
  reducer: {
    players: playersReducer,
    auth: authReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
