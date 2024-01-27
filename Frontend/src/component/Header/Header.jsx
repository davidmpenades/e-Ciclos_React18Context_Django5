import React from "react";
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import "./Header.css";
import logo from "../../assets/imgs/logo2.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
    
    const navigate = useNavigate();

    const redirect = {
        dashboard: () => navigate("/dashboard"),
        rent: () => navigate("/rent"),
    };
    return (
        <Navbar fluid rounded>
          <Navbar.Brand href="/">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
          </Navbar.Brand>
          <div className="flex md:order-2">
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
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="/" active>
              Inicio
            </Navbar.Link>
            <Navbar.Link onClick={redirect.rent}>Alquiler</Navbar.Link>
            <Navbar.Link href="#">Precios</Navbar.Link>
            <Navbar.Link href="#">Contacto</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      ); }