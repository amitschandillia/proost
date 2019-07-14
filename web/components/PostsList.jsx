import gql from "graphql-tag";
import Link from "next/link";
import { graphql } from "react-apollo";

const PostsList = (
  { data: { loading, error, posts }, search },
  req
) => {
  if (error) return "Error loading posts";
  //if posts are returned from the GraphQL query, run the filter query
  //and set equal to variable postSearch

  if (posts && posts.length) {
    //searchQuery
    const searchQuery = posts.filter(query =>
      query.title.toLowerCase().includes(search)
    );
    if (searchQuery.length != 0) {
      return (
        <div>
          <div className="h-100">
            {searchQuery.map(res => (
              <div>
                <p>{res._id}</p>
                <h1>{res.title}</h1>
                <h2>{res.secondaryTitle}</h2>
                <p>{res.body}</p>
              </div>
            ))}
          </div>

        </div>
      );
    } else {
      return <h1>No posts Found</h1>;
    }
  }
  return <h1>Loading</h1>;
};

const query = gql`
  {
    posts {
      _id
      title
      secondaryTitle
      body
    }
  }
`;
// PostsList.getInitialProps = async ({ req }) => {
//   const res = await fetch("https://api.github.com/repos/zeit/next.js");
//   const json = await res.json();
//   return { stars: json.stargazers_count };
// };
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostsList)
export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(PostsList);
