import React, { useEffect, useState, useCallback } from "react";
import AuthService from "../services/AuthService";
import JwtService from "../services/JWTService";
import JWTService from "../services/JWTService";
import { useNavigate } from "react-router-dom";

const Context = React.createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(
    JwtService.getToken ? JwtService.getToken : false
  );
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);
    if (token) {
      AuthService.getUser()
        .then(({ data, status }) => {
          console.log(data);
          if (status === 200) {
            setToken(data.token);
            setUser(data.user);
            setIsAuth(true);
            setIsAdmin(data.user.type === "admin");
            navigate("/");
          }
        })
        .catch(({ error }) => {
          console.error(error);
          if (JWTService.getRefreshToken()) {
            refresh_token();
          } else {
            logout();
          }
        });
    }
  }, [token]);

  const refresh_token = async () => {
    JwtService.destroyToken();
    await AuthService.refreshToken()
      .then(({ data }) => {
        setToken(data.token);
        JwtService.saveToken(data.token);
        navigate("/");
      })
      .catch(({}) => {
        logout();
      });
  };

  const logout = useCallback(() => {
    JwtService.destroyToken();
    JwtService.destroyRefreshToken();
    setUser({});
    setToken(false);
    setIsAuth(false);
    setIsAdmin(false);
    toast.success('Loged out successfully');
    navigate('/home');
}, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuth,
        setIsAuth,
        isAdmin,
        setIsAdmin,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
