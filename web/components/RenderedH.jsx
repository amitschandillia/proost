import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {},
    h1: {
        marginBottom: theme.spacing(2),
        fontSize: theme.typography.h2.fontSize,
        [theme.breakpoints.down('xs')]: {
          fontSize: theme.typography.h3.fontSize,
        },
    },
    h2: {
        marginBottom: theme.spacing(2),
        fontSize: theme.typography.h3.fontSize,
        [theme.breakpoints.down('xs')]: {
          fontSize: theme.typography.h4.fontSize,
        },
    },
    h3: {
        marginBottom: theme.spacing(2),
        fontSize: theme.typography.h4.fontSize,
        [theme.breakpoints.down('xs')]: {
          fontSize: theme.typography.h5.fontSize,
        },
    },
    h4: {
        marginBottom: theme.spacing(2),
        fontSize: theme.typography.h5.fontSize,
        [theme.breakpoints.down('xs')]: {
          fontSize: theme.typography.h6.fontSize,
        },
    },
    h5: {
        marginBottom: theme.spacing(2),
        fontSize: theme.typography.h6.fontSize,
        [theme.breakpoints.down('xs')]: {
          fontSize: theme.typography.htmlFontSize * 1.15,
        },
    },
    h6: {
        marginBottom: theme.spacing(2),
        fontSize: theme.typography.htmlFontSize * 1.15,
        [theme.breakpoints.down('xs')]: {
          fontSize: theme.typography.htmlFontSize * 1.15,
        },
    },
});

const RenderedH = ({rendererProps, classes}) => {
    const {level} = rendererProps;
    let header;
    if(level === 1) {
        header = (
            <Typography
                variant="h1"
                className={classes.h1}
                {...rendererProps}
            />
        );
    }
    if(level === 1) {
        header = (
            <Typography
                variant="h1"
                className={classes.h1}
                {...rendererProps}
            />
        );
    }
    if(level === 2) {
        header = (
            <Typography
                variant="h2"
                className={classes.h2}
                {...rendererProps}
            />
        );
    }
    if(level === 3) {
        header = (
            <Typography
                variant="h3"
                className={classes.h3}
                {...rendererProps}
            />
        );
    }
    if(level === 4) {
        header = (
            <Typography
                variant="h4"
                className={classes.h4}
                {...rendererProps}
            />
        );
    }
    if(level === 5) {
        header = (
            <Typography
                variant="h5"
                className={classes.h5}
                {...rendererProps}
            />
        );
    }
    if(level === 6) {
        header = (
            <Typography
                variant="h6"
                className={classes.h6}
                {...rendererProps}
            />
        );
    }
    return (
        <>
            {header}
        </>
    );
};

RenderedH.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedH);
