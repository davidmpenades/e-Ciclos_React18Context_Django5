import React, { useState } from "react";
import { useContext, useCallback } from "react";
import AuthService from "../services/AuthService";
import AuthContext from "../context/AuthContext";
import JwtService from "../services/JWTService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useAuth() {
  const { user, setUser, setToken, isAdmin, setIsAdmin, isAuth, setIsAuth } =
    useContext(AuthContext);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");
  const Navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  
  const useAllUsers = useCallback(() => {
    AuthService.getAllUsers()
      .then(({ data }) => {
        setAllUsers(data);
      })
      .catch((e) => console.error(e));
  }, [allUsers]);
  const useLogin = useCallback(
    (data) => {
      AuthService.Login(data)
        .then(({ data, status }) => {
          if (status === 200) {
            JwtService.saveToken(data.token);
            JwtService.saveRefreshToken(data.ref_token);
            setToken(data.token);
            setUser(data.user);
            setIsAuth(true);
            setIsAdmin(data.user.type === "admin");
            setIsCorrect(true);
            setErrorMSG("");
            setTimeout(() => {
              setIsCorrect(false);
            }, 1000);
          }
        })
        .catch((e) => {
          console.log("error", e);
          setErrorMSG(e.response.data[0]);
        });
    },
    [setUser]
  );
  const useRegister = useCallback(
    (data) => {
      AuthService.Register(data)
        .then(({ data, status }) => {
          if (status == 200) {
            JwtService.saveToken(data.token);
            JwtService.saveRefreshToken(data.ref_token);
            setToken(data.token);
            setUser(data.user);
            setIsAuth(true);
            setIsAdmin(data.user.type === "admin");
            setIsCorrect(true);
            setErrorMSG("");
            setTimeout(() => {
              setIsCorrect(false);
            }, 1000);
            Navigate("/plan");
          }
        })
        .catch((e) => {
          console.error(e);
          setErrorMSG(e.response.data[0]);
          // toast.error(e.response.data[0]);
        });
    },
    [setUser]
  );
  return { useAuth, useLogin, useRegister, user, setUser, errorMSG, isCorrect, useAllUsers };
}
