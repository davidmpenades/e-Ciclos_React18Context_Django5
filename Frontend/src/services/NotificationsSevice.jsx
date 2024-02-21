import api from "./api"

const NotificationsService = {

    getAllNotifications() {        
        return api().get("/api/slot_notifications");
    },

    updateNotificationStatus(id) {
        return api().put(`/api/notifications/${id}`);
    }
    
};

export default NotificationsService;