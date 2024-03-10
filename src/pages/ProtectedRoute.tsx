import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

type Props = {
  children: ReactNode | ReactNode[];
};

const ProtectedRoute = ({ children }: Props) => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged]);

  return <>{children}</>;
};

export default ProtectedRoute;
