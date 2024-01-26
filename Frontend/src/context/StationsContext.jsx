import React, { useState, useEffect } from "react";
import StationService from "../services/StationService";

const Context = React.createContext({});

export function StationsContextProvider({ children }) {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    // setIsLoading(true);
    StationService.getAllStations()
      .then(({data}) => {
        setStations(data);
      })
      .catch((error) => console.log(error));
  }, [setStations]);

  return (
    <Context.Provider value={{ stations, setStations }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
