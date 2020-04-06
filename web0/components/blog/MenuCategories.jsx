import { useQuery } from '@apollo/react-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import getMenuCategoriesQuery from '../../apollo/schemas/getMenuCategoriesQuery.graphql';
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
    borderBottom: '1px solid lightgrey',
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

export const GET_MENU_CATEGORIES = getMenuCategoriesQuery;

const MenuCategories = (props) => {
  const { classes } = props;
  const {
    loading,
    error,
    data,
  } = useQuery(
    GET_MENU_CATEGORIES,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  if (error) return <div>There was an error!</div>;
  if (loading) return <Loading contained={true} />;

  const { categories, categoriesConnection } = data;
  const areMoreCategories = categories.length < categoriesConnection.aggregate.count;

  return (
    <ul className={classes.ul}>
      <li className={classes.li}>
        <Typography variant="button" component="p" className={classes.header}>
          <LinkTo hoverNone href="/blog/categories">
            Categories
          </LinkTo>
        </Typography>
      </li>
      {categories.map((category) => (
        <li className={classes.li}>
          <Typography variant="body1" className={classes.entry}>
            <LinkTo hoverNone href={`/blog/categories?categorySlug=${category.slug}`} as={`/blog/categories/${category.slug}`}>
              {category.name}
            </LinkTo>
          </Typography>
        </li>
      ))}
      {areMoreCategories && (
        <li className={classes.li}>
          <Typography variant="button" component="p" className={classes.more}>
            <LinkTo hoverNone href="/blog/categories">
              More...
            </LinkTo>
          </Typography>
        </li>
      )}
    </ul>
  );
};

MenuCategories.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(MenuCategories);
