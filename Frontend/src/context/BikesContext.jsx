import React, { useState, useEffect } from "react";
import BikeService from "../services/BikeService";

const Context = React.createContext({});

export function BikesContextProvider({ children }) {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    // setIsLoading(true);
    BikeService.getAllBikes()
      .then(({data}) => {
        setBikes(data);
      })
      .catch((error) => console.log(error));
  }, [setBikes]);

  return (
    <Context.Provider value={{ bikes, setBikes }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
