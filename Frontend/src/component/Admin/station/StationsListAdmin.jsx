import React from "react";
import ModalDelete from "./Modals/ModalDelete";
import ModalAddUpdate from "./Modals/ModalAddUpdate";

export default function StationsListAdmin({ station, deleteStation, updateStation}) {
  const modalType = "update";

  
  return (
          <tr>
            <td className="border w-12">{station.id}</td>
            <td className="border w-72">
              <span>{station.slug}</span>
            </td>
            <td className="border w-32">
              <span>{station.name}</span>
            </td>
            <td className="border w-32">
              <span>{station.num_bikes}</span>
            </td>
            <td className="border w-32">
              <span>{station.latitude}</span>
            </td>
            <td className="border w-32">
              <span>{station.longitude}</span>
            </td>
            <td className="border w-32">
              <span>{station.status}</span>
            </td>
            <td className="flex flex-wrap w-32">
              <ModalAddUpdate modalType={modalType} station={station} updateStation={updateStation}/>
              <ModalDelete deleted={() => deleteStation(station.id)}/>              
            </td>
          </tr>
  );
}
