import { useQuery } from '@apollo/react-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import getMenuAuthorsQuery from '../../apollo/schemas/getMenuAuthorsQuery.graphql';
import LinkTo from '../LinkTo';
import Loading from './Loading';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '100%',
  },
  ul: {
    textAlign: 'left',
    paddingLeft: 0,
  },
  li: {
    listStyleType: 'none',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  entry: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  header: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

export const GET_MENU_AUTHORS = getMenuAuthorsQuery;

const MenuAuthors = (props) => {
  const { classes } = props;
  const {
    loading,
    error,
    data,
  } = useQuery(
    GET_MENU_AUTHORS,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  if (error) return <div>There was an error!</div>;
  if (loading) return <Loading contained={true} />;

  const { users, usersConnection } = data;
  const userCount = usersConnection.groupBy.username.length;
  const areMoreUsers = users.length < userCount;

  return (
    <ul className={classes.ul}>
      <li className={classes.li}>
        <Typography variant="button" component="p" className={classes.header}>
          <LinkTo hoverNone href="/blog/authors">
            Authors
          </LinkTo>
        </Typography>
      </li>
      {users.map((user) => (
        <li className={classes.li}>
          <Typography variant="body1" className={classes.entry}>
            <LinkTo hoverNone href={`/blog/authors?authorSlug=${user.username}`} as={`/blog/authors/${user.username}`}>
              {`${user.firstName} ${user.lastName}`}
            </LinkTo>
          </Typography>
        </li>
      ))}
      {areMoreUsers && (
        <li className={classes.li}>
          <Typography variant="button" component="p" className={classes.more}>
            <LinkTo hoverNone href="/blog/authors">
              More...
            </LinkTo>
          </Typography>
        </li>
      )}
    </ul>
  );
};

MenuAuthors.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(MenuAuthors);
