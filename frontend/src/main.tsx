import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { NotificationContextProvider } from './utils/context/notificationContext.tsx';
import { LoggedInContextProvider } from './utils/context/loggedInUserContext.tsx';
import { UserContextProvider } from './utils/context/UserContext.tsx';

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('currentUserToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.REACT_BACKEND_URL,
});

const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000' }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationContextProvider>
      <LoggedInContextProvider>
        <UserContextProvider>
          <ApolloProvider client={client}>
            <Router>
              <App />
            </Router>
          </ApolloProvider>
        </UserContextProvider>
      </LoggedInContextProvider>
    </NotificationContextProvider>
  </StrictMode>
);
