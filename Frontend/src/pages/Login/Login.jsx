import React from "react";
import RegLogForm from "../../component/Client/RegLogForm";
import { useAuth } from "../../hooks/useAuth"

const Login = () => {
    const { useLogin } = useAuth();
    return (
        <>
            <RegLogForm loginUser={useLogin}/>
        </>
    )
}

export default Login;