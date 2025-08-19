import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import PlayerDetailsPage from "../pages/PlayerPage"
import NewPlayerPage from "../pages/AddPlayerPage"
import LoginPage from "../pages/LoginPage"
import PrivateRoute from "../components/login/PrivateRoute"

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "about",
    element: (
      <PrivateRoute>
        <AboutPage />
      </PrivateRoute>
    ),
  },
  {
    path: "new",
    element: (
      <PrivateRoute>
        <NewPlayerPage />
      </PrivateRoute>
    ),
  },
  {
    path: "player/:id",
    element: (
      <PrivateRoute>
        <PlayerDetailsPage />
      </PrivateRoute>
    ),
  },
])
