import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import Loader from "../shared/Loader"
import { useAppSelector } from "../../hooks"

type Props = {
  children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const { user, initialized } = useAppSelector(state => state.auth)

  if (!initialized) {
    return <Loader />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
