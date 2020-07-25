import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  img: {
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    maxWidth: '100%',
  },
  caption: {
    marginTop: theme.spacing(0.5),
    display: 'block',
  },
  credits: {
    display: 'block',
  },
});

const RenderedImg = ({rendererProps, classes}) => {
    const title = rendererProps.alt.split('....')[0];
    const credits = rendererProps.alt.split('....')[1];
    return (
        <>
            <img
            className={classes.img}
            {...rendererProps}
            title={title}
            />
            <Typography
            variant="caption"
            align="center"
            className={classes.caption}
            >
            {title}
            </Typography>
            <Typography
            variant="caption"
            align="center"
            className={classes.credits}
            >
            {credits}
            </Typography>
        </>
    );
};

RenderedImg.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedImg);
