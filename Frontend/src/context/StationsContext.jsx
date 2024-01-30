import React, { useState, useEffect } from "react";
import StationService from "../services/StationService";

const Context = React.createContext({});

export function StationsContextProvider({ children }) {
  const [stations, setStations] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    // setIsLoading(true);
    StationService.getAllStations()
      .then(({data}) => {
        setStations(data);
        const coords = data.map(station => ({ id: station.id, name:station.name, lat: station.latitude, lon: station.longitude, num:station.num_bikes }));      
        setCoordinates(coords);})
      .catch((error) => console.log(error));
  }, [setStations, setCoordinates]);

  return (
    <Context.Provider value={{ stations, setStations, coordinates }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
