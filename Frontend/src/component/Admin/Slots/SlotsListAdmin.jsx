import React from "react";

export default function SlotsList({ slot }) {
    return(       
        <tr>
            <td className="border w-10">{slot.id}</td>            
            <td className="border w-32">
              <span>{slot.station_id}</span>
            </td>
            <td className="border w-32">
              <span>{slot.bike_id}</span>
            </td>   
            <td className="border w-32">
              <span>{slot.slot_num}</span>
            </td>
            <td className="border w-32">
              <span>{slot.status}</span>
            </td>
        </tr>
       
    )
}