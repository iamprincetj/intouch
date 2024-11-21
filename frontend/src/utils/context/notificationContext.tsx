import { FC, useReducer } from "react";
import { ContextProviderProp, Notification, NotificationAction, NotificationReducerData } from "../types";
import { createNotificationContext, notificationIntialValue, NotificationReducer } from "./helperContext";

const initializer = (initialValue: Notification) => {
    return initialValue
}

export const NotificationContextProvider: FC<ContextProviderProp> = ({ children }) => {
    const [state, dispatch]: NotificationReducerData = useReducer<(state: Notification, action: NotificationAction) => Notification, Notification>(NotificationReducer, notificationIntialValue, initializer);

    return (
        <createNotificationContext.Provider value={{ state, dispatch }}>
            { children }
        </createNotificationContext.Provider>
    )
}