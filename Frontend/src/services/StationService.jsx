import api from "./api";

const StationService = {
  getAllStations() {
    return api().get("/api/stations/");
  },
  deleteStation(id) {
    return api().delete(`/api/stations/${id}`);
  },
  createStation(addStation) {
    return api().post("/api/stations/", addStation);
  },
  updateStation(updateStation, id) {
    console.log(updateStation, id);
    return api().put(`/api/stations/${id}`, updateStation);
  },
};

export default StationService;
