import api from './api';

const IncidentsService = {
    getAllIncidentsSlots() {
        return api().get('/api/slots_incidents');
    },
    createIncidentSlot(data) {
        return api().post('/api/slot_incidence', data);
    },
    deleteIncidentSlot(id) {
        return api().delete(`/api/slot_incidence_del/${id}`);
    },
    UpdateIncidence(id, data) {
        return api().patch(`/api/slot_incidence/${id}`, data);
    }
}

export default IncidentsService;