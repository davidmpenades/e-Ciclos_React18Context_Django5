import { useCallback, useContext, useState } from "react";
import StationService from "../services/StationService";
import StationsContext from "../context/StationsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useStations() {
  const { stations, setStations } = useContext(StationsContext);
  const [oneStation, setOneStation] = useState({});

  const notifySuccessDelete = () =>
    toast.error("Station deleted successfully!");
  const notifyAdd = () => toast.success("Station added successfully!");
  const notifyUpdate = () => toast.success("Station updated successfully!");

  const useDeleteStation = useCallback(
    (id) => {
      StationService.deleteStation(id)
        .then(({ data, status }) => {
          if (status === 204) {
            notifySuccessDelete();
            setStations(stations.filter((station) => station.id !== id));
          }
        })
        .catch((e) => console.error(e));
    },
    [setStations]
  );
  const useOneStation = useCallback(
    (id) => {
      StationService.getOneStation(id)
        .then(({ data }) => {
          console.log(data);
          setOneStation(data);
        })
        .catch((e) => console.error(e));
    },
    [oneStation]
  );

  const useCreateStation = useCallback(
    (station) => {
      StationService.createStation(station)
        .then(({ data, status }) => {
          if (status === 201) {
            notifyAdd();
            setStations([...stations, data]);
          }
        })
        .catch((e) => console.error(e));
    },
    [stations]
  );

  const useUpdateStation = useCallback(
    (station, id) => {
      let stationUpdated = {
        name: station.name,
        num_bikes: station.num_bikes,
        latitude: station.latitude,
        longitude: station.longitude,
        status: station.status,
        img_st: station.img_st,
      };
      StationService.updateStation(stationUpdated, id)
        .then(({ data, status }) => {
          if ((data, status === 200)) {
            notifyUpdate();
            let old_stations = [...stations];
            const index = old_stations.findIndex(
              (old_stations) => old_stations.id === id
            );
            old_stations[index] = data;
            setStations(old_stations);
          }
        })
        .catch((e) => console.error(e));
    },
    [setStations]
  );
  return {
    stations,
    setStations,
    useDeleteStation,
    useCreateStation,
    useUpdateStation,
    useOneStation,
    setOneStation,
    oneStation
  };
}
