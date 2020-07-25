import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  th: {},
});

const RenderedTHead = ({rendererProps, classes}) => {

  return (
    <TableHead className={classes.th} {...rendererProps} />
  );
};

RenderedTHead.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedTHead);
