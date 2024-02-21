import React from "react";
import Modalincidents from "./Modals/ModalIncidentsAdmin";
import ModalDelete from "../Incidents/Modals/ModalDelete";

const IncidentsList = ({ incident, deleteIncident, updateIncidente }) => {
    return(       
        <tr>
            <td className="border w-10">{incident.id}</td>
            <td className="border w-32">
              <span>{incident.title}</span>
            </td>
            <td className="border w-32">
              <span>{incident.status}</span>
            </td>
            <td className="border w-32">
              <span>{incident.desc}</span>
            </td>
            <td className="border w-32">
              <span>{incident.user_id}</span>
            </td>
            <td className="border w-32">
              <span>{incident.slot_id}</span>
            </td>
            <td className="flex w-40">
              <Modalincidents incident={incident} updateIncidente={updateIncidente} incidentId={incident.id} incidentStatus={incident.status}/>
              <ModalDelete deleted={() => deleteIncident(incident.id)} />
            </td>
        </tr>
       
    )
}

export default IncidentsList;