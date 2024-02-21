import React, { createContext, useEffect, useState } from "react";
import SlotService from "../services/SlotService";

const SlotsContext = createContext();

export function SlotsContextProvider({ children }) {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await SlotService.getAllSlots();
        setSlots(data);
      } catch (error) {
        setError(error.message || "Error fetching slots");
      }
    };

    fetchData();
  }, []);

  const updateSlotStatus = (slotId, status) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === slotId ? { ...slot, status: status } : slot
      )
    );
  };

  return (
    <SlotsContext.Provider value={{ slots, updateSlotStatus }}>
      {children}
    </SlotsContext.Provider>
  );
}

export default SlotsContext;
