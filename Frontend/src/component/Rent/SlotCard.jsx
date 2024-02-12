import React, { useState, useEffect } from "react";
import { useSlots } from "../../hooks/useSlots";
import { useStations } from "../../hooks/useStations";
import { useLocation } from "react-router-dom";
import { Button } from "flowbite-react";
import foto from "../../assets/imgs/Home/foto2.jpg";
import qr from "../../assets/icons/qr.png";

export default function StationCard() {
  const { slots } = useSlots();
  const { stations } = useStations();
  const location = useLocation();
  const { stationId } = location.state;

  const [filteredSlots, setFilteredSlots] = useState([]);
  const [filteredStation, setFilteredStation] = useState(null);

  console.log(filteredSlots);

  useEffect(() => {
    const filteredSlotsResult = slots
      .filter((slot) => slot.station_id === stationId)
      .sort((a, b) => a.slot_num - b.slot_num);

    const filteredStationResult = stations.find(
      (station) => station.id === stationId
    );
    setFilteredSlots(filteredSlotsResult);
    setFilteredStation(filteredStationResult);
  }, [stationId, slots, stations]);

  return (
    <>
      <div className="container mx-auto p-8 flex justify-center">
        <div className="mt-4">
          {filteredStation ? (
            <h2 className="text-4xl font-semibold">
              Anclajes de la Estación:{" "}
              <b>
                <span
                  style={{
                    fontSize: "1.5em",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  {filteredStation.name}
                </span>
              </b>{" "}
            </h2>
          ) : (
            <p>No se encontró la estación con el ID {stationId}</p>
          )}
        </div>
      </div>
      <div className="container mx-auto flex justify-center flex-wrap">
        {filteredSlots.map((slot) => (
          <div
            key={slot.id}
            className="container flex-row mt-14 p-8 border-2 rounded-xl m-2 shadow-xl p-8 sm:w-1/5 sm:flex-grow"
          >
            <img
              alt="Signage"
              src={foto}
              className="h-56 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-64 lg:h-72"
            />

            <div className="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
              <p className="font-medium">
                El anclaje numero: <b>{slot.slot_num}</b>
              </p>
            </div>
            <div className="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
              <p className="font-medium">
                Estado: <b>{slot.status}</b>
              </p>
            </div>
            <div className="container flex-row mt-4 align-center">
              {slot.status !== "vacant" && (
              <Button className="bg-green-500 text-white m-2 p-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                <img src={qr} alt="qr" style={{width:'38px'}} />
                Alquila el qr para desbloquear bicicleta
              </Button>)}
              {slot.status !== "in_use" && (
                <Button className="bg-blue-500 text-white m-2 p-2 rounded flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                <img src={qr} alt="qr" style={{width:'38px'}} />
                <span>Escanea el qr para dejar biciclera</span>
              </Button>
              )}
              <Button className="bg-red-500 text-white m-2 p-2 rounded hover:bg-red-900 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                Incidencia
              </Button>
            </div>
          </div>
        ))}
      </div>
      <br />
    </>
  );
}
