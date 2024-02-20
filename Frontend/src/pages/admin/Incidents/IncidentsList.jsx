import React from "react";
import { useIncidents } from "../../../hooks/useIncidents"
import IncidentsListAdmin from "../../../component/Admin/Incidents/IncidentsListAdmin";

const IncidentsList = () => {
    const { incidentsSlots } = useIncidents()

    return(
        <>
        <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border w-48">ID</th>
            <th className="border w-48">TITULO</th>
            <th className="border w-48">ESTADO</th>
            <th className="border w-48">DESCRIPCIÓN</th>
            <th className="border w-48">ID USUARIO</th>
            <th className="border w-48">ID ANCLAJE</th>
            <th className="border w-32">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {incidentsSlots.map((incident) => (
            <IncidentsListAdmin
              key={incident.id}
              incident={incident}            
            />
          ))}
        </tbody>
      </table>
        </>
    )
}

export default IncidentsList;