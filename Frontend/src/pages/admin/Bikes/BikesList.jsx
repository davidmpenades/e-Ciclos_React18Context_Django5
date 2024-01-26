import React from "react";
import { useBikes } from "../../../hooks/useBikes";
import BikesListAdmin from "../../../component/Admin/Bikes/BikesListAdmin";
import ModalAddUpdate from "../../../component/Admin/Bikes/Modals/ModalAddUpdate";

export default function BikesList() {
  const { bikes, useDeleteBike, useCreateBike, useUpdateBike } = useBikes();
  const modalType = "add";
  return (
    <div>
      <div>
        <ModalAddUpdate modalType={modalType} add={useCreateBike} />
      </div>
      <div></div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border w-72">ID</th>
            <th className="border w-92">SLUG</th>
            <th className="border w-72">NAME</th>
            <th className="border w-72">STATUS</th>
            <th className="border w-32">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <BikesListAdmin
              key={bike.id}
              bike={bike}
              deleteBike={useDeleteBike}
              updateBike={useUpdateBike}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
