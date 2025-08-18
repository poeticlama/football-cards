import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import PlayerDetailsPage from "../pages/PlayerPage";
import NewPlayerPage from "../pages/AddPlayerPage";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "about", element: <AboutPage />},
  { path: "login", element: <LoginPage /> },
  { path: "new", element: <NewPlayerPage /> },
  { path: "player/:id", element: <PlayerDetailsPage /> },
]);
