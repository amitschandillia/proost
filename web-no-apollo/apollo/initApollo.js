// import { ApolloClient, createNetworkInterface } from "react-apollo";
import ApolloClient, { HttpLink } from 'apollo-client-preset';
import fetch from "isomorphic-fetch";

// Works with react-apollo@1.4.2

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(headers, initialState) {
  const link = new HttpLink({
    uri: 'https://dev.schandillia.com/graphql',
  });
  return new ApolloClient({
    initialState,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
  });
}

export default function initApollo(headers, initialState = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(headers, initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(headers, initialState);
  }

  return apolloClient;
}
