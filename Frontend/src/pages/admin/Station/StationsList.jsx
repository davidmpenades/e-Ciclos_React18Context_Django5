import React from "react";
import { useStations } from "../../../hooks/useStations";
import StationsListAdmin from "../../../component/Admin/station/StationsListAdmin";
import ModalAdd from "../../../component/Admin/station/Modals/ModalAddUpdate";

export default function StationsList() {
  const { stations, useDeleteStation, useCreateStation, useUpdateStation } = useStations();
  const modalType = "add";
  return (
    <div>
      <div>     
        <ModalAdd modalType={modalType} add={useCreateStation}/>
      </div>
      <div>

      </div>      
      <table className="w-full border-collapse border border-gray-300">
      <thead>
          <tr>
            <th className="border w-12">ID</th>
            <th className="border w-72">SLUG</th>
            <th className="border w-32">NAME</th>
            <th className="border w-32">QTA.BIKES</th>
            <th className="border w-32">LAT</th>
            <th className="border w-32">LONG</th>
            <th className="border w-32">STATUS</th>
            <th className="border w-32">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <StationsListAdmin key={station.id} station={station} deleteStation={useDeleteStation} updateStation={useUpdateStation}/>
          ))}
        </tbody>
      </table>      
    </div>
  );
}
