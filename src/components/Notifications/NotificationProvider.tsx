import React, { useState } from "react";
import { Alert } from "@mui/material";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

type Notification = {
  message: string;
};

export const NotificationContext = React.createContext<{
  pushNotification: (message: Notification) => void;
}>({
  pushNotification: (message) => {
    console.log(message);
  },
});

export const NotificationProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const pushNotification = (notification: Notification) => {
    setNotifications((prevState) => [...prevState, notification]);
  };

  const handleClose = (message: string) => {
    setNotifications((prevState) =>
      prevState.filter((notification) => notification.message !== message)
    );
  };

  return (
    <NotificationContext.Provider value={{ pushNotification }}>
      {notifications.map((item) => (
        <Alert
          key={item.message}
          onClose={() => handleClose(item.message)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {item.message}
        </Alert>
      ))}

      {children}
    </NotificationContext.Provider>
  );
};
