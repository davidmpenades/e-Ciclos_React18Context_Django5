import React, { createContext, useState, useEffect, useContext } from "react";
import NotificationsService from "../services/NotificationsSevice";
import AuthContext from "./AuthContext";
import IncidentsContext from "./IncidentsContext";

const NotificationsContext = createContext();

export function NotificationsContextProvider({ children }) {
  const { isAuth } = useContext(AuthContext);
  const { incidents } = useContext(IncidentsContext);
  const [notifications, setNotifications] = useState([]);
  const [notificationsNumber, setNotificationsNumber] = useState(0);

  useEffect(() => {
    if (isAuth) {
      NotificationsService.getAllNotifications().then(({ data }) => {
        setNotifications(data);
        setNotificationsNumber(data.length);
      });
    }
  }, [setNotifications, isAuth, incidents]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
        notificationsNumber,
        setNotificationsNumber,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export default NotificationsContext;
