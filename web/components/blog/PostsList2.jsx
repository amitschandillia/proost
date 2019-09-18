import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const allUsersQuery = gql`
  query allUsers($first: Int!, $skip: Int!) {
    allUsers(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      firstName
      createdAt
    }
    _allUsersMeta {
      count
    }
  }
`
export const allUsersQueryVars = {
  skip: 0,
  first: 10
}

export default function PostsList2 () {
  return (
    <Query query={allUsersQuery} variables={allUsersQueryVars}>
      {({ loading, error, data: { allUsers, _allUsersMeta }, fetchMore }) => {
        if (error) return <aside>Error loading users!</aside>
        if (loading) return <div>Loading</div>

        const areMorePosts = allUsers.length < _allUsersMeta.count
        return (
          <section>
            <ul>
              {allUsers.map((user, index) => (
                <li key={user.id}>
                  <div>
                    <span>{index + 1}. </span>
                    <div>{user.firstName}</div>
                  </div>
                </li>
              ))}
            </ul>
            {areMorePosts ? (
              <button onClick={() => loadMorePosts(allUsers, fetchMore)}>
                {' '}
                {loading ? 'Loading...' : 'Show More'}{' '}
              </button>
            ) : (
              ''
            )}
          </section>
        )
      }}
    </Query>
  )
}

function loadMorePosts (allUsers, fetchMore) {
  fetchMore({
    variables: {
      skip: allUsers.length
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return previousResult
      }
      return Object.assign({}, previousResult, {
        // Append the new users results to the old one
        allUsers: [...previousResult.allUsers, ...fetchMoreResult.allUsers]
      })
    }
  })
}
