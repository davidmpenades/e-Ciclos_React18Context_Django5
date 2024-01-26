import React from "react";
import ModalDelete from "./Modals/ModalDelete";
import ModalAddUpdate from "./Modals/ModalAddUpdate";

export default function BikesListAdmin({ bike, deleteBike, updateBike }) {
    const modalType = "update";
    
    return (
        <tr>
        <td className="border w-12">{bike.id}</td>
        <td className="border w-72">
            <span>{bike.slug}</span>
        </td>
        <td className="border w-32">
            <span>{bike.name_bike}</span>
        </td>
        <td className="border w-32">
            <span>{bike.status}</span>
        </td>
        <td className="flex flex-wrap w-34">
            <ModalAddUpdate modalType={modalType} bike={bike} updateBike={updateBike} />
            <ModalDelete deleted={() => deleteBike(bike.id)} />
        </td>
        </tr>
    );
    }