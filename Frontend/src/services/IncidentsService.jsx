import api from './api';

const IncidentsService = {
    getAllIncidentsSlots() {
        return api().get('/api/slots_incidents');
    },
    createIncidentSlot(data) {
        return api().post('/api/slot_incidence', data);
    }
}

export default IncidentsService;