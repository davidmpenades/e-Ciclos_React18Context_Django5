import React, { createContext, useEffect, useState } from "react";
import SlotService from "../services/SlotService";

const SlotsContext = createContext();

export function SlotsContextProvider({ children }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await SlotService.getAllSlots();
        setSlots(data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Error fetching slots");
        setLoading(false);
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
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        children
      )}
    </SlotsContext.Provider>
  );
}

export default SlotsContext;
