import React from "react";
import { useLocation } from "react-router-dom";
import { useStations } from "../../hooks/useStations";
import { useNavigate } from "react-router-dom";
import foto from "../../assets/imgs/Home/foto2.webp";

export default function StationCard() {
  const location = useLocation();
  const { stationId } = location.state;
  const { stations } = useStations();
  const navigate = useNavigate();

  console.log("StationCard");

  return (
    <>
      {stations
        .filter((station) => station.id === stationId)
        .map((station) => (
          <section key={station.id} className="text-gray-600 body-font p-8">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col shadow-xl  rounded-xl">
              <img
                className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded shadow-xl"
                alt="hero"
                src={foto}
              />
              <div className="text-center lg:w-2/3 w-full">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  Esta estación es: {" "}
                  <b>
                    <span
                      style={{
                        fontSize: "1.5em",
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      {station.name}
                    </span>
                  </b>{" "}
                </h1>
                <p className="mb-10 sm:text-xl leading-relaxed">
                  Tiene{" "}
                  <b>
                    <span
                      style={{
                        fontSize: "1.5em",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {station.num_bikes}
                    </span>
                  </b>{" "}
                  bicicletas disponibles
                </p>
                <p className="mb-8 sm:text-xl leading-relaxed">
                  Tiene{" "}
                  <b>
                    <span
                      style={{
                        fontSize: "1.5em",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {station.total_slots}
                    </span>
                  </b>{" "}
                  anclajes libres
                </p>
                <div className="flex justify-center">
                  <button
                    className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                    onClick={() =>
                      navigate("/SlotCard", { state: { stationId: stationId } })
                    }
                  >
                    Ver Opciones
                  </button>
                </div>
              </div>
            </div>
          </section>
        ))}
    </>
  );
}
