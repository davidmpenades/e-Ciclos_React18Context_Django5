import React from "react";
import { useStations } from "../../../hooks/useStations";
import StationsListAdmin from "../../../component/Admin/station/StationsListAdmin";
import ModalAddUpdate from "../../../component/Admin/station/Modals/ModalAddUpdate";

export default function StationsList() {
  const { stations, useDeleteStation, useCreateStation, useUpdateStation } =
    useStations();
  const modalType = "add";
  console.log("StationList");
  return (
    <div>      
        <div className="header flex items-center justify-between mb-3 mr-6">
          <h1 className="font-bold text-3xl font-sans flex-grow text-center">Estaciones</h1>
          <ModalAddUpdate modalType={modalType} add={useCreateStation} />
        </div>         
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border w-48">ID</th>
            <th className="border w-96">SLUG</th>
            <th className="border w-48">NOMBRE</th>
            <th className="border w-48">Nº BIKES</th>
            <th className="border w-48">LAT</th>
            <th className="border w-48">LONG</th>
            <th className="border w-48">ESTADO</th>
            <th className="border w-32">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <StationsListAdmin
              key={station.id}
              station={station}
              deleteStation={useDeleteStation}
              updateStation={useUpdateStation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
