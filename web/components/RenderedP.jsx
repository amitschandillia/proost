import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
});

const RenderedP = ({rendererProps, classes}) => {

  return (
    <Typography
      variant="body2"
      align="justify"
      className={classes.root}
      {...rendererProps}
    />
  );
};

RenderedP.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedP);
