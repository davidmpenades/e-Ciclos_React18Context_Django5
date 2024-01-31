import React, { useEffect, useState } from "react";
import SlotService from "../services/SlotService"

const Context = React.createContext({})

export function SlotsContextProvider({ children }) {
    const [ slots, setSlots ] = useState([])

    useEffect(() => {
        SlotService.getAllSlots()
            .then(({ data }) => {
                setSlots(data);
            })
            .catch((error) => console.log(error));
    }, [setSlots]);
    return (
        <Context.Provider value={{ slots }}>
            {children}
        </Context.Provider>
    )
}

export default Context