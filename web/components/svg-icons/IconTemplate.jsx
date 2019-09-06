import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// For MaterialUI icons, refer to:
// https://www.materialui.co/icons
// https://material.io/resources/icons/?style=baseline

const styles = (theme) => ({
  root: {
    fill: theme.palette.icon.default,
  },
});

const IconTemplate = (props) => {
  const { classes, d } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        className={classes.root}
        d={d}
      />
    </svg>
  );
};

IconTemplate.propTypes = {
  d: PropTypes.string.isRequired,
};

export default withStyles(styles)(IconTemplate);
