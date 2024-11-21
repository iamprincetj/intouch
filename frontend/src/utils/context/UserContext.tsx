import { FC, useReducer } from "react";
import { ContextProviderProp, User, UserAction, UserReducerData } from "../types";
import { UserContext, userInitialValue, UserReducer } from "./helperContext";

const initializer = (initialValue: User) => {
    return initialValue
}

export const UserContextProvider: FC<ContextProviderProp> = ({ children }) => {
    const [state, dispatch]: UserReducerData = useReducer<(state: User, action: UserAction) => User, User>(UserReducer, userInitialValue, initializer);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            { children }
        </UserContext.Provider>
    )
}