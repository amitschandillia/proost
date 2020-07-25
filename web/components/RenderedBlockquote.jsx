import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    borderLeft: `7px solid ${theme.palette.blockquoteBorder.default}`,
    borderRadius: '3px',
    backgroundColor: theme.palette.blockquoteBackground.default,
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    '& p': {
      fontSize: theme.typography.htmlFontSize,
    },
  },
});

const RenderedBlockquote = ({rendererProps, classes}) => {

  return (
    <Typography
      variant="body1"
      align="justify"
      className={classes.root}
      {...rendererProps}
    />
  );
};

RenderedBlockquote.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedBlockquote);
