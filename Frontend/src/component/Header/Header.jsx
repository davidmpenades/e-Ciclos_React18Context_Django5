import React, { useState, useEffect, useContext } from "react";
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import "./Header.css";
import logo from "../../assets/imgs/logo2.png";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuth, isAdmin, logout } = useContext(AuthContext);
    const [activeLink, setActiveLink] = useState("/");
    console.log(user);

    const redirect = {
        dashboard: () => {
            navigate("/dashboard");
            setActiveLink("/dashboard");
        },
        rent: () => {
            navigate("/rent");
            setActiveLink("/rent");
        },
        plan: () => {
            navigate("/plan");
            setActiveLink("/plan");
        },
        contact: () => {
            navigate("/Contact");
            setActiveLink("/Contact");
        },
        login: () => {
            navigate("/Login");
            setActiveLink("/Login");
        }
    };

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            </Navbar.Brand>
            {isAuth && (<div className="flex md:order-2">
                 <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={() => redirect.dashboard()}>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>)}
            <Navbar.Collapse>
            
                <Navbar.Link
                    href="/"
                    active={activeLink === "/"}
                    onClick={() => setActiveLink("/")}
                >
                    Inicio
                </Navbar.Link>
                <Navbar.Link
                    href=''
                    active={activeLink === "/rent"}
                    onClick={redirect.rent}
                >
                    Alquiler
                </Navbar.Link>
                <Navbar.Link
                    href=""
                    active={activeLink === "/plan"}
                    onClick={redirect.plan}
                >
                    Planes
                </Navbar.Link>
                <Navbar.Link
                    href=""
                    active={activeLink === "/Contact"}
                    onClick={redirect.contact}
                >
                    Contacto
                </Navbar.Link>
                {!isAuth && (<Navbar.Link
                    href=""
                    active={activeLink === "/Login"}
                    onClick={redirect.login}
                >
                    Registro/Entrar
                </Navbar.Link>)}
                {isAuth && (<Navbar.Link
                    href=""
                    active={activeLink === "/"}
                    onClick={logout}
                >
                    Salir
                </Navbar.Link>)}
           
            </Navbar.Collapse>
        </Navbar>
    );
}
