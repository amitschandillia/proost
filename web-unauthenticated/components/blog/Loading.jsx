import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(25, 10),
    width: '100vw',
    opacity: 0.3,
  },
});
const Loading = (props) => {
  const {classes} = props;
  return (
    <Grid item className={classes.root}>
      <CircularProgress />
    </Grid>
  );
};

export default withStyles(styles)(Loading);
