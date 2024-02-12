// import React, { useState, useEffect, useContext } from "react";
// import { Avatar, Dropdown, Navbar } from "flowbite-react";
// import "./Header.css";
// import logo from "../../assets/imgs/logo2.png";
// import { useNavigate, useLocation } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";

// export default function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, isAuth, isAdmin, logout } = useContext(AuthContext);
//   const [activeLink, setActiveLink] = useState("/");

//   const redirect = {
//     dashboard: () => {
//       navigate("/dashboard");
//       setActiveLink("/dashboard");
//     },
//     rent: () => {
//       navigate("/rent");
//       setActiveLink("/rent");
//     },
//     plan: () => {
//       navigate("/plan");
//       setActiveLink("/plan");
//     },
//     contact: () => {
//       navigate("/Contact");
//       setActiveLink("/Contact");
//     },
//     login: () => {
//       navigate("/Login");
//       setActiveLink("/Login");
//     },
//   };

//   useEffect(() => {
//     setActiveLink(location.pathname);
//   }, [location.pathname]);

//   return (
//     <div className="flex  items-center ">
//       <Navbar fluid rounded>
//         <div className="flex  items-start">
//           <Navbar.Brand href="/">
//             <img
//               src={logo}
//               className="mr-3 h-6 sm:h-9"
//               alt="Flowbite React Logo"
//             />
//           </Navbar.Brand>
//         </div>
//         {isAuth && (
//           <div className="flex md:order-2 items-end">
//             <Dropdown
//               arrowIcon={false}
//               inline
//               label={
//                 <Avatar
//                   alt="User settings"
//                   img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
//                   rounded
//                 />
//               }
//             >
//               <Dropdown.Header>
//                 <span className="block text-sm">{user.username}</span>
//                 <span className="block truncate text-sm font-medium">
//                   {user.email}
//                 </span>
//               </Dropdown.Header>
//               {isAdmin && (
//                 <Dropdown.Item onClick={() => redirect.dashboard()}>
//                   Dashboard
//                 </Dropdown.Item>
//               )}
//               <Dropdown.Item>Perfíl</Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item onClick={logout}>Salir</Dropdown.Item>
//             </Dropdown>
//             <Navbar.Toggle />
//           </div>
//         )}
//         <div className="flex items-center justify-center">
//           <Navbar.Collapse>
//             <Navbar.Link
//               href="/"
//               active={activeLink === "/"}
//               onClick={() => setActiveLink("/")}
//             >
//               Inicio
//             </Navbar.Link>
//             <Navbar.Link
//               href=""
//               active={activeLink === "/rent"}
//               onClick={redirect.rent}
//             >
//               Alquiler
//             </Navbar.Link>
//             <Navbar.Link
//               href=""
//               active={activeLink === "/plan"}
//               onClick={redirect.plan}
//             >
//               Planes
//             </Navbar.Link>
//             <Navbar.Link
//               href=""
//               active={activeLink === "/Contact"}
//               onClick={redirect.contact}
//             >
//               Contacto
//             </Navbar.Link>
//             {!isAuth && (
//               <Navbar.Link
//                 href=""
//                 active={activeLink === "/Login"}
//                 onClick={redirect.login}
//               >
//                 Registro/Entrar
//               </Navbar.Link>
//             )}
//           </Navbar.Collapse>
//         </div>
//       </Navbar>
//     </div>
//   );
// }
import React, { useContext } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo2.png";
import AuthContext from "../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuth, isAdmin, logout } = useContext(AuthContext);

  const redirect = {
        dashboard: () => {
          navigate("/dashboard");
          // setActiveLink("/dashboard");
        }
      }
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
            <Dropdown.Item>Perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Salir</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
