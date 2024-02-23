import React, { useState, useEffect, useContext } from "react";
import { useSlots } from "../../hooks/useSlots";
import { useStations } from "../../hooks/useStations";
import { useIncidents } from "../../hooks/useIncidents";
import { useLocation } from "react-router-dom";
import { useRent } from "../../hooks/useRent";
import AuthContext from "../../context/AuthContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import qr from "../../assets/icons/qr.png";
import { toast } from "react-toastify";
import foto from "../../assets/imgs/Home/foto2.webp";
import IncidentsSlotModal from "../Client/IncidentsSlotModal";

export default function StationCard() {
  const { slots } = useSlots();
  const { stations } = useStations();
  const location = useLocation();
  const { stationId } = location.state;
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [filteredStation, setFilteredStation] = useState(null);
  const { useRentBike, getOneRent, useBackRent } = useRent();
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { useAddSlotIncidence } = useIncidents();

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

  const getCurrentDateTime = () => {
    const currentDate = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm:ss");
    return currentDate + " " + currentTime;
  };

  const handlerRent = (slot) => {
    if (!isAuth) {
      navigate("/login");
      toast.error("Debes iniciar sesión para alquilar una bicicleta");
    } else if (getOneRent()) {
      toast.error(
        "Ya tienes una bicicleta alquilada. No puedes alquilar otra."
      );
    } else {
      const initialDate = getCurrentDateTime();
      const rentData = {
        id: slot.id,
        bike: slot.bike_id,
        initial_slot: slot.id,
        end_slot: "",
        initial_date: initialDate,
        end_date: "",
      };
      useRentBike(rentData);
      navigate("/rent");
    }
  };

  const handlerReturn = (slot) => {
    if (!isAuth) {
      return () => {
        navigate("/login");
        toast.error("Debes iniciar sesión para devolver una bicicleta");
      };
    } else {
      return () => {
        const endData = getCurrentDateTime();
        const backData = {
          id: slot.id,
          end_slot_id: slot.id,
          end_date: endData,
        };
        useBackRent(backData);
        navigate("/rent");
      };
    }
  };

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
                <Button
                  onClick={() => handlerRent(slot)}
                  className="bg-blue-500 text-white m-2 p-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
                >
                  <img src={qr} alt="qr" style={{ width: "38px" }} />
                  Escanea el qr para desbloquear bicicleta
                </Button>
              )}
              {slot.status !== "in_use" && (
                <Button
                  onClick={handlerReturn(slot)}
                  className="bg-green-500 text-white m-2 p-2 rounded flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
                >
                  <img src={qr} alt="qr" style={{ width: "38px" }} />
                  <span>Escanea el qr para dejar biciclera</span>
                </Button>
              )}
              {isAuth && (<IncidentsSlotModal
                slotId={slot.id}
                addIncident={useAddSlotIncidence}
              />)}
            </div>
          </div>
        ))}
      </div>
      <br />
    </>
  );
}
