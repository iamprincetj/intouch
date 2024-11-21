import { Notification, NotificationAction, LoggedInUser, LoggedInUserAction } from "./types";

export const handleOnChange = (
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setValue(value);
};


export const addNotification = (notification: Notification, dispatch: (value: NotificationAction) => void) => {
  dispatch({ type: "ADD_NOTIFICATION", payload: notification })
  setTimeout(() => {
    dispatch({ type: "ADD_NOTIFICATION", payload: {type: "", message: ""} })
  }, 3000)
}

export const LoggedIn = (loggedIn: LoggedInUser, dispatch: (value: LoggedInUserAction) => void) => {
  dispatch({ type: "LOGGED_IN", payload: loggedIn })
}