import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store";
import { ReactNode } from 'react';
import Loader from '../shared/Loader';

type Props = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { user, initialized } = useSelector((state: RootState) => state.auth);

  if (!initialized) {
    return <Loader/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
