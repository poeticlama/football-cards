import * as Sentry from "@sentry/react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import "../index.css"
import { initAuthListener } from "./store/auth.slice"
import { logToFirebase } from "./logger/logger"

store.dispatch(initAuthListener())

Sentry.init({
  tracesSampleRate: 1.0,

  beforeSend(event) {
    logToFirebase({
      message: event.message,
      context: event.transaction,
    })
    return event
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
