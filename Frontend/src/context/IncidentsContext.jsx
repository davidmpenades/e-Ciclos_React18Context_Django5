import React, { createContext, useContext, useEffect, useState } from "react";
import IncidentsService from "../services/IncidentsService";
import AuthContext from "./AuthContext";

const IncidentsContext = createContext();

export const IncidentsContextProvider = ({ children }) => {
    const { isAdmin } = useContext(AuthContext);
    const [ incidentsSlots, setIncidentsSlots ] = useState([]);

    useEffect(() => {
        if (isAdmin) {
            IncidentsService.getAllIncidentsSlots()
            .then(({ data }) => {
                setIncidentsSlots(data);
            })
        }

    }, [setIncidentsSlots, isAdmin]);

    return (
        <IncidentsContext.Provider value={{ incidentsSlots, setIncidentsSlots }}>
            {children}
        </IncidentsContext.Provider>
    )
}

export default IncidentsContext;