import api from "./api";

const RentService = {
  getOneRent() {
    return api().get("/api/rent/");
  },
  getAllRents() {
    return api().get("/api/rents/");
  },
  rentBike(slot){
    console.log(slot);
    return api().post(`/api/rent/${slot.id}`)
  },
  backRent(slot){
    console.log(slot);
    return api().put(`/api/backBike/`,slot)
  }
};

export default RentService;
