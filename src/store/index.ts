import { configureStore } from "@reduxjs/toolkit"
import playersReducer from "./players.slice"
import authReducer from "./auth.slice"
import { rollbarErrorLogger } from "./middleware/rollbar_error_logger"

export const store = configureStore({
  reducer: {
    players: playersReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rollbarErrorLogger),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
