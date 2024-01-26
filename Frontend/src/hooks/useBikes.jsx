import { useCallback, useContext } from "react";
import BikeService from "../services/BikeService";
import BikesContext from "../context/BikesContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useBikes() {
  const { bikes, setBikes } = useContext(BikesContext);

  const notifySuccessDelete = () => toast.error("Bike deleted successfully!");
  const notifyAdd = () => toast.success("Bike added successfully!");
  const notifyUpdate = () => toast.success("Bike updated successfully!");
  const notifyError = () => toast.error("Error!");

  const useDeleteBike = useCallback(
    (id) => {
      BikeService.deleteBike(id)
        .then(({ data, status }) => {            
          if (status === 204) {
            notifySuccessDelete();
            setBikes(bikes.filter((bike) => bike.id !== id));
          }
        })
        .catch((e) => console.error(e));
    },
    [setBikes]
  );

  const useCreateBike = useCallback(
    (bike) => {
      BikeService.createBike(bike).then(({ data, status }) => {
        if (status === 201) {
          console.log(bikes);
          notifyAdd();
          setBikes([...bikes, data]);
        }
      })
      .catch((e) => console.error(e));
    },
    [bikes]
  );

  const useUpdateBike = useCallback(
    (bike, id) => {
        let bikesUpdated = {
            slug: bike.slug,
            name_bike: bike.name_bike,
            status: bike.status,
            img_bike: bike.img_st,
            };
      BikeService.updateBikes(bikesUpdated, id).then(({ data, status }) => {
        if (data, status === 200) {
          notifyUpdate();
          let old_bikes = [...bikes]
          const index = old_bikes.findIndex((old_bikes) => old_bikes.id === id);
          old_bikes[index] = data;
          setBikes(old_bikes);
        }else{
          notifyError();
        }
      })
        .catch((e) => console.error(e));
    },[setBikes] 
  );
  return { bikes, setBikes, useDeleteBike, useCreateBike, useUpdateBike };
}
