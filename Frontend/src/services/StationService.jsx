import api from "./api";

const StationService = {
  getAllStations() {
    return api().get("/api/stations/");
  },
  getOneStation(id) {
    return api().get(`/api/stations/${id}`);
  },
  deleteStation(id) {
    return api().delete(`/api/stations/${id}`);
  },
  createStation(addStation) {
    return api().post("/api/stations/", addStation);
  },
  updateStation(updateStation, id) {
    return api().put(`/api/stations/${id}`, updateStation);
  },
};

export default StationService;
