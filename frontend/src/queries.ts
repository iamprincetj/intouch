import { gql } from '@apollo/client';

// QUERY

export const FIND_ORGANIZATION_USERS = gql`
  query usersInOrganization($organizationId: String!) {
    allUsersInOrganization(organizationId: $organizationId) {
      id
      firstName
      lastName
      phoneNumber
      role
      organizationId
      createdAt
    }
  }
`;

// MUTATIONS

export const ADD_ORGANIZATION = gql`
  mutation AddOrganizationAndLeader(
    $organizationName: String!
    $organizationType: String!
    $organizationLocation: String!
    $organizationPassword: String!
    $leaderFirstName: String!
    $leaderLastName: String!
    $leaderNumber: String!
    $leaderPassword: String!
  ) {
    createOrganizationAndLeader(
      organizationName: $organizationName
      organizationType: $organizationType
      organizationLocation: $organizationLocation
      organizationPassword: $organizationPassword
      leaderFirstName: $leaderFirstName
      leaderLastName: $leaderLastName
      leaderNumber: $leaderNumber
      leaderPassword: $leaderPassword
    ) {
      id
      organizationName
      organizationType
      organizationLocation
      leaderFirstName
      leaderLastName
      leaderNumber
    }
  }
`;

export const LOGIN_TO_ORGANIZATION = gql`
  mutation OrganizationLogin(
    $organizationName: String!
    $organizationPassword: String!
  ) {
    loginToOrganization(
      organizationName: $organizationName
      organizationPassword: $organizationPassword
    ) {
      id
      organizationName
      organizationType
      organizationLocation
    }
  }
`;

export const LOGIN = gql`
  mutation leaderAdminLogin($phoneNumber: string, $password: string) {
    login(phoneNumber: $phoneNumber, password: $password) {
      token {
        value
      }
      user {
        id
        firstName
        lastName
        phoneNumber
        role
        organizationId
        createdAt
      }
    }
  }
`;
