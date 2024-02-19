import React, { useEffect } from "react";
import RegLogForm from "../../component/Client/RegLogForm";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { isCorrect, useLogin, useRegister, errorMSG } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            toast.success("Bienvenido!");
            navigate("/rent");
        } else if (errorMSG) {
            toast.error(errorMSG);
        }        
    }, [isCorrect, errorMSG, navigate]);

    return (
        <>
            <RegLogForm loginUser={useLogin} registerUser={useRegister}/>
        </>
    );
}

export default Login;
