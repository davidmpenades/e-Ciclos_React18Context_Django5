import api from "./api"

const SlotService = {
    getAllSlots() {
        return api().get("/api/slots/")
    },
    getSlotById(id) {
        return api().get(`/api/slots/${id}`)
    },
}

export default SlotService