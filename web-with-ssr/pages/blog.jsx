import App from '../components/blog/App'
import InfoBox from '../components/blog/InfoBox'
import Header from '../components/blog/Header'
import Submit from '../components/blog/Submit'
import PostList from '../components/blog/PostList'
import { withApollo } from '../lib/apollo'

const BlogPage = props => (
  <App>
    <Header />
    <InfoBox>
      ℹ️ This example shows how to fetch all initial apollo queries on the
      server. If you <a href='/'>reload</a> this page you won't see a loader
      since Apollo fetched all needed data on the server. This prevents{' '}
      <a
        href='https://nextjs.org/blog/next-9#automatic-static-optimization'
        target='_blank'
      >
        automatic static optimization
      </a>{' '}
      in favour of full Server-Side-Rendering.
    </InfoBox>
    <Submit />
    <PostList />
  </App>
)

export default withApollo(BlogPage)
