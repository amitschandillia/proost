import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  tr: {},
});

const RenderedTRow = ({rendererProps, classes}) => {

  return (
    <TableRow className={classes.tr} {...rendererProps} />
  );
};

RenderedTRow.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedTRow);
