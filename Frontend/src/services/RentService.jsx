import api from "./api"

const RentService= {
    getOneRent() {
        return api().get('/rent/')
    }
}

export default RentService