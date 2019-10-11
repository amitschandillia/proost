// components/blog/SingleAuthor.jsx

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import getUserQuery from '../../apollo/schemas/getUserQuery.graphql';
import Loading from './Loading';

export const GET_USER = gql`${getUserQuery}`;

const SingleAuthor = (props) => {
  const { authorSlug } = props;

  console.log('USERNAME', authorSlug);

  const {
    loading,
    error,
    data,
  } = useQuery(
    GET_USER,
    {
      variables: { username: authorSlug },
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  if (error) return <div>There was an error!</div>;
  if (loading) return <Loading />;

  const { users } = data;
  console.log('USERS', users);
  const [user] = users;
  const {
    firstName,
    lastName,
  } = user;

  return (
    <>
      {firstName}
      {' '}
      {lastName}
    </>
  );
};

export default SingleAuthor;
