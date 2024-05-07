import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuth, getAuthedUser, parseJwt } from "../helpers/auth";

const AuthGuard = ({ children, permissions }) => {
  const navigate = useNavigate();
  const isAuthed = isAuth();
  const userToken = getAuthedUser();
  const user = userToken && parseJwt(userToken);

  useEffect(() => {
    if (!isAuthed) {
      navigate("/login", { replace: true });
    }
  }, [isAuthed, navigate]);
  if (user) return children;
};

export default AuthGuard;
