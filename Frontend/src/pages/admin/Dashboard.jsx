import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from "../../assets/imgs/logo.png";
import { Button } from "flowbite-react";
import StationsList from "./Station/StationsList";
import BikesList from "./Bikes/BikesList";
import cartel from "../../assets/imgs/cartel.png";
import SlotsList from "./Slots/SlotsList";

const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return <img className="cartel" src={cartel} />;
      case "Stations":
        return <StationsList />;
      case "Bikes":
        return <BikesList />;
      case "Slots":
        return <SlotsList />;
      case "Users":
        return <h1>users</h1>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="menu">
        <ul>
          <li className="profile">
            <div className="img-box">
              <img src={logo} alt="image" />
            </div>
            <h2>Administrador</h2>
          </li>
          <li>
            <a onClick={() => handleSelectItem("Dashboard")}>
              <svg
                className="dash h-6 w-6 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
               
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <p>dashboard</p>
            </a>
          </li>
          <li>
            <a onClick={() => handleSelectItem("Stations")}>
              <svg
                className="dash h-6 w-6 text-black"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>{" "}
                <path d="M4 6v6a8 3 0 0 0 16 0v-6" />{" "}
                <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
              </svg>
              <p>Estaciones</p>
            </a>
          </li>
          <li>
            <a onClick={() => handleSelectItem("Bikes")}>
              <svg
                className="dash h-6 w-6 text-black"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="5" cy="18" r="3" /> <circle cx="19" cy="18" r="3" />{" "}
                <polyline points="12 19 12 15 9 12 14 8 16 11 19 11" />{" "}
                <circle cx="17" cy="5" r="1" />
              </svg>
              <p>Bicicletas</p>
            </a>
          </li>
          <li>
            <a onClick={() => handleSelectItem("Slots")}>
              <svg
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              <p>Anclajes</p>
            </a>
          </li>
          <li>
            <a onClick={() => handleSelectItem("Users")}>
              <svg
                className="h-6 w-6 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
                <circle cx="9" cy="7" r="4" />{" "}
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />{" "}
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <p>Usuarios</p>
            </a>
          </li>
        </ul>
        <Button onClick={() => navigate("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </Button>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
