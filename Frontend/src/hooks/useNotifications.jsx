import { useContext, useCallback } from "react";
import { toast } from 'react-toastify';
import NotificationsContext from "../context/NotificationsContext";
import NotificationsService from "../services/NotificationsSevice";

export function useNotifications() {
    const { notifications, setNotifications, notificationsNumber, setNotificationsNumber } = useContext(NotificationsContext);

    const useSeeNotification = useCallback((id) => {
        NotificationsService.updateNotificationStatus(id)
            .then(({ data, status }) => {
                if (status === 200) {
                    setNotifications(notifications.filter(item => item.id !== id));
                    toast.info('Notification seen.');
                }
            })
            .catch(e => console.error(e))
    }, [notifications]);

    

    return { notifications, setNotifications, notificationsNumber, setNotificationsNumber, useSeeNotification }
}