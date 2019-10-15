import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_USERS = gql`
  query users ($limit: Int!, $username: String!) {
    users (limit: $limit, where: { username: $username }) {
      username
      firstName
    }
  }
`;

const Home = () => {
  const userToFetch = 'jonsnow';

  const {
    loading,
    error,
    data,
  } = useQuery(
    GET_USERS,
    {
      variables: { limit: 2, username: userToFetch },
      notifyOnNetworkStatusChange: true,
    },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  return (
    <ul>
      {data.users.map(user => {
        return <li>{user.username} {user.firstName}</li>;
      })}
    </ul>
  );
};

export default Home;
