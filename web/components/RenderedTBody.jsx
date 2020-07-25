import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  tbody: {},
});

const RenderedTBody = ({rendererProps, classes}) => {

  return (
    <TableBody className={classes.tbody} {...rendererProps} />
  );
};

RenderedTBody.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedTBody);
