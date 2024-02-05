import React, { useState } from "react";
import { useContext, useCallback } from "react";
import AuthService from "../services/AuthService";
import AuthContext from "../context/AuthContext"
import { Toaster, toast } from "sonner";
import JwtService from "../services/JWTService";

export function useAuth() {
    const { user, setUser, setToken, isAdmin, setIsAdmin, isAuth, setIsAuth } = useContext(AuthContext);
    const [ isCorrect, setIsCorrect ] = useState(false);
    const [ errorMSG, setErrorMSG ] = useState('');
    

    const useLogin = useCallback((data) => {
        AuthService.Login(data)
            .then(({ data, status }) => {
                if (status === 200) {
                    JwtService.saveToken(data.token);
                    JwtService.saveRefreshToken(data.ref_token);
                    setToken(data.token);
                    setUser(data.user);
                    setIsAuth(true);
                    setIsAdmin(data.user.type === 'admin');
                    setIsCorrect(true);
                    setErrorMSG('');
                    <Toaster position="top-center" richColors />;
                    () => toast.success("Bienvenido");
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch((e) => {
                console.error(e);
                setErrorMSG(e.response.data[0]);
            });
    }, [setUser]);

return{ useAuth, useLogin, user, setUser, setErrorMSG};
};
