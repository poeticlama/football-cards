import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"
import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import "../index.css"
import { initAuthListener } from "./store/auth.slice"

store.dispatch(initAuthListener())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
