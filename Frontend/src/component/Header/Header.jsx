import React, { useContext } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo2.png";
import AuthContext from "../../context/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuth, isAdmin, logout } = useContext(AuthContext);
  const { notificationsNumber, notifications } = useNotifications();

  const redirect = {
    dashboard: () => {
      navigate("/dashboard");
      // setActiveLink("/dashboard");
    },
    profile: () => {
      navigate("/profile");
    },
  };
  return (
    <Navbar fluid rounded>
      {/* Primera columna: Logo */}
      <div className="flex items-center">
        <Navbar.Brand href="/">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>
      </div>

      {/* Segunda columna: Menú de navegación */}
      <div className="flex flex-grow justify-center">
        <Navbar.Collapse>
          <Navbar.Link href="/" active={location.pathname === "/"}>
            Inicio
          </Navbar.Link>
          <Navbar.Link href="/rent" active={location.pathname === "/rent"}>
            Alquiler
          </Navbar.Link>
          <Navbar.Link href="/plan" active={location.pathname === "/plan"}>
            Planes
          </Navbar.Link>
          <Navbar.Link
            href="/contact"
            active={location.pathname === "/contact"}
          >
            Contacto
          </Navbar.Link>

          {!isAuth && (
            <Navbar.Link href="/login" active={location.pathname === "/login"}>
              Registro/Entrar
            </Navbar.Link>
          )}
          {isAuth && notificationsNumber > 0 && (
            <div className="relative">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-500"
                      size="2x"
                    />
                    {notificationsNumber > 0 && (
                      <div className="absolute top-[-2px] right-[-8px] bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                        {notificationsNumber}
                      </div>
                    )}
                  </div>
                }
              >
                <Dropdown.Item onClick={redirect.profile}>
                  Ver Notificaciones
                </Dropdown.Item>
              </Dropdown>
            </div>
          )}
        </Navbar.Collapse>
      </div>

      {/* Tercera columna: Dropdown */}
      <div className="flex items-center">
        {isAuth && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.username}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            {isAdmin && (
              <Dropdown.Item onClick={() => redirect.dashboard()}>
                Dashboard
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={redirect.profile}>Perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
