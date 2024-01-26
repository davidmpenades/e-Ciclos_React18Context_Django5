import React from "react";
import { useStations } from "../../../hooks/useStations";
import StationsListAdmin from "../../../component/Admin/station/StationsListAdmin";
import ModalAddUpdate from "../../../component/Admin/station/Modals/ModalAddUpdate";

export default function StationsList() {
  const { stations, useDeleteStation, useCreateStation, useUpdateStation } =
    useStations();
  const modalType = "add";
  return (
    <div>
      <div>
        <ModalAddUpdate modalType={modalType} add={useCreateStation} />
      </div>
      <div></div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border w-48">ID</th>
            <th className="border w-96">SLUG</th>
            <th className="border w-48">NAME</th>
            <th className="border w-48">QTA.BIKES</th>
            <th className="border w-48">LAT</th>
            <th className="border w-48">LONG</th>
            <th className="border w-48">STATUS</th>
            <th className="border w-32">ACTIONS</th>
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
