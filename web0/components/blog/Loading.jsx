import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    opacity: 0.3,
  },
  sizing: {
    padding: theme.spacing(25, 10),
    width: '100vw',
  },
  sizingContained: {
    padding: theme.spacing(12, 5),
    width: '100%',
  },
});
const Loading = (props) => {
  const {
    classes,
    contained = false,
  } = props;
  let sizing = contained ? classes.sizingContained : classes.sizing;
  return (
    <Grid item className={[classes.root, sizing].join(' ')}>
      <CircularProgress />
    </Grid>
  );
};

Loading.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Loading);
