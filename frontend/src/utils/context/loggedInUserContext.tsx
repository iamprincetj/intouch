import { FC, useReducer } from "react";
import { ContextProviderProp, LoggedInUser, LoggedInUserAction, LoggedInReducerData } from "../types";
import { createUserContext, loggedInIntialValue, loggedInUserReducer } from "./helperContext";

const initializer = (initialValue: LoggedInUser) => {
    return initialValue
}

export const LoggedInContextProvider: FC<ContextProviderProp> = ({ children }) => {
    const [state, dispatch]: LoggedInReducerData = useReducer<(state: LoggedInUser, action: LoggedInUserAction) => LoggedInUser, LoggedInUser>(loggedInUserReducer, loggedInIntialValue, initializer);

    return (
        <createUserContext.Provider value={{ state, dispatch }}>
            { children }
        </createUserContext.Provider>
    )
}