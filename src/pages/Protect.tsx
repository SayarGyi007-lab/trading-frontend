import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const Protect = ({ children, adminOnly = false }: Props) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/", { replace: true });
    } 
    else if (adminOnly && userInfo.role !== "ADMIN") {
        navigate("/order", { replace: true });
      }
  }, [userInfo, adminOnly, navigate]);

  

  return <>{children}</>;
};

export default Protect;
