import api from "./api";

const RentService = {
  getOneRent() {
    return api().get("/api/rent/");
  },
  getAllRents() {
    return api().get("/api/rents/");
  },
  allRents() {
    return api().get("/api/allRents/");
  },
  rentBike(slot){
    return api().post(`/api/rent/${slot.id}`)
  },
  backRent(slot){
    return api().put(`/api/backBike/`,slot)
  }
};

export default RentService;
