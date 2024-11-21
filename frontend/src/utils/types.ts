import { Dispatch, ReactNode } from "react";

export enum OrganizationType {
  Office = 'office',
  School = 'school',
  Others = 'others',
}

export interface TokenType {
  token: string;
}

export interface OrganizationCardParam {
  organizationName: string;
  organizationLocation: string;
  organizationLeaderName: string;
  organizationCreatedDate: string;
  organizationMembersNumber: number;
  organizationType: OrganizationType;
}

export interface UserCardParam {
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  phoneNumber: string;
}

export interface OrganizationInitialValues {
  leaderFirstName: string;
  leaderLastName: string;
  leaderNumber: string;
  leaderPassword: string;
  organizationName: string;
  organizationLocation: string;
  organizationType: OrganizationType;
  organizationPassword: string;
  confirmLeaderPassword: string;
  confirmOrganizationPassword: string;
}

export interface LoginInitialValues {
  organizationName: string;
  organizationPassword: string;
}


// Context and Reducer
export interface UserCreateContextType {
  state: LoggedInUser;
  dispatch: Dispatch<LoggedInUserAction>;
}


export interface ContextProviderProp {
  children: ReactNode
}

export type LoggedInReducerData = [LoggedInUser, Dispatch<LoggedInUserAction>]

// Logged In User Context

export interface LoggedInUser {
  loggedIn: boolean
}

export interface LoggedInUserAction {
  type: string;
  payload: LoggedInUser;
}

// Notification Context

export interface Notification {
  message: string
  type: string
}

export interface NotificationAction {
  type: string;
  payload: Notification;
}

export interface NotificationCreateContextType {
  state: Notification;
  dispatch: Dispatch<NotificationAction>;
}

export type NotificationReducerData = [Notification, Dispatch<NotificationAction>]


//  USER CONTEXT

export interface User extends UserCardParam {
  organizationId: string;
}

export interface UserAction {
  type: string;
  payload: User;
}

export type UserReducerData = [User, Dispatch<UserAction>]

export interface LoggedInUserCreateContextType {
  state: User;
  dispatch: Dispatch<UserAction>;
}