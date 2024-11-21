import { createContext, useContext } from "react";
import { LoggedInUser, LoggedInUserAction, UserCreateContextType, Notification, NotificationCreateContextType, NotificationAction, User, LoggedInUserCreateContextType, UserAction } from "../types";

const savedLoggedIn = sessionStorage.getItem('loggedIn')

export const loggedInIntialValue: LoggedInUser = {
    loggedIn: savedLoggedIn? true: false
}

export const createUserContext = createContext<UserCreateContextType>({
    state: loggedInIntialValue,
    dispatch: () => null
})

export const loggedInUserReducer = (state: LoggedInUser, action: LoggedInUserAction) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return action.payload
        default:
            return state
    }
}

export const useLoggedInUserValue = () => {
    const contextValue = useContext(createUserContext)
    return contextValue.state
}

export const useLoggedInUserDispatch = () => {
    const contextValue = useContext(createUserContext)
    return contextValue.dispatch
}


// NOTIFICATION

export const notificationIntialValue: Notification = {
    message: "",
    type: ""
}

export const createNotificationContext = createContext<NotificationCreateContextType>({
    state: notificationIntialValue,
    dispatch: () => null
})

export const NotificationReducer = (state: Notification, action: NotificationAction) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return action.payload
        default:
            return state
    }
}

export const useNotificationValue = () => {
    const contextValue = useContext(createNotificationContext)
    return contextValue.state
}

export const useNotificationDispatch = () => {
    const contextValue = useContext(createNotificationContext)
    return contextValue.dispatch
}


// USER

const savedUser = JSON.parse(sessionStorage.getItem('loggedInUser')!);

export const userInitialValue: User = savedUser

export const UserContext = createContext<LoggedInUserCreateContextType>({
    state: userInitialValue,
    dispatch: () => null
})

export const UserReducer = (state: User, action: UserAction) => {
    switch (action.type) {
        case 'ADD_USER':
            return action.payload
        default:
            return state
    }
}

export const useUserValue = () => {
    const context = useContext(UserContext)
    return context.state
}

export const useUserDispatch = () => {
    const context = useContext(UserContext)
    return context.dispatch
}