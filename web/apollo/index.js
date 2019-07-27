import { HttpLink } from 'apollo-link-http';
import { withData } from 'next-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Set up cache.
const cache = new InMemoryCache();

// Configure Apollo.
const config = {
  link: new HttpLink({
    uri: 'https://dev.schandillia.com/graphql', // Server URL
  }),
  cache,
};

export default withData(config);
