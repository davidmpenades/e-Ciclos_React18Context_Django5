import React from "react";

const IncidentsList = ({ incident }) => {
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
              <span>{incident.description}</span>
            </td>
            <td className="border w-32">
              <span>{incident.user_id}</span>
            </td>
            <td className="border w-32">
              <span>{incident.slot_id}</span>
            </td>
        </tr>
       
    )
}

export default IncidentsList;