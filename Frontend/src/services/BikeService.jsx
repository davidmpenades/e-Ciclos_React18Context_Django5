import api from "./api";

const BikeService = {
  getAllBikes() {
    return api().get("/api/bikes/");
  },
  deleteBike(id) {
    return api().delete(`/api/bikes/${id}`);
  },
  createBike(addBike) {
    return api().post("/api/bikes/", addBike);
  },
  updateBikes(updateBike, id) {
    return api().put(`/api/bikes/${id}`, updateBike);
  },
};

export default BikeService;
